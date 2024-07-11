import { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value); // Check if the email is valid
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    setIsValid(emailRegex.test(value) && value.trim() !== "");
  };

  const handleContinue = async (e) => {
    try {
      const response = await fetch(
        `https://prymr.vercel.app/api/auth/forgotPassword?email=${email}`,
        {
          method: "POST",
        }
      );

      const data = await response.json();
      console.log(data);

      if (response.status) {
        alert("Email Sent to mail");
        setMessage(data.message);
      } else {
        setError(data.message);
      }
      console.log("response", response);
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again later.");
    }

    setLoading(false);
  };

  const handleBack = () => {
    navigate("/signin");
  };

  return (
    <div className="text-white h-auto flex flex-col container px-2">
      <div className="flex-grow">
        <div className="ml-6 mt-8 flex items-center">
          <FaArrowLeftLong className="mr-2" />
          <p
            className="text-base cursor-pointer font-semibold leading-[21.82px] text-center "
            onClick={handleBack}
          >
            Sign in to account
          </p>
        </div>
        <h1 className="m-2 text-4xl mt-6 mb-4 font-bold leading-[38.19px] text-left">
          Forgot Password
        </h1>
        <p className="m-3 text-sm font-normal leading-[20.46px] text-left">
          Please enter the email address you used when creating this account,
          and we’ll send you instructions to reset your password.
        </p>
        <div className="space-y-2 py-3">
          <label className="block mb-1 ml-3">Email Address / Username</label>
          <input
            className="w-[90vw] md:w-[50vw] m-3 h-[50px] pl-5 bg-gray-800 rounded-tl-md"
            type="email"
            name="email"
            value={email}
            placeholder="Enter Email Address"
            onChange={handleEmailChange}
            required
          />
          {email.length > 0 && (
            <p
              className={`text-xs mt-1 ml-3 ${
                isValid ? "text-green-500" : "text-red-500"
              }`}
            >
              {isValid ? "Email is valid" : "Email is not valid"}
            </p>
          )}
        </div>
      </div>
      <div className="w-[80vw] fixed  bottom-0 ml-3 flex flex-col items-center py-3 ">
        <button
          className="text-white mb-3 font-bold bg-opacity-300 bg-blue-600 w-[80vw] md:w-[50vw] h-[45px] rounded-full"
          type="submit"
          onClick={handleContinue}
        >
          Continue
        </button>
        <img src="/Images/Line.png" className="bg-black" alt="Line" />
      </div>
    </div>
  );
};
export default ForgetPassword;
