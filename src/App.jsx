import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import fetchUserDetails from "./utils/fetchUserDetails";
import { setUserDetails } from "./store/userSlice";
import {
  setAllCategory,
  setAllSubCategory,
  setLoadingCategory,
} from "./store/productSlice";
import { useDispatch } from "react-redux";
import Axios from "./utils/Axios";
import SummaryApi from "./common/SummaryApi";
import GlobalProvider from "./provider/GlobalProvider";
import CartMobileLink from "./components/CartMobile";

import loader from "./assets/preloader.gif";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    const userData = await fetchUserDetails();
    // dispatch(setUserDetails(userData.data));
    if (userData?.data) {
      dispatch(setUserDetails(userData.data));
    } else {
      console.warn("No user data returned");
    }
    console.log("userData: ", userData);
  };

  const fetchCategory = async () => {
    try {
      dispatch(setLoadingCategory(true));
      const response = await Axios({
        ...SummaryApi.getCategory,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(
          setAllCategory(
            responseData.data.sort((a, b) => a.name.localeCompare(b.name))
          )
        );
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      toast.error("Failed to load categories.");
    } finally {
      dispatch(setLoadingCategory(false));
    }
  };

  const fetchSubCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getSubCategory,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(
          setAllSubCategory(
            responseData.data.sort((a, b) => a.name.localeCompare(b.name))
          )
        );
      }
    } catch (error) {
      console.error("Failed to fetch subcategories:", error);
      toast.error("Failed to load subcategories.");
    } finally {
      dispatch(setLoadingCategory(false));
    }
  };

  const token = sessionStorage.getItem("accesstoken");
  console.log("token: ", token);

  const fetchData = async () => {
    setLoading(true);

    const start = Date.now();

    await Promise.all([fetchCategory(), fetchSubCategory()]);
    if (token) await fetchUser();

    const elapsed = Date.now() - start;
    const remaining = Math.max(2000 - elapsed, 0); // ensure at least 2s
    // console.log("start: ", start);
    // console.log("elapsed: ", elapsed);
    // console.log("remaining: ", remaining);

    setTimeout(() => {
      setLoading(false);
    }, remaining);
  };

  useEffect(() => {
    fetchData();
  }, [token]); // 👈 re-run if token changes

  return (
    <GlobalProvider>
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <img src={loader} alt="Loading..." className="max-w-72 max-h-max" />
        </div>
      ) : (
        <>
          <Header />
          <main className="min-h-[78vh]">
            <Outlet />
          </main>
          <Footer />
          {location.pathname !== "/checkout" && <CartMobileLink />}
        </>
      )}
    </GlobalProvider>
  );
};

export default App;
