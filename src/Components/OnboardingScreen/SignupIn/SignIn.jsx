//  perfect working
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiCloseCircleFill } from "react-icons/ri";
import blueFly from "../../../assets/mainpageclouds.svg";
import { baseURL } from "../../../Constants/urls";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn = ({ mediaBtn }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Validate username/email
    if (!formData.username) {
      newErrors.username = "Username or email is required";
      isValid = false;
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const result = await fetch(`${baseURL}/auth/loginUser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await result.json();

        if (data.status === true) {
          localStorage.setItem("token", data.data.token);
          console.log(data.data.token);
          toast.success(data.message, { className: "center-toast" });
          navigate("/home");
        } else {
          const newErrors = {};
          if (data.message) {
            toast.error(data.message);
          }
          if (data.errors && Array.isArray(data.errors)) {
            data.errors.forEach((error) => {
              if (error.field && error.message) {
                newErrors[error.field] = error.message;
              }
            });
          }
          setErrors(newErrors);
        }
      } catch (error) {
        console.error("Error signing in:", error);
      }
    }
  };

  const handleForgetPassword = () => {
    alert("Directing to ForgetPassword");
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="bg-cover bg-center absolute h-[100vh] w-full flex flex-col  justify-center items-center text-white ">
      <img
        src={blueFly}
        alt="Blue cloud"
        className="absolute w-full h-full object-cover"
      />
      <div className="text-center relative">
        <div className="absolute cursor-pointer -top-8 -right-10">
          <RiCloseCircleFill
            className="w-8 h-8 cursor-pointer"
            onClick={handleBack}
          />
        </div>
        <h1 className="text-[28px] font-bold text-center">Sign In to Prymr</h1>
      </div>
      <div className="m-6 w-full relative md:w-[400px]">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 bg-opacity-75 p-6 rounded-md space-y-4  ml-[18px] mr-[18px]"
        >
          <label className="block mb-2 ">
            Email Address / Username
            <input
              className={`w-full h-12 pl-3 bg-gray-800 rounded-tl-md sm:text-xs text-md ${
                errors.username ? "border-red-500" : ""
              }`}
              type="text"
              name="username"
              value={formData.username}
              placeholder="Enter Email Address or Username"
              onChange={handleChange}
              required
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </label>
          <label className="block mb-2">
            Password
            <div className="relative">
              <input
                className={`w-full h-12 pl-3 bg-gray-800 rounded-tl-md ${
                  errors.password ? "border-red-500" : ""
                }`}
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                placeholder="Enter Password"
                onChange={handleChange}
                required
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <AiFillEyeInvisible className="text-gray-500" />
                ) : (
                  <AiFillEye className="text-gray-500" />
                )}
              </div>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </label>

          <Link to="/forgetpassword">
            <p
              className="text-lg text-black font-medium text-right mb-2"
              onClick={handleForgetPassword}
            >
              Forgot Password?
            </p>
          </Link>
          <div className="justify-center mt-6">
            <button
              className="text-white cursor-pointer font-bold bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full"
              type="submit"
            >
              Sign In
            </button>
            <div className="mt-3 text-center">
              <p>
                Don't have an account?{" "}
                <Link to="/signuppage" className="text-blue-500">
                  Sign Up
                </Link>
              </p>
            </div>
            <img
              src="/Images/Line.png"
              className="my-4 w-20 mx-auto"
              alt="Line"
            />
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
          className="toast-custom"
        />
      </div>
    </div>
  );
};

export default SignIn;

// // validated

// import { useState } from "react";
// import "./signup.css";
// import { Link, useNavigate } from "react-router-dom";
// import SocialMediaBtn from "./SocialMediaBtn";
// import { RxCrossCircled } from "react-icons/rx";
// import blueFly from "../../../assets/mainpageclouds.svg";
// import { baseURL } from "../../../Constants/urls";
// import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
// import { toast, ToastContainer } from "react-toastify";

// const SignIn = ({ mediaBtn }) => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [showPassword, setShowPassword] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     // Clear error when user starts typing
//     setErrors({ ...errors, [name]: "" });
//   };

//   const validateForm = () => {
//     let isValid = true;
//     const newErrors = {};

//     // Validate username/email
//     if (!formData.username) {
//       newErrors.username = "Username or email is required";
//       isValid = false;
//     } else if (
//       !isValidEmail(formData.username) &&
//       !isValidUsername(formData.username)
//     ) {
//       newErrors.username = "Enter a valid email or username";
//       isValid = false;
//     }

//     // Validate password
//     if (!formData.password) {
//       newErrors.password = "Password is required";
//       isValid = false;
//     } else if (formData.password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters long";
//       isValid = false;
//     }

//     setErrors(newErrors);
//     return isValid;
//   };

//   const isValidEmail = (email) => {
//     const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return re.test(email);
//   };

//   const isValidUsername = (username) => {
//     const re = /^[a-zA-Z0-9_]{3,20}$/;
//     return re.test(username);
//   };

//   // maaz vaal
//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   if (validateForm()) {
//   //     try {
//   //       const result = await fetch(`${baseURL}/auth/loginUser`, {
//   //         method: "POST",
//   //         headers: {
//   //           "Content-Type": "application/json",
//   //           Accept: "application/json",
//   //         },
//   //         body: JSON.stringify(formData),
//   //       });

//   //       const data = await result.json();

//   //       if (data.status) {
//   //         localStorage.setItem("user-info", JSON.stringify(data));
//   //         alert("Sign in successful");
//   //         navigate("/home");
//   //       } else {
//   //         alert("Sign in failed");
//   //       }
//   //     } catch (error) {
//   //       console.error("Error signing in:", error);
//   //     }
//   //   }
//   // };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   if (validateForm()) {
//   //     try {
//   //       const result = await fetch(`${baseURL}/auth/loginUser`, {
//   //         method: "POST",
//   //         headers: {
//   //           "Content-Type": "application/json",
//   //           Accept: "application/json",
//   //         },
//   //         body: JSON.stringify(formData),
//   //       });

//   //       const data = await result.json();

//   //       if (data.status) {
//   //         localStorage.setItem("user-info", JSON.stringify(data));
//   //         toast.success("Sign in successful", { className: "center-toast" });
//   //         navigate("/home");
//   //       } else {
//   //         const newErrors = {};
//   //         if (data.message) {
//   //           newErrors.general = data.message;
//   //         }
//   //         if (data.data && Array.isArray(data.data)) {
//   //           data.data.forEach((error) => {
//   //             if (error.property && error.message) {
//   //               newErrors[error.property] = error.message;
//   //             }
//   //           });
//   //         }
//   //         setErrors(newErrors);
//   //         toast.error("Sign in failed", { className: "center-toast" });
//   //       }
//   //     } catch (error) {
//   //       console.error("Error signing in:", error);
//   //     }
//   //   }
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       try {
//         const result = await fetch(`${baseURL}/auth/loginUser`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json",
//           },
//           body: JSON.stringify(formData),
//         });

//         const data = await result.json();

//         if (data.status === "success") {
//           // Assuming your backend returns a "success" status upon successful login
//           localStorage.setItem("user-info", JSON.stringify(data));
//           toast.success("Sign in successful", { className: "center-toast" });
//           navigate("/home"); // Navigate to next page upon successful login
//         } else {
//           const newErrors = {};
//           if (data.message) {
//             newErrors.general = data.message; // Display general error message from backend
//           }
//           if (data.errors && Array.isArray(data.errors)) {
//             data.errors.forEach((error) => {
//               if (error.field && error.message) {
//                 newErrors[error.field] = error.message; // Display specific field errors from backend
//               }
//             });
//           }
//           setErrors(newErrors); // Set errors based on backend response
//           toast.error("Sign in failed", { className: "center-toast" });
//         }
//       } catch (error) {
//         console.error("Error signing in:", error);
//       }
//     }
//   };

//   const handleForgetPassword = () => {
//     alert("Directing to ForgetPassword");
//   };

//   const handleBack = () => {
//     navigate("/");
//   };

//   return (
//     <div className="bg-cover bg-center absolute h-[100vh] w-full flex flex-col  justify-center items-center text-white ">
//       <img
//         src={blueFly}
//         alt="Blue cloud"
//         className="absolute w-full h-full object-cover"
//       />
//       <div className="text-center relative">
//         <div className="absolute -top-8 -right-10">
//           <RxCrossCircled
//             className="w-8 h-8 cursor-pointer"
//             onClick={handleBack}
//           />
//         </div>
//         <h1 className="text-[28px] font-bold text-center">Sign In to Prymr</h1>
//       </div>
//       <div className="m-6 w-full relative md:w-[400px]">
//         <form
//           onSubmit={handleSubmit}
//           className="bg-gray-800 bg-opacity-75 p-6 rounded-md space-y-4  ml-[18px] mr-[18px]"
//         >
//           <label className="block mb-2 ">
//             Email Address / Username
//             <input
//               className="w-full h-12 pl-3 bg-gray-800 rounded-tl-md sm:text-xs text-md"
//               type="text"
//               name="username"
//               value={formData.username}
//               placeholder="Enter Email Address or Username"
//               onChange={handleChange}
//               required
//             />
//             {errors.username && (
//               <p className="text-red-500 text-sm mt-1">{errors.username}</p>
//             )}
//           </label>
//           <label className="block mb-2">
//             Password
//             <div className="relative">
//               <input
//                 className="w-full h-12 pl-3 bg-gray-800 rounded-tl-md"
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={formData.password}
//                 placeholder="Enter Password"
//                 onChange={handleChange}
//                 required
//               />
//               <div
//                 className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? (
//                   <AiFillEyeInvisible className="text-gray-500" />
//                 ) : (
//                   <AiFillEye className="text-gray-500" />
//                 )}
//               </div>
//             </div>
//             {errors.password && (
//               <p className="text-red-500 text-sm mt-1">{errors.password}</p>
//             )}
//           </label>

//           <Link to="/forgetpassword">
//             <p
//               className="text-lg text-black font-medium text-right mb-2"
//               onClick={handleForgetPassword}
//             >
//               Forgot Password?
//             </p>
//           </Link>
//           <div className="justify-center mt-6">
//             <button
//               className="text-white font-bold bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full"
//               type="submit"
//             >
//               Sign In
//             </button>
//             <div className="mt-3 text-center">
//               <p>
//                 Don't have an account?{" "}
//                 <Link to="/signuppage" className="text-blue-500">
//                   Sign Up
//                 </Link>
//               </p>
//             </div>
//             <img
//               src="/Images/Line.png"
//               className="my-4 w-20 mx-auto"
//               alt="Line"
//             />
//           </div>
//         </form>
//         <ToastContainer
//           position="top-center"
//           autoClose={5000}
//           hideProgressBar
//           newestOnTop
//           closeOnClick
//           rtl={false}
//           pauseOnFocusLoss
//           draggable
//           pauseOnHover
//           className="toast-custom"
//         />
//       </div>
//     </div>
//   );
// };

// export default SignIn;
