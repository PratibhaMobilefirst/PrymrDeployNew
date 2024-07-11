import { Link, useNavigate } from "react-router-dom";
import "./signup.css";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ValidationButton from "./ValidationButton";

import { RxCrossCircled } from "react-icons/rx";

const SignupPage = () => {
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // setPassword(e.target.value);
  };

  // Perform password validation
  const handleSubmit = (e) => {
    e.preventDefault();

    // -------------***********Validate form data ********** -------------
    if (
      formData.firstName !== "" &&
      formData.lastName !== "" &&
      formData.userName !== "" &&
      passwordValid &&
      formData.email.trim() !== ""
    ) {
      handleSignUp(e);
    } else {
      alert("Please fill out all the fields correctly");
    }
  };

  //-------------***********API INTEGRATION ********** -------------

  const handleSignUp = async (e) => {
    e.preventDefault();
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      alert("No token found. Please sign in again.");
      console.log("token:53" + storedToken);
      return;
    }
    try {
      const result = await fetch(
        "https://prymr-dev-backend.vercel.app/api/auth/completeProfile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${storedToken}`,
          },

          body: JSON.stringify(formData),
        }
      )
        .then((response) => {
          console.log(response);
          return response.json();
        })

        .then((data) => {
          console.log(data);
          if (data.status) {
            alert("Sign in successful");
            navigate("/home");
          } else {
            alert("Sign in failed");
          }
        });
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };
  // console.log("Data :" + data.data.token);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <div className="bg-black text-white p-3 h-[100vh]">
      <div className="relative pt-5">
        <RxCrossCircled className=" w-8 h-8 mx-[82%] top-[55.89px]  " />
        <h1 className="text-left m-3 text-[28px] font-bold h-39.19 ">
          Sign Up to get started on Prymr
        </h1>
      </div>
      <div className="m-6">
        <form onSubmit={handleSignUp}>
          <label>
            First Name
            <input
              className="w-[388px] mt-1 h-[50px] gap-0 pl-2 bg-gray-800 rounded-tl-md "
              type="text"
              name="firstName"
              value={formData.firstName}
              placeholder="Enter First Name"
              maxLength={80}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Last Name
            <input
              className="w-[388px] h-[50px] gap-0 pl-2 bg-gray-800 rounded-tl-md "
              type="text"
              name="lastName"
              value={formData.lastName}
              placeholder="Enter Last Name"
              onChange={handleChange}
              maxLength="100"
              required
            />
          </label>
          <label>
            User Name
            <input
              className="w-[388px] h-[50px] gap-0 pl-2 bg-gray-800 rounded-tl-md "
              type="text"
              name="userName"
              value={formData.userName}
              placeholder="Enter User Name"
              onChange={handleChange}
              maxLength="80"
              required
            />
          </label>

          <button
            className="text-white mt-[30vh] font-bold bg-opacity-300 bg-blue-600 gap-2 w-[95%] h-[45px] rounded-full "
            type="submit"
          >
            Register Now
          </button>
        </form>
      </div>
    </div>
  );
};
export default SignupPage;
