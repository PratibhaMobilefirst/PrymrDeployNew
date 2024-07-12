// import { Link, useNavigate } from "react-router-dom";
// import "./signup.css";
// import { useState } from "react";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import ValidationButton from "./ValidationButton";

// import { RxCrossCircled } from "react-icons/rx";

// const SignupPage = () => {
//   const [password, setPassword] = useState("");
//   const [passwordValid, setPasswordValid] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

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

//   //-------------***********API INTEGRATION ********** -------------

//   const handleSignUp = async (e) => {
//     e.preventDefault();
//     const storedToken = localStorage.getItem("token");
//     if (!storedToken) {
//       alert("No token found. Please sign in again.");
//       console.log("token:53" + storedToken);
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
//           if (data.status) {
//             alert("Sign in successful");
//             navigate("/home");
//           } else {
//             alert("Sign in failed");
//           }
//         });
//     } catch (error) {
//       console.error("Error signing in:", error);
//     }
//   };
//   // console.log("Data :" + data.data.token);
//   const togglePasswordVisibility = () => {
//     setShowPassword((prev) => !prev);
//   };
//   return (
//     <div className="bg-black text-white p-3 h-[100vh]">
//       <div className="relative pt-5">
//         <RxCrossCircled className=" w-8 h-8 mx-[82%] top-[55.89px]  " />
//         <h1 className="text-left m-3 text-[28px] font-bold h-39.19 ">
//           Sign Up to get started on Prymr
//         </h1>
//       </div>
//       <div className="m-6">
//         <form onSubmit={handleSignUp}>
//           <label>
//             First Name
//             <input
//               className="w-[388px] mt-1 h-[50px] gap-0 pl-2 bg-gray-800 rounded-tl-md "
//               type="text"
//               name="firstName"
//               value={formData.firstName}
//               placeholder="Enter First Name"
//               maxLength={80}
//               onChange={handleChange}
//               required
//             />
//           </label>
//           <label>
//             Last Name
//             <input
//               className="w-[388px] h-[50px] gap-0 pl-2 bg-gray-800 rounded-tl-md "
//               type="text"
//               name="lastName"
//               value={formData.lastName}
//               placeholder="Enter Last Name"
//               onChange={handleChange}
//               maxLength="100"
//               required
//             />
//           </label>
//           <label>
//             User Name
//             <input
//               className="w-[388px] h-[50px] gap-0 pl-2 bg-gray-800 rounded-tl-md "
//               type="text"
//               name="userName"
//               value={formData.userName}
//               placeholder="Enter User Name"
//               onChange={handleChange}
//               maxLength="80"
//               required
//             />
//           </label>

//           <button
//             className="text-white mt-[30vh] font-bold bg-opacity-300 bg-blue-600 gap-2 w-[95%] h-[45px] rounded-full "
//             type="submit"
//           >
//             Register Now
//           </button>
//         </form>
//       </div>
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

  // const validateForm = () => {
  //   let isValid = true;
  //   const newErrors = {};

  //   // Validate First Name
  //   if (!formData.firstName.trim()) {
  //     newErrors.firstName = "First Name is required";
  //     isValid = false;
  //   }

  //   // Validate Last Name
  //   if (!formData.lastName.trim()) {
  //     newErrors.lastName = "Last Name is required";
  //     isValid = false;
  //   }

  //   // Validate User Name
  //   if (!formData.userName.trim()) {
  //     newErrors.userName = "User Name is required";
  //     isValid = false;
  //   }

  //   // Validate Email
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   if (!formData.email.trim()) {
  //     newErrors.email = "Email is required";
  //     isValid = false;
  //   } else if (!emailRegex.test(formData.email)) {
  //     newErrors.email = "Invalid email format";
  //     isValid = false;
  //   }

  //   // Validate Password
  //   if (!formData.password) {
  //     newErrors.password = "Password is required";
  //     isValid = false;
  //   } else if (formData.password.length < 6) {
  //     newErrors.password = "Password must be at least 6 characters long";
  //     isValid = false;
  //   }

  //   setErrors(newErrors);
  //   return isValid;
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (validateForm()) {
  //     handleSignUp(e);
  //   } else {
  //     toast.error("Please fill out all the fields correctly");
  //   }
  // };

  const handleBack = () => {
    navigate("/");
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
      const result = await fetch(`${baseURL}/auth/createUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${storedToken}`,
        },

        body: JSON.stringify(formData),
      })
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
            // onClick={handleBack}
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
