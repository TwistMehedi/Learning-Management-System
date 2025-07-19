import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { useVerifyEmailQuery } from "../../redux/api/authApi.jsx";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slice/userSlice";

const EmailVerify = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(token,"token");
  const { data, error, isSuccess, isError } = useVerifyEmailQuery(token, {
    skip: !token,
  });

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser(data));
      setTimeout(() => {
        navigate("/");
      }, 2000);
     
    }
  }, [isSuccess, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="bg-white p-6 rounded-lg shadow-md text-center max-w-md">
        <h2 className="text-2xl font-semibold mb-4">
          {isSuccess
            ? "✅ Email Verified Successfully!"
            : isError
            ? "❌ Email Verification Failed"
            : "🔄 Verifying Email..."}
        </h2>
        <p className="text-gray-700">
          {isSuccess
            ? "You will be redirected shortly..."
            : isError
            ? error?.data?.message || "Invalid or expired token."
            : "Please wait..."}
        </p>

        {isSuccess && (
          <a href="/login" className="btn btn-primary mt-4">
            Go to Login
          </a>
        )}
      </div>
    </div>
  );
};

export default EmailVerify;
