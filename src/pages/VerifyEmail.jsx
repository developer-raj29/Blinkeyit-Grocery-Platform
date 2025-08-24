import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { toast } from "react-toastify";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const code = searchParams.get("code");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await Axios({
          ...SummaryApi.verifyEmail,
          url: `${SummaryApi.verifyEmail.url}?code=${code}`,
        });

        if (response.data.success) {
          setTimeout(() => {
            toast.success("Email Verified Successfully!");
            navigate("/login");
          }, 2000); // wait 3s before redirect
        } else {
          toast.error(response.data.message || "Verification failed.");
        }
        setLoading(true);
      } catch (error) {
        toast.error(error.response?.data?.message || "Verification failed.");
      } finally {
        setLoading(false);
      }
    };

    if (code) {
      verifyEmail();
    }
  }, [code, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      {loading ? (
        <div className="flex flex-col items-center">
          {/* Spinner */}
          <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-3"></div>
          <h1 className="text-xl font-semibold">Verifying your email...</h1>
        </div>
      ) : (
        <h1 className="text-xl font-semibold">Verification complete!</h1>
      )}
    </div>
  );
};

export default VerifyEmail;
