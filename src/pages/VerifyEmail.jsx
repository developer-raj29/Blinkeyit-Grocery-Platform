import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  console.log("code: ", code);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await Axios({ ...SummaryApi.verifyEmail, code: code });

        if (response.data.success) {
          toast.success("Email Verified Successfully!");
        } else {
          toast.error("Verification failed" || response.data.message);
        }
      } catch (error) {
        toast.error("Verification failed");
      }
    };

    if (code) {
      verifyEmail();
    }
  }, [code]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-xl font-semibold">Verifying your email...</h1>
    </div>
  );
};

export default VerifyEmail;
