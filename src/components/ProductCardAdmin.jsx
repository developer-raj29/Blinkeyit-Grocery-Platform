// import React, { useState } from "react";
// import EditProductAdmin from "./EditProductAdmin";
// import CofirmBox from "./CofirmBox";
// import { IoClose } from "react-icons/io5";
// import SummaryApi from "../common/SummaryApi";
// import Axios from "../utils/Axios";
// import AxiosToastError from "../utils/AxiosToastError";
// import { toast} from "react-toastify";

// const ProductCardAdmin = ({ data, fetchProductData }) => {
//   const [editOpen, setEditOpen] = useState(false);
//   const [openDelete, setOpenDelete] = useState(false);

//   const handleDeleteCancel = () => {
//     setOpenDelete(false);
//   };

//   const handleDelete = async () => {
//     try {
//       const response = await Axios({
//         ...SummaryApi.deleteProduct,
//         data: {
//           _id: data._id,
//         },
//       });

//       const { data: responseData } = response;

//       if (responseData.success) {
//         toast.success(responseData.message);
//         if (fetchProductData) {
//           fetchProductData();
//         }
//         setOpenDelete(false);
//       }
//     } catch (error) {
//       AxiosToastError(error);
//     }
//   };
//   return (
//     <div className="w-36 p-4 bg-white rounded">
//       <div>
//         <img
//           src={data?.image[0]}
//           alt={data?.name}
//           className="w-full h-full object-scale-down"
//         />
//       </div>
//       <p className="text-ellipsis line-clamp-2 font-medium">{data?.name}</p>
//       <p className="text-slate-400">{data?.unit}</p>
//       <div className="grid grid-cols-2 gap-3 py-2">
//         <button
//           onClick={() => setEditOpen(true)}
//           className="border px-1 py-1 text-sm border-green-600 bg-green-100 text-green-800 hover:bg-green-200 rounded"
//         >
//           Edit
//         </button>
//         <button
//           onClick={() => setOpenDelete(true)}
//           className="border px-1 py-1 text-sm border-red-600 bg-red-100 text-red-600 hover:bg-red-200 rounded"
//         >
//           Delete
//         </button>
//       </div>

//       {editOpen && (
//         <EditProductAdmin
//           fetchProductData={fetchProductData}
//           data={data}
//           close={() => setEditOpen(false)}
//         />
//       )}

//       {openDelete && (
//         <section className="fixed top-0 left-0 right-0 bottom-0 bg-neutral-600 z-50 bg-opacity-70 p-4 flex justify-center items-center ">
//           <div className="bg-white p-4 w-full max-w-md rounded-md">
//             <div className="flex items-center justify-between gap-4">
//               <h3 className="font-semibold">Permanent Delete</h3>
//               <button onClick={() => setOpenDelete(false)}>
//                 <IoClose size={25} />
//               </button>
//             </div>
//             <p className="my-2">Are you sure want to delete permanent ?</p>
//             <div className="flex justify-end gap-5 py-4">
//               <button
//                 onClick={handleDeleteCancel}
//                 className="border px-3 py-1 rounded bg-red-100 border-red-500 text-red-500 hover:bg-red-200"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleDelete}
//                 className="border px-3 py-1 rounded bg-green-100 border-green-500 text-green-500 hover:bg-green-200"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </section>
//       )}
//     </div>
//   );
// };

// export default ProductCardAdmin;

import React, { useState } from "react";
import EditProductAdmin from "./EditProductAdmin";
import { IoClose } from "react-icons/io5";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import { toast} from "react-toastify";

const ProductCardAdmin = ({ data, fetchProductData }) => {
  const [editOpen, setEditOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  console.log("data: ", data);

  const handleDelete = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteProduct,
        data: {
          _id: data._id,
        },
      });

      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        fetchProductData && fetchProductData();
        setOpenDelete(false);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <>
      <div className="relative bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 p-4 40 flex flex-col gap-3">
        <span className="absolute top-0 right-0 bg-green-400 text-black text-xs font-medium px-2 py-2 rounded-xl shadow-sm">
          Stock: {data?.stock}
        </span>
        <div className="w-full h-32 overflow-hidden flex justify-center items-center bg-gray-100 rounded-md">
          <img
            src={data?.image[0]}
            alt={data?.name}
            className="object-contain w-full h-full"
          />
        </div>

        <div className="text-sm font-semibold line-clamp-2 text-gray-800">
          {data?.name}
        </div>
        <div className="text-xs text-gray-500">Qty: {data?.unit}</div>

        <div className="flex justify-between gap-2 mt-2">
          <button
            onClick={() => setEditOpen(true)}
            className="flex-1 px-2 py-1 text-xs text-green-700 border border-green-500 bg-green-100 hover:bg-green-200 rounded-md"
          >
            Edit
          </button>
          <button
            onClick={() => setOpenDelete(true)}
            className="flex-1 px-2 py-1 text-xs text-red-700 border border-red-500 bg-red-100 hover:bg-red-200 rounded-md"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {editOpen && (
        <EditProductAdmin
          fetchProductData={fetchProductData}
          data={data}
          close={() => setEditOpen(false)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {openDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center p-4">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-5 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
              onClick={() => setOpenDelete(false)}
            >
              <IoClose size={24} />
            </button>
            <h2 className="text-lg font-semibold text-red-600 mb-2">
              Confirm Deletion
            </h2>
            <p className="text-sm text-gray-700">
              Are you sure you want to permanently delete this product?
            </p>

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setOpenDelete(false)}
                className="px-4 py-1 border rounded-md text-sm border-gray-400 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-1 border rounded-md text-sm bg-red-100 border-red-500 text-red-600 hover:bg-red-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCardAdmin;
