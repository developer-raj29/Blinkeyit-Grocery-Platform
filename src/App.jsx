import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { toast } from "react-toastify";
import { useEffect } from "react";
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

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();

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

  // useEffect(() => {
  //   fetchUser();
  //   fetchCategory();
  //   fetchSubCategory();
  //   // fetchCartItem();
  // }, []);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        await Promise.all([fetchUser(), fetchCategory(), fetchSubCategory()]);
        console.log("fetching initial data:");
        // await fetchCartItem(); // if needed
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };

    fetchAllData();
  }, []);

  return (
    <GlobalProvider>
      <Header />
      <main className="min-h-[78vh]">
        <Outlet />
      </main>
      <Footer />
      {location.pathname !== "/checkout" && <CartMobileLink />}
    </GlobalProvider>
  );
};

export default App;
