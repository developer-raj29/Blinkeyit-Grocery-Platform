import React, { useEffect, useState } from "react";
import UploadCategoryModel from "../components/UploadCategoryModel";
import Loading from "../components/Loading";
import NoData from "../components/NoData";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import EditCategory from "../components/EditCategory";
import CofirmBox from "../components/CofirmBox";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { useSelector } from "react-redux";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

const CategoryPage = () => {
  const [openUploadCategory, setOpenUploadCategory] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    image: "",
  });
  const [openConfimBoxDelete, setOpenConfirmBoxDelete] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState({
    _id: "",
  });
  // const allCategory = useSelector(state => state.product.allCategory)

  // useEffect(()=>{
  //     setCategoryData(allCategory)
  // },[allCategory])

  const fetchCategory = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getCategory,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        setCategoryData(responseData.data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const handleDeleteCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteCategory,
        data: deleteCategory,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        fetchCategory();
        setOpenConfirmBoxDelete(false);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="">
      <div className="p-2   bg-white shadow-md flex items-center justify-between">
        <h2 className="font-semibold">Category</h2>
        <button
          onClick={() => setOpenUploadCategory(true)}
          className="text-sm border border-primary-200 hover:bg-primary-200 px-3 py-1 rounded"
        >
          Add Category
        </button>
      </div>
      {!categoryData[0] && !loading && <NoData />}

      <div className="py-6 px-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12">
        {categoryData.map((category, index) => {
          return (
            // <div className="w-32 h-56 rounded shadow-md" key={category._id}>
            //   <img
            //     alt={category.name}
            //     src={category.image}
            //     className="w-full object-scale-down"
            //   />
            //   <div className="items-center h-9 flex gap-2">
            //     {/* <button
            //       onClick={() => {
            //         setOpenEdit(true);
            //         setEditData(category);
            //       }}
            //       className="flex-1 bg-green-100 hover:bg-green-200 text-green-600 font-medium py-1 rounded"
            //     >
            //       Edit
            //     </button>
            //     <button
            //       onClick={() => {
            //         setOpenConfirmBoxDelete(true);
            //         setDeleteCategory(category);
            //       }}
            //       className="flex-1 bg-red-100 hover:bg-red-200 text-red-600 font-medium py-1 rounded"
            //     >
            //       Delete
            //     </button> */}
            //     <button
            //       onClick={() => {
            //         setOpenEdit(true);
            //         setEditData(category);
            //       }}
            //       className="flex-1 bg-green-100 hover:bg-green-200 text-green-600 font-medium py-1 rounded flex items-center justify-center gap-1"
            //     >
            //       <FiEdit size={18} title="Edit" />
            //     </button>

            //     <button
            //       onClick={() => {
            //         setOpenConfirmBoxDelete(true);
            //         setDeleteCategory(category);
            //       }}
            //       className="flex-1 bg-red-100 hover:bg-red-200 text-red-600 font-medium py-1 rounded flex items-center justify-center gap-1"
            //     >
            //       <MdDelete size={20} title="Delete" />
            //     </button>
            //   </div>
            // </div>

            <div
              key={category._id}
              className="w-40 rounded-xl shadow-md bg-white hover:shadow-xl hover:border transition-shadow duration-300 overflow-hidden group"
            >
              <div className="h-40 bg-gray-100 flex items-center justify-center">
                {category.image ? (
                  <img
                    alt={category.name}
                    src={category.image}
                    className="w-full h-full object-contain p-2"
                  />
                ) : (
                  <span className="text-gray-400 text-sm">No Image</span>
                )}
              </div>

              <div className="p-2">
                <h3 className="text-sm font-semibold text-gray-800 truncate text-center">
                  {category.name}
                </h3>

                <div className="mt-2 flex justify-around items-center">
                  <button
                    onClick={() => {
                      setOpenEdit(true);
                      setEditData(category);
                    }}
                    className="p-2 rounded-full hover:bg-green-100 text-green-600 transition"
                    title="Edit"
                  >
                    <FiEdit size={18} />
                  </button>

                  <button
                    onClick={() => {
                      setOpenConfirmBoxDelete(true);
                      setDeleteCategory(category);
                    }}
                    className="p-2 rounded-full hover:bg-red-100 text-red-600 transition"
                    title="Delete"
                  >
                    <MdDelete size={20} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {loading && <Loading />}

      {openUploadCategory && (
        <UploadCategoryModel
          fetchData={fetchCategory}
          close={() => setOpenUploadCategory(false)}
        />
      )}

      {openEdit && (
        <EditCategory
          data={editData}
          close={() => setOpenEdit(false)}
          fetchData={fetchCategory}
        />
      )}

      {openConfimBoxDelete && (
        <CofirmBox
          close={() => setOpenConfirmBoxDelete(false)}
          cancel={() => setOpenConfirmBoxDelete(false)}
          confirm={handleDeleteCategory}
        />
      )}
    </section>
  );
};

export default CategoryPage;
