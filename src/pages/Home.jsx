import banner from "../assets/banner.jpg";
import bannerMobile from "../assets/banner-mobile.jpg";
import { useSelector } from "react-redux";
import { valideURLConvert } from "../utils/valideURLConvert";
import { useNavigate } from "react-router-dom";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";
import { useState } from "react";
import { toast } from "react-toastify";

const Home = () => {
  const loadingCategory = useSelector((state) => state.product.loadingCategory);
  const categoryData = useSelector((state) => state.product.allCategory);
  const subCategoryData = useSelector((state) => state.product.allSubCategory);
  const navigate = useNavigate();
  const [bannerLoaded, setBannerLoaded] = useState(false);

  const handleRedirectProductListpage = (id, cat) => {
    const subcategory = subCategoryData.find((sub) => {
      const subCat = sub.category;

      if (Array.isArray(subCat)) {
        return subCat.some((c) => String(c?._id || c) === String(id));
      } else if (typeof subCat === "object" && subCat !== null) {
        return String(subCat._id) === String(id);
      }

      return false;
    });

    if (!subcategory) {
      // Fallback route: Search for the category name if no specific subcategories are found
      toast.info(`Showing all products for ${cat}`);
      navigate(`/search?q=${valideURLConvert(cat)}`);
      return;
    }

    const url = `/${valideURLConvert(cat)}-${id}/${valideURLConvert(
      subcategory.name,
    )}-${subcategory._id}`;

    navigate(url);
  };

  return (
    <section className="bg-white">
      <div className="container mx-auto">
        <div
          className={`w-full h-full min-h-48 bg-blue-100 rounded relative ${
            !bannerLoaded ? "animate-pulse my-2" : ""
          }`}
        >
          <img
            src={banner}
            className={`w-full h-full hidden lg:block ${!bannerLoaded ? "opacity-0" : "opacity-100 transition-opacity duration-300"}`}
            alt="Blinkeyit Promotional Banner"
            onLoad={() => setBannerLoaded(true)}
          />
          <img
            src={bannerMobile}
            className={`w-full h-full lg:hidden ${!bannerLoaded ? "opacity-0" : "opacity-100 transition-opacity duration-300"}`}
            alt="Blinkeyit Promotional Banner Mobile"
            onLoad={() => setBannerLoaded(true)}
          />
        </div>
      </div>

      <div className="container mx-auto px-4 my-2 grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-2">
        {loadingCategory
          ? //loading skeleton
            new Array(20).fill(null).map((c, index) => {
              return (
                <div
                  key={index + "loadingcategory"}
                  className="bg-white rounded p-4 min-h-36 grid gap-2 shadow animate-pulse"
                >
                  <div className="bg-blue-100 min-h-24 rounded"></div>
                  <div className="bg-blue-100 h-8 rounded"></div>
                </div>
              );
            })
          : categoryData.map((cat, index) => {
              return (
                <div
                  key={cat._id + "displayCategory"}
                  className="w-full h-full cursor-pointer group"
                  onClick={() =>
                    handleRedirectProductListpage(cat._id, cat.name)
                  }
                >
                  <div className="overflow-hidden rounded transition-transform duration-300 group-hover:scale-105">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-scale-down"
                    />
                  </div>
                </div>
              );
            })}
      </div>

      {/***display category product */}
      {categoryData?.map((c, index) => {
        return (
          <CategoryWiseProductDisplay
            key={c?._id + "CategorywiseProduct"}
            id={c?._id}
            name={c?.name}
          />
        );
      })}
    </section>
  );
};

export default Home;
