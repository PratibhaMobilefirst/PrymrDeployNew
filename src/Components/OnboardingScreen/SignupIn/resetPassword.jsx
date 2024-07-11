import { FaArrowLeftLong } from "react-icons/fa6";
import "./signup.css";
import ValidationButton from "./ValidationButton";
import { useParams } from "react-router";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [passwordError, setPasswordError] = useState("");
  // const { token } = useParams();

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
    token: "",
  });

  if (token) {
    formData.token = token;
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleContinue = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://prymr.vercel.app/api/auth/verifyForgotPassword`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      // console.log(data);

      if (response.status) {
        // alert("Password Changed");
        toast.success(data.message);
      } else {
        alert(data.message);
        console.log(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-black text-white">
      <ToastContainer position="top-center" />
      <div className="relative pt-5 m-4">
        <div
          style={{
            marginLeft: "6px",
            marginTop: "30px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <FaArrowLeftLong className="mr-2" />
          <p className="text-base font-semibold leading-[21.82px] text-center">
            Sign in to account
          </p>
        </div>
        <h1 className="m-4 text-4xl font-bold leading-[38.19px] text-left">
          Reset Password
        </h1>
        <h3 className="mb-2">Please enter your new password.</h3>
        <form>
          <label>
            New Password
            <input
              className="w-[388px] mt-1 h-[50px] pl-2  gap-0  bg-gray-800 rounded-tl-md "
              type="text"
              name="password"
              value={formData.password}
              placeholder="Enter Password"
              onChange={handlePasswordChange}
              required
            />
          </label>
          <ValidationButton password={formData.password} />

          <label>
            Confirm Password
            <input
              className="w-[388px] mt-2 h-[50px] pl-5 gap-0  bg-gray-800 rounded-tl-md "
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              placeholder="Confirm Your Password"
              onChange={handlePasswordChange}
              required
            />
            {password === confirmPassword ? (
              <p className="text-xs bg-pink text-red-500 mt-0">
                Password Matches!!
              </p>
            ) : (
              <p className="text-xs bg-pink text-red-500 mt-0">
                {" "}
                Password Does Matches
              </p>
            )}
          </label>
        </form>

        <button
          className="text-white ml-2 mt-[39vh] font-bold bg-opacity-300 bg-blue-600 gap-2 w-[95%] h-[45px] rounded-full "
          type="submit"
          onClick={handleContinue}
        >
          Continue
        </button>
        <img
          src="\Images\Line.png"
          className="bg-black flex justify-center mx-auto mt-10 align-center"
          alt=""
        />
      </div>
    </div>
  );
};
export default ResetPassword;
