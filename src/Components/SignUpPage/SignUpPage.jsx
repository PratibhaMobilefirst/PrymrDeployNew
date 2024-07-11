// import { Link, useNavigate } from "react-router-dom";
// import "./signup.css";
// import { useState } from "react";
// import blueFly from "../../assets/mainpageclouds.svg";

// import { RxCrossCircled } from "react-icons/rx";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const SignupPage = () => {
//   const [password, setPassword] = useState("");
//   const [passwordValid, setPasswordValid] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();
//   const storedToken = localStorage.getItem("token");

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     userName: "",
//   });
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     // setPassword(e.target.value);
//   };

//   // Perform password validation
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // -------------***********Validate form data ********** -------------
//     if (
//       formData.firstName !== "" &&
//       formData.lastName !== "" &&
//       formData.userName !== "" &&
//       passwordValid &&
//       formData.email.trim() !== ""
//     ) {
//       handleSignUp(e);
//     } else {
//       alert("Please fill out all the fields correctly");
//     }
//   };
//   const handleBack = () => {
//     const storedToken = localStorage.removeItem("token");
//     navigate("/");
//   };

//   //-------------***********API INTEGRATION ********** -------------

//   const handleSignUp = async (e) => {
//     e.preventDefault();

//     if (!storedToken) {
//       alert("No token found. Please sign in again.");

//       return;
//     }
//     try {
//       const result = await fetch(
//         "https://prymr-dev-backend.vercel.app/api/auth/completeProfile",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json",
//             Authorization: `Bearer ${storedToken}`,
//           },

//           body: JSON.stringify(formData),
//         }
//       )
//         .then((response) => {
//           console.log(response);
//           return response.json();
//         })

//         .then((data) => {
//           console.log(data);
//           if (data.flag == null) {
//             alert("Sign in successful");
//             navigate("/home");
//           } else {
//             alert("Sign in failed, please complete the sign-up process.");
//             navigate("/signuppage");
//           }
//         });
//     } catch (error) {
//       console.error("Error signing in:", error);
//       toast.error("Error in signing in");
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword((prev) => !prev);
//   };
//   return (
//     <div className="bg-cover bg-center absolute h-[100vh] w-full flex justify-center items-center">
//       <img
//         src={blueFly}
//         alt="Blue cloud"
//         className="absolute w-full h-full object-cover"
//       />
//       <div className="relative flex flex-col items-center justify-center text-white">
//         <div className="absolute -top-8 right-5">
//           <RxCrossCircled
//             className="w-8 h-8 cursor-pointer"
//             onClick={handleBack}
//           />
//         </div>
//         <h1 className="text-[28px] font-bold mb-6 text-center">
//           Sign Up to get started on Prymr
//         </h1>
//         <form
//           className="bg-gray-800 bg-opacity-75 p-6 rounded-md"
//           onSubmit={handleSignUp}
//         >
//           <label className="block mb-4">
//             First Name:
//             <input
//               className="w-full p-2 mt-1 bg-gray-900 rounded-md"
//               type="text"
//               name="firstName"
//               value={formData.firstName}
//               placeholder="Enter First Name"
//               maxLength={80}
//               onChange={handleChange}
//               required
//             />
//           </label>
//           <label className="block mb-4">
//             Last Name:
//             <input
//               className="w-full p-2 mt-1 bg-gray-900 rounded-md"
//               type="text"
//               name="lastName"
//               value={formData.lastName}
//               placeholder="Enter Last Name"
//               onChange={handleChange}
//               maxLength={100}
//               required
//             />
//           </label>
//           <label className="block mb-4">
//             User Name:
//             <input
//               className="w-full p-2 mt-1 bg-gray-900 rounded-md"
//               type="text"
//               name="userName"
//               value={formData.userName}
//               placeholder="Enter User Name"
//               onChange={handleChange}
//               maxLength={80}
//               required
//             />
//           </label>
//           <div className="flex justify-center mt-6">
//             <button
//               className="text-white font-bold bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full"
//               type="submit"
//             >
//               Register Now
//             </button>
//           </div>
//         </form>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };
// export default SignupPage;


import { Link, useNavigate } from "react-router-dom";
import "./signup.css";
import { useState } from "react";
import blueFly from "../../assets/mainpageclouds.svg";

import { RxCrossCircled } from "react-icons/rx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseURL } from "../../Constants/urls";
import token from "../../Constants/urls";

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
  const handleBack = () => {
    const storedToken = localStorage.removeItem("token");
    navigate("/");
  };

  //-------------***********API INTEGRATION ********** -------------

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const result = await fetch(`${baseURL}/auth/createUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer {eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM0ZGNhYTA0LTFkMmItNGJiZi04OWJjLTc5MjU2OTkwNDIyMSIsInVzZXJOYW1lIjoiYWtzaGFkYV95ZWwiLCJlbWFpbCI6ImFrc2hhZGExMjNAZ21haWwuY29tIiwiZmlyc3ROYW1lIjoiQWtzaGFkYSIsImxhc3ROYW1lIjoiWWVsIiwiaWF0IjoxNzIwNzEzNTkwLCJleHAiOjE3Mzk3MjE1OTB9.Zo-5EHnbBV5FNGpW2PZgCmvmali8A9Z9pW_PTj_qdvc}`,
        },
        body: JSON.stringify(formData),
      });

      if (!result.ok) {
        throw new Error(`HTTP error! status: ${result.status}`);
      }

      const response = await result.json();
      console.log("Full response:", response);

      if (response.token) {
        localStorage.setItem("token", response.token);
        console.log("Token saved:", response.token);
        alert("Sign up successful");
        navigate("/home");
      } else {
        console.error("Token not found in response:", response);
        alert("Sign up failed: Token not found in response.");
      }
    } catch (error) {
      console.error("Error during sign up:", error);
      alert(`Error during sign up: ${error.message}`);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <div className="bg-cover bg-center absolute h-[100vh] w-full flex justify-center items-center">
      <img
        src={blueFly}
        alt="Blue cloud"
        className="absolute w-full h-full object-cover"
      />
      <div className="relative flex flex-col items-center justify-center text-white">
        <div className="absolute -top-8 right-5">
          <RxCrossCircled
            className="w-8 h-8 cursor-pointer"
            onClick={handleBack}
          />
        </div>
        <h1 className="text-[28px] font-bold mb-6 text-center">
          Sign Up to get started on Prymr
        </h1>
        <form
          className="bg-gray-800 bg-opacity-75 p-6 rounded-md"
          onSubmit={handleSignUp}
        >
          <label className="block mb-4">
            First Name:
            <input
              className="w-full p-2 mt-1 bg-gray-900 rounded-md"
              type="text"
              name="firstName"
              value={formData.firstName}
              placeholder="Enter First Name"
              maxLength={80}
              onChange={handleChange}
              required
            />
          </label>
          <label className="block mb-4">
            Last Name:
            <input
              className="w-full p-2 mt-1 bg-gray-900 rounded-md"
              type="text"
              name="lastName"
              value={formData.lastName}
              placeholder="Enter Last Name"
              onChange={handleChange}
              maxLength={100}
              required
            />
          </label>
          <label className="block mb-4">
            User Name:
            <input
              className="w-full p-2 mt-1 bg-gray-900 rounded-md"
              type="text"
              name="userName"
              value={formData.userName}
              placeholder="Enter User Name"
              onChange={handleChange}
              maxLength={80}
              required
            />
          </label>
          <label className="block mb-4">
            Email :
            <input
              className="w-full p-2 mt-1 bg-gray-900 rounded-md"
              type="text"
              name="email"
              value={formData.email}
              placeholder="Enter Email Id"
              onChange={handleChange}
              required
            />
          </label>
          <label className="block mb-4">
            Password :
            <input
              className="w-full p-2 mt-1 bg-gray-900 rounded-md"
              type="password"
              name="password"
              value={formData.password}
              placeholder="Enter Password"
              onChange={handleChange}
              required
            />
          </label>
          <div className="flex justify-center mt-6">
            <button
              className="text-white font-bold bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full"
              type="submit"
            >
              Register Now
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};
export default SignupPage;
