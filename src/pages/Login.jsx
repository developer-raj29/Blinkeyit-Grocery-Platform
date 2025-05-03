import React, { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useNavigate } from "react-router-dom";
import fetchUserDetails from "../utils/fetchUserDetails";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/userSlice";

const Login = () => {
  const [data, setData] = useState({
    email: "dummyuser12@gmail.com" || "",
    password: "123456789" || "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const valideValue = Object.values(data).every((el) => el);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await Axios({ ...SummaryApi.login, data: data });

      console.log("login response: ", response);

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);
        console.log("accesstoken: ", response.data.data.accesstoken);
        console.log("accesstoken: ", response.data.data.refreshToken);

        // localStorage.setItem("accesstoken", response.data.data.accesstoken);
        // localStorage.setItem("refreshToken", response.data.data.refreshToken);

        sessionStorage.setItem("accesstoken", response.data.data.accesstoken);
        sessionStorage.setItem("refreshToken", response.data.data.refreshToken);

        const userDetails = await fetchUserDetails();
        dispatch(setUserDetails(userDetails.data));

        setData({ email: "", password: "" });
        navigate("/");
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };
  // return (
  //   <section className="w-full container mx-auto px-2">
  //     <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
  //       <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
  //         <div className="grid gap-1">
  //           <label htmlFor="email">Email :</label>
  //           <input
  //             type="email"
  //             id="email"
  //             className="bg-blue-50 p-2 border rounded outline-none focus:border-primary-200"
  //             name="email"
  //             value={data.email}
  //             onChange={handleChange}
  //             placeholder="Enter your email"
  //           />
  //         </div>
  //         <div className="grid gap-1">
  //           <label htmlFor="password">Password :</label>
  //           <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200">
  //             <input
  //               type={showPassword ? "text" : "password"}
  //               id="password"
  //               className="w-full outline-none"
  //               name="password"
  //               value={data.password}
  //               onChange={handleChange}
  //               placeholder="Enter your password"
  //             />
  //             <div
  //               onClick={() => setShowPassword((preve) => !preve)}
  //               className="cursor-pointer"
  //             >
  //               {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
  //             </div>
  //           </div>
  //           <Link
  //             to={"/forgot-password"}
  //             className="block ml-auto hover:text-primary-200"
  //           >
  //             Forgot password ?
  //           </Link>
  //         </div>

  //         <button
  //           disabled={!valideValue}
  //           className={` ${
  //             valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"
  //           }    text-white py-2 rounded font-semibold my-3 tracking-wide`}
  //         >
  //           Login
  //         </button>
  //       </form>

  //       <p>
  //         Don't have account?{" "}
  //         <Link
  //           to={"/register"}
  //           className="font-semibold text-green-700 hover:text-green-800"
  //         >
  //           Register
  //         </Link>
  //       </p>
  //     </div>
  //   </section>
  // );

  return (
    <section className="min-h-screen flex justify-center bg-gradient-to-tr from-green-100 via-white to-green-100 px-4">
      <div className="w-full max-h-min max-w-md mt-10 bg-white rounded-xl shadow-lg shadow-stone-500 p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-800">Welcome Back</h2>
          <p className="text-sm text-gray-600">Please log in to your account</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full mt-1 px-4 py-2 border rounded-md bg-blue-50 outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="flex items-center border rounded-md bg-blue-50 px-4 py-2 focus-within:ring-2 focus-within:ring-green-400">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="flex-1 bg-transparent outline-none"
              />
              <div
                onClick={() => setShowPassword((prev) => !prev)}
                className="cursor-pointer text-gray-600"
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
            <Link
              to="/forgot-password"
              className="block mt-1 text-sm text-green-700 hover:underline text-right"
            >
              Forgot password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            disabled={!valideValue || loading}
            className={`w-full py-2 rounded-md text-white font-semibold tracking-wide transition duration-200 flex items-center justify-center gap-2 ${
              valideValue && !loading
                ? "bg-green-700 hover:bg-green-800"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Register Redirect */}
        <p className="text-center text-sm text-gray-700">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-green-700 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
