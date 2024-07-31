import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css";
import blueFly from "../../assets/mainpageclouds.svg";
import { RxCrossCircled } from "react-icons/rx";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { baseURL } from "../../Constants/urls";
import token from "../../Constants/urls";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignupPage = () => {
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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

  const handleBack = () => {
    navigate("/");
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    // const storedToken = localStorage.getItem("token");
    // if (!storedToken) {
    //   alert("No token found. Please sign in again.");
    //   console.log("token:53" + storedToken);
    //   return;
    // }
    try {
      const response = await fetch(`${baseURL}/auth/createUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          // Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
      if (data.status) {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("userRole", data.data.userInfo.role);
        console.log("userRole 76 Signup : " + data.data.userInfo.role);
        toast.success("Sign in successful");
        navigate("/home");
      } else {
        const newErrors = {};
        if (data.message) {
          newErrors.general = data.message;
        }
        if (data.data && Array.isArray(data.data)) {
          data.data.forEach((error) => {
            if (error.property && error.message) {
              newErrors[error.property] = error.message;
            }
          });
        }
        setErrors(newErrors);
        toast.error("Sign up failed");
      }
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="bg-cover bg-center absolute h-screen  w-full flex justify-center items-center">
      <img
        src={blueFly}
        alt="Blue cloud"
        className="absolute w-full h-full object-cover"
      />
      <div className="relative ml-2  mr-2 flex flex-col items-center justify-center text-white">
        <div className="absolute -top-8 right-5">
          <RxCrossCircled
            className="w-8 h-8 cursor-pointer"
            onClick={handleBack}
          />
        </div>
        <h1 className="text-[28px] font-bold mb-1 text-center">
          Sign Up to get started on Prymr
        </h1>
        {errors.general && (
          <p className="text-md text-red-500 mt-4">{errors.general}</p>
        )}
        <form
          onSubmit={handleSignUp}
          className="bg-gray-800 bg-opacity-75 p-6 rounded-md sm:ml-[18px] sm:mr-[18px]"
        >
          <label>
            First Name:
            <input
              className="w-full p-2  bg-gray-900 rounded-md"
              type="text"
              name="firstName"
              value={formData.firstName}
              placeholder="Enter First Name"
              maxLength={80}
              onChange={handleChange}
              required
            />
            {errors.firstName && (
              <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>
            )}
          </label>
          <label>
            Last Name:
            <input
              className="w-full p-2  bg-gray-900 rounded-md"
              type="text"
              name="lastName"
              value={formData.lastName}
              placeholder="Enter Last Name"
              onChange={handleChange}
              maxLength={100}
              required
            />
            {errors.lastName && (
              <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>
            )}
          </label>
          <label>
            User Name:
            <input
              className="w-full p-2 bg-gray-900 rounded-md"
              type="text"
              name="userName"
              value={formData.userName}
              placeholder="Enter User Name"
              onChange={handleChange}
              maxLength={80}
              required
            />
            {errors.userName && (
              <p className="text-xs text-red-500 mt-1">{errors.userName}</p>
            )}
          </label>
          <label>
            Email :
            <input
              className="w-full p-2  bg-gray-900 rounded-md"
              type="text"
              name="email"
              value={formData.email}
              placeholder="Enter Email Id"
              onChange={handleChange}
              required
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email}</p>
            )}
          </label>
          {/* <label className="block mb-2 relative">
            Password :
            <input
              className="w-full p-2  bg-gray-900 rounded-md pr-10"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              placeholder="Enter Password"
              onChange={handleChange}
              required
            />
            <span
              className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
              onClick={toggleShowPassword}
            >
              {showPassword ? (
                <AiFillEyeInvisible className="w-5 h-5 mt-4 text-gray-400" />
              ) : (
                <AiFillEye className="w-5 h-5 mt-4 text-gray-400" />
              )}
            </span>
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">{errors.password}</p>
            )}
          </label> */}
          <label className="block mb-2 relative">
            Password :
            <input
              className="w-full p-2 bg-gray-900 rounded-md pr-10"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              placeholder="Enter Password"
              onChange={handleChange}
              required
            />
            <span
              className="absolute inset-y-0 right-0 mt-3 flex items-center pr-3 cursor-pointer"
              onClick={toggleShowPassword}
            >
              {showPassword ? (
                <AiFillEyeInvisible className="w-5 h-5  text-gray-400" />
              ) : (
                <AiFillEye className="w-5 h-5 text-gray-400" />
              )}
            </span>
          </label>{" "}
          {errors.password && (
            <p className="text-xs text-red-500 mt-1">{errors.password}</p>
          )}
          <div className="flex justify-center mt-6">
            <button
              className="text-white cursor-pointer font-bold bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full"
              type="submit"
            >
              Register Now
            </button>
          </div>
        </form>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          toastClassName="h-12 w-auto text-center toast-custom"
        />
      </div>
    </div>
  );
};

export default SignupPage;
