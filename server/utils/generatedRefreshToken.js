const UserModel = require("../models/user.model.js");
const jwt = require("jsonwebtoken");

const genertedRefreshToken = async (userId) => {
  const token = await jwt.sign(
    { id: userId },
    process.env.SECRET_KEY_REFRESH_TOKEN,
    { expiresIn: "7d" }
  );

  const updateRefreshTokenUser = await UserModel.updateOne(
    { _id: userId },
    {
      refresh_token: token,
    }
  );

  return token;
};

module.exports = genertedRefreshToken;
