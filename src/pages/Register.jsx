// import React, { useState } from "react";
// import { FaRegEyeSlash } from "react-icons/fa6";
// import { FaRegEye } from "react-icons/fa6";
// import toast from "react-toastify";
// import Axios from "../utils/Axios";
// import SummaryApi from "../common/SummaryApi";
// import AxiosToastError from "../utils/AxiosToastError";
// import { Link, useNavigate } from "react-router-dom";

// const Register = () => {
//   const [data, setData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setData((preve) => {
//       return {
//         ...preve,
//         [name]: value,
//       };
//     });
//   };

//   const valideValue = Object.values(data).every((el) => el);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (data.password !== data.confirmPassword) {
//       toast.error("password and confirm password must be same");
//       return;
//     }

//     try {
//       const response = await Axios({
//         ...SummaryApi.register,
//         data: data,
//       });

//       if (response.data.error) {
//         toast.error(response.data.message);
//       }

//       if (response.data.success) {
//         toast.success(response.data.message);
//         setData({
//           name: "",
//           email: "",
//           password: "",
//           confirmPassword: "",
//         });
//         navigate("/login");
//       }
//     } catch (error) {
//       AxiosToastError(error);
//     }
//   };
//   return (
//     <section className="w-full container mx-auto px-2">
//       <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
//         <p>Welcome to Binkeyit</p>

//         <form className="grid gap-4 mt-6" onSubmit={handleSubmit}>
//           <div className="grid gap-1">
//             <label htmlFor="name">Name :</label>
//             <input
//               type="text"
//               id="name"
//               autoFocus
//               className="bg-blue-50 p-2 border rounded outline-none focus:border-primary-200"
//               name="name"
//               value={data.name}
//               onChange={handleChange}
//               placeholder="Enter your name"
//             />
//           </div>
//           <div className="grid gap-1">
//             <label htmlFor="email">Email :</label>
//             <input
//               type="email"
//               id="email"
//               className="bg-blue-50 p-2 border rounded outline-none focus:border-primary-200"
//               name="email"
//               value={data.email}
//               onChange={handleChange}
//               placeholder="Enter your email"
//             />
//           </div>
//           <div className="grid gap-1">
//             <label htmlFor="password">Password :</label>
//             <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 id="password"
//                 className="w-full outline-none"
//                 name="password"
//                 value={data.password}
//                 onChange={handleChange}
//                 placeholder="Enter your password"
//               />
//               <div
//                 onClick={() => setShowPassword((preve) => !preve)}
//                 className="cursor-pointer"
//               >
//                 {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
//               </div>
//             </div>
//           </div>
//           <div className="grid gap-1">
//             <label htmlFor="confirmPassword">Confirm Password :</label>
//             <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200">
//               <input
//                 type={showConfirmPassword ? "text" : "password"}
//                 id="confirmPassword"
//                 className="w-full outline-none"
//                 name="confirmPassword"
//                 value={data.confirmPassword}
//                 onChange={handleChange}
//                 placeholder="Enter your confirm password"
//               />
//               <div
//                 onClick={() => setShowConfirmPassword((preve) => !preve)}
//                 className="cursor-pointer"
//               >
//                 {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
//               </div>
//             </div>
//           </div>

//           <button
//             disabled={!valideValue}
//             className={` ${
//               valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"
//             }    text-white py-2 rounded font-semibold my-3 tracking-wide`}
//           >
//             Register
//           </button>
//         </form>

//         <p>
//           Already have account ?{" "}
//           <Link
//             to={"/login"}
//             className="font-semibold text-green-700 hover:text-green-800"
//           >
//             Login
//           </Link>
//         </p>
//       </div>
//     </section>
//   );
// };

// export default Register;

import React, { useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import toast from "react-toastify";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const valideValue = Object.values(data).every((el) => el);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      toast.error("Password and confirm password must be same");
      return;
    }

    setLoading(true);
    try {
      const response = await Axios({
        ...SummaryApi.register,
        data: data,
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);
        setData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        navigate("/login");
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex justify-center bg-gradient-to-tr from-green-100 via-white to-green-300 px-2">
      <div className="bg-white max-h-min mt-10 shadow-lg shadow-stone-500 w-full max-w-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold text-center text-green-800 mb-1">
          Welcome to Blinkeyit
        </h2>
        <p className="text-center text-gray-500 mb-6">Create your account</p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block mb-1 font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              autoFocus
              className="w-full p-2 bg-blue-50 border rounded outline-none focus:border-green-400"
              value={data.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-2 bg-blue-50 border rounded outline-none focus:border-green-400"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 font-medium">
              Password
            </label>
            <div className="flex items-center p-2 bg-blue-50 border rounded focus-within:border-green-400">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="w-full outline-none bg-transparent"
                value={data.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
              <div
                className="cursor-pointer text-gray-600"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block mb-1 font-medium">
              Confirm Password
            </label>
            <div className="flex items-center p-2 bg-blue-50 border rounded focus-within:border-green-400">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                className="w-full outline-none bg-transparent"
                value={data.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
              />
              <div
                className="cursor-pointer text-gray-600"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
          </div>

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
                Registering...
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <p className="text-center text-sm mt-5 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-green-700 hover:text-green-800"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
