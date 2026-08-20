# Executive Summary

This document provides a comprehensive technical audit of the Blinkeyit grocery platform backend project. The audit evaluates the current architecture, identifies weak modules, analyzes performance and security, and outlines a strategic roadmap for implementing Redis caching and Google OAuth authentication.

**Total Modules:** 7
✅ **Complete:** 0
🟡 **Partial:** 5
🔴 **Weak / Needs Work:** 2
⚫ **Not Implemented:** 1 (Google OAuth)

**Overall Project Completion:** 65%

**Critical Issues:** 1 (Product Search Performance)
**High Priority Issues:** 2 (Missing Rate Limiting, Missing Caching on Read-Heavy Routes)
**Medium Priority Issues:** 3
**Low Priority Issues:** 2

**Redis Recommended Modules:** 3 (Products, Categories, User Profile)
**Google OAuth Status:** Not Implemented

---

# 1. Project Architecture Overview

The project is a Node.js/Express.js backend utilizing MongoDB (Mongoose) for data storage. It uses JWT for authentication (with access and refresh tokens stored in HTTP-only cookies), Cloudinary for image uploads, Nodemailer/Resend for emails, and Stripe for payments.

There is currently **no Redis integration**, and the authentication system is strictly email/password based.

---

# 2. Complete Module Inventory

| #   | Module             | Status     | Completion | Weakness                                        | Recommended Work                       | Priority |
| --- | ------------------ | ---------- | ---------: | ----------------------------------------------- | -------------------------------------- | -------- |
| 1   | Authentication     | 🟡 PARTIAL |        80% | Missing rate limiting, no OAuth                 | Add Google OAuth, implement rate limit | HIGH     |
| 2   | User Management    | 🟡 PARTIAL |        70% | Repeated DB hits for profile, no caching        | Introduce Redis for profile reads      | MEDIUM   |
| 3   | Products           | 🔴 WEAK    |        60% | Expensive `$regex` searches, no caching         | Add Redis caching, optimize queries    | CRITICAL |
| 4   | Categories/SubCats | 🟡 PARTIAL |        75% | No caching on stable reference data             | Cache category lists                   | HIGH     |
| 5   | Orders             | 🔴 WEAK    |        60% | Direct Cart deletion on COD without transaction | Add DB transactions for order creation | HIGH     |
| 6   | Cart               | 🟡 PARTIAL |        80% | -                                               | -                                      | LOW      |
| 7   | Address            | 🟡 PARTIAL |        80% | -                                               | -                                      | LOW      |

---

# 3. Weak Module Analysis

### Module: Products

**Status:** 🔴 WEAK / NEEDS WORK
**Estimated Completion:** 60%
**Weakness:** The `getProductController` and `searchProduct` rely on MongoDB `$regex` and `$text` search on every request without any caching layer. This is highly inefficient for a grocery app where catalog browsing is the primary user activity.
**Files:** `controllers/product.controller.js`
**Impact:** High database CPU load and slow response times under concurrent load.
**Recommended Work:** Introduce Redis caching for product lists and category filtering.
**Priority:** CRITICAL

### Module: Orders

**Status:** 🔴 WEAK / NEEDS WORK
**Estimated Completion:** 60%
**Weakness:** `CashOnDeliveryOrderController` deletes cart items and updates the user model sequentially without a MongoDB Transaction. If the server crashes mid-process, the user could place an order but retain items in the cart.
**Files:** `controllers/order.controller.js`
**Impact:** Potential data inconsistency.
**Recommended Work:** Wrap order creation and cart clearing in a Mongoose transaction.
**Priority:** HIGH

---

# 4. Redis Caching Analysis & Architecture

### Redis Purpose

Redis should be used strictly as a **Cache** for read-heavy, relatively stable data to alleviate MongoDB load, and potentially for **Rate Limiting** on authentication routes.

### Cacheable Data

1. **Categories & SubCategories:** Highly stable, read frequently.
2. **Product Lists (by Category):** Read frequently, changes moderately.
3. **User Profile (Basic details):** Read on many authenticated page loads.

### Non-Cacheable Data

1. **Cart & Checkout Data:** Highly dynamic and user-specific. Caching could lead to incorrect totals.
2. **Payment/Stripe Webhook Data:** Requires strict real-time consistency.
3. **Passwords & OTPs:** Security risk if cached in plain text or leaked.

### Cache Strategy

| Module     | Data            | Cache Key           | TTL | Invalidation                   | Reason         |
| ---------- | --------------- | ------------------- | --- | ------------------------------ | -------------- |
| Categories | Category list   | `categories:all`    | 24h | On Create/Update/Delete        | Rarely changes |
| Products   | Products by Cat | `products:cat:{id}` | 1h  | On Product update/stock change | Read-heavy     |
| User       | User Profile    | `user:profile:{id}` | 15m | On profile update              | Avoids DB hits |

### Cache Flow

```text
Client
  ↓
API
  ↓
Controller
  ↓
Redis (Check)
  │
  ├── Cache HIT → Return cached data
  │
  └── Cache MISS
          ↓
       Database (MongoDB)
          ↓
       Store in Redis (with TTL)
          ↓
       Return response
```

### Cache Invalidation Strategy

- **Products:** When `updateProductDetails` or `deleteProductDetails` is called, invalidate the specific product cache and its associated category cache (`products:cat:{categoryId}`).
- **User Profile:** When `updateUserDetails` or `uploadAvatar` is called, invalidate `user:profile:{userId}`.

### Redis Failure Handling

If Redis is unavailable (connection timeout/error), the application must gracefully degrade by bypassing the cache and querying MongoDB directly. Errors should be logged internally, but the user should not see a 500 error unless the DB also fails.

```text
Redis Available
→ Use cache

Redis Unavailable
→ Continue with database
→ Log Redis error
→ Do not expose internal Redis errors to users
```

---

# 5. Google OAuth Audit & Architecture

### Current Authentication State

Authentication uses a custom JWT implementation with access and refresh tokens. The `UserModel` requires an email and password.

### User Model Changes Required

The `UserModel` needs to support users who do not have passwords.

```text
Current User Model
        ↓
Required Changes:
- Add `googleId: { type: String, unique: true, sparse: true }`
- Make `password` optional if `googleId` exists.
- Add `provider: { type: String, enum: ['local', 'google'], default: 'local' }`
- Add `avatar: { type: String }` (Already exists, can be populated from Google)
        ↓
Reason: To identify OAuth users and allow passwordless login.
```

### Google OAuth User Flow

```text
User
 ↓
"Continue with Google"
 ↓
Google OAuth (Passport.js or direct API)
 ↓
Callback to /api/user/auth/google/callback
 ↓
Verify Google Identity
 ↓
Find existing user by email
 ├── Existing account (local) → Link account (add googleId), login
 ├── Existing account (google) → Login
 └── New account → Create user (no password), login
          ↓
       Generate JWT access & refresh tokens
          ↓
       Set HTTP-only cookies & Redirect to Frontend
```

### Account Linking Strategy

- **Case 1 (No email exists):** Create new user with `provider='google'` and empty password.
- **Case 2 (Email exists as local):** Authenticate, update user document to include `googleId` (linking the accounts). This is the safest approach assuming Google's email verification is trusted.
- **Case 3 (Google account is already linked):** Authenticate normally.
- **Case 4 (Google authentication fails):** Redirect to frontend with an appropriate error query parameter.
- **Case 5 (Google email is unverified):** Reject authentication and prompt user to verify their Google email first.

### Required Environment Variables

```text
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
GOOGLE_CALLBACK_URL
```

### Security Review

- **Callback validation:** Ensure the `GOOGLE_CALLBACK_URL` is strict.
- **State parameter:** Use OAuth `state` to prevent CSRF attacks.
- **Cookie Security:** The current JWT approach uses `httpOnly: true` and `secure: true`, which is excellent.
- **Production vs Dev:** Ensure different callback URLs are used to prevent token leaks.

---

# 6. Performance & Security Audit

### Performance Audit

- **Issue:** `getProductController` uses `$regex` for search.
  - **Severity:** HIGH
  - **Impact:** Slow queries on large collections.
  - **Recommendation:** Implement MongoDB Atlas Search or Redis caching for search results.
- **Issue:** `userDetails` fetches the user profile on multiple authenticated requests without caching.
  - **Severity:** MEDIUM
  - **Impact:** Unnecessary database queries.
  - **Recommendation:** Cache the user profile with Redis.

### Security Audit

- **Issue:** Lack of Rate Limiting on `/login`, `/register`, and `/forgot-password`.
  - **Severity:** 🟠 MEDIUM
  - **Impact:** Vulnerable to brute force and OTP spamming.
  - **Recommendation:** Implement `express-rate-limit`, ideally backed by Redis.
- **Issue:** JWT Refresh Token is stored in DB.
  - **Severity:** 🟢 LOW
  - **Impact:** Good for revocation, but could be optimized by storing revoked tokens (blocklist) in Redis instead.

---

# 7. Development Priority Matrix

| Priority    | Module   | Work                              | Reason                       |
| ----------- | -------- | --------------------------------- | ---------------------------- |
| 🔴 Critical | Products | Optimize Search & Add Redis Cache | DB performance bottleneck    |
| 🟠 High     | Auth     | Implement Google OAuth            | User acquisition/UX          |
| 🟠 High     | Orders   | Implement DB Transactions         | Prevent data corruption      |
| 🟡 Medium   | Auth     | Rate Limiting                     | Security against brute force |
| 🟢 Low      | User     | Cache profile reads               | Minor performance boost      |

---

# 8. Recommended Implementation Roadmap

**Phase 1 — Fix Weak/Critical Modules**
Implement Mongoose transactions in `CashOnDeliveryOrderController`.

**Phase 2 — Authentication Improvements**
Implement Google OAuth in the `user.controller.js` and update `UserModel` for account linking.

**Phase 3 — Redis Infrastructure**
Set up the Redis connection utility, error handling (failover to DB), and basic caching middleware.

**Phase 4 — Apply Caching**
Apply caching to Categories, Subcategories, and Product lists.

**Phase 5 — Cache Invalidation**
Implement reliable cache invalidation for product create/update/delete operations.

**Phase 6 — Performance Optimization**
Address the `$regex` search performance bottleneck.

**Phase 7 — Security & Production Hardening**
Implement Redis-backed rate limiting on authentication routes.

---

# 9. Evidence-Based Findings

**Module:** Products
**File:** `controllers/product.controller.js`
**Function:** `getProductController()`
**Issue:** Uses `$regex: search, $options: "i"` across name and description without caching.
**Severity:** CRITICAL
**Impact:** Full collection scans if not indexed properly, causing severe CPU spikes under load.
**Recommendation:** Implement text indexes and cache frequent search terms in Redis.

**Module:** Orders
**File:** `controllers/order.controller.js`
**Function:** `CashOnDeliveryOrderController()`
**Issue:** Modifies `OrderModel`, `CartProductModel`, and `UserModel` sequentially without a transaction.
**Severity:** HIGH
**Impact:** Partial failures (e.g., order created but cart not cleared) can corrupt state.
**Recommendation:** Wrap the operations in a `mongoose.startSession()` and `session.withTransaction()`.

**Module:** User Management
**File:** `controllers/user.controller.js`
**Function:** `userDetails()`
**Issue:** The same user profile is queried from the DB on multiple requests without caching.
**Severity:** MEDIUM
**Impact:** Potentially unnecessary database load.
**Recommendation:** Introduce Redis caching with a short TTL (15m) and invalidate the cache when profile data changes.

- **Phase 1:** Fix Weak/Critical Modules (Mongoose Transactions)
- **Phase 2:** Authentication Improvements (Google OAuth Integration)
- **Phase 3:** Redis Infrastructure
- **Phase 4:** Apply Caching to Read-Heavy Routes
- **Phase 5:** Cache Invalidation Strategy
- **Phase 6:** Performance Optimization (Search Indexing)
- **Phase 7:** Security & Production Hardening (Rate Limiting)
