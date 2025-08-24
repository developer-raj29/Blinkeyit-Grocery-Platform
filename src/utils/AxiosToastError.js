import toast from "react-toastify"

const AxiosToastError = (error)=>{
    toast.error(
        error?.response?.data?.message
    )
}

export default AxiosToastError