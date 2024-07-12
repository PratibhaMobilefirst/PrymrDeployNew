// import { useState } from "react";
// import "./signup.css";
// import { Link, useNavigate } from "react-router-dom";
// import SocialMediaBtn from "./SocialMediaBtn";
// import { RxCrossCircled } from "react-icons/rx";
// import blueFly from "../../../assets/mainpageclouds.svg";

// const SignIn = ({ mediaBtn }) => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//   });
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };
//   console.log(formData);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // const formData = { username: username, password: password };
//     try {
//       const result = await fetch(
//         "https://prymr-dev-backend.vercel.app/api/auth/completeProfile",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json",
//             Authorization: `Bearer ${token}`,
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
//             localStorage.setItem("user-info", JSON.stringify(data));
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
//   const handleForgetPassword = () => {
//     alert("Directing to ForgetPassword");
//   };
//   const handleBack = () => {
//     navigate("/");
//   };
//   return (
//     <div className="text-white  bg-cover bg-center absolute h-[100vh] w-full  flex flex-col justify-center items-center sm:ml-2 sm:mr-2">
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
//         {/* <img
//           className="p-4 w-[60vw] h- md:w-40 mx-auto"
//           src="/Images/or.png"
//           alt="Or"
//         />*/}
//       </div>
//       <div className="m-6 w-full relative md:w-[400px]">
//         <form
//           onSubmit={handleSubmit}
//           className="bg-gray-800 bg-opacity-75 p-6 rounded-md space-y-4"
//         >
//           <label className="block mb-2">
//             Email Address / Username
//             <input
//               className="w-full h-12 pl-3 bg-gray-800 rounded-tl-md"
//               type="email"
//               name="username"
//               value={formData.username}
//               placeholder="Enter Email Address"
//               onChange={handleChange}
//               required
//             />
//           </label>
//           <label className="block mb-2">
//             Password
//             <input
//               className="w-full h-12 pl-3 bg-gray-800 rounded-tl-md"
//               type="password"
//               name="password"
//               value={formData.password}
//               placeholder="Enter Password"
//               onChange={handleChange}
//               required
//             />
//           </label>
//           <Link to="/forgetpassword">
//             <p
//               className="text-lg  text-black font-medium text-right mb-2"
//               onClick={handleForgetPassword}
//             >
//               Forgot Password?
//             </p>
//           </Link>
//           {/* <div className="text-center relative w-full"> */}
//           <div className=" justify-center mt-6">
//             <button
//               className="text-white font-bold bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full"
//               type="submit"
//               onClick={handleSubmit}
//             >
//               Sign In
//             </button>
//             <div className="mt-3 text-center">
//               <p>
//                 Don’t have an account?{" "}
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
//       </div>
//     </div>
//   );
// };
// export default SignIn;


import { useState } from "react";
import "./signup.css";
import { Link, useNavigate } from "react-router-dom";
import SocialMediaBtn from "./SocialMediaBtn";
import { RxCrossCircled } from "react-icons/rx";
import blueFly from "../../../assets/mainpageclouds.svg";
import { baseURL } from "../../../Constants/urls";

const SignIn = ({ mediaBtn }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const formData = { username: username, password: password };
    console.log("try");
    try {
      const result = await fetch(`${baseURL}/auth/loginUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
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
            localStorage.setItem("user-info", JSON.stringify(data));
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
  const handleForgetPassword = () => {
    alert("Directing to ForgetPassword");
  };
  const handleBack = () => {
    navigate("/");
  };
  return (
    <div className="text-white  bg-cover bg-center absolute h-[100vh] w-full  flex flex-col justify-center items-center sm:ml-2 sm:mr-2">
      <img
        src={blueFly}
        alt="Blue cloud"
        className="absolute w-full h-full object-cover"
      />
      <div className="text-center relative">
        <div className="absolute -top-8 -right-10">
          <RxCrossCircled
            className="w-8 h-8 cursor-pointer"
            onClick={handleBack}
          />
        </div>
        <h1 className="text-[28px] font-bold text-center">Sign In to Prymr</h1>
      </div>
      <div className="m-6 w-full relative md:w-[400px]">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 bg-opacity-75 p-6 rounded-md space-y-4"
        >
          <label className="block mb-2">
            Email Address / Username
            <input
              className="w-full h-12 pl-3 bg-gray-800 rounded-tl-md"
              type="email"
              name="username"
              value={formData.username}
              placeholder="Enter Email Address"
              onChange={handleChange}
              required
            />
          </label>
          <label className="block mb-2">
            Password
            <input
              className="w-full h-12 pl-3 bg-gray-800 rounded-tl-md"
              type="password"
              name="password"
              value={formData.password}
              placeholder="Enter Password"
              onChange={handleChange}
              required
            />
          </label>
          <Link to="/forgetpassword">
            <p
              className="text-lg  text-black font-medium text-right mb-2"
              onClick={handleForgetPassword}
            >
              Forgot Password?
            </p>
          </Link>
          {/* {/ <div className="text-center relative w-full"> /} */}
          <div className=" justify-center mt-6">
            <button
              className="text-white font-bold bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full"
              type="submit"
              onClick={handleSubmit}
            >
              Sign In
            </button>
            <div className="mt-3 text-center">
              <p>
                Don’t have an account?{" "}
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
      </div>
    </div>
  );
};
export default SignIn;

// validated

// import { useState } from "react";
// import "./signup.css";
// import { Link, useNavigate } from "react-router-dom";
// import SocialMediaBtn from "./SocialMediaBtn";
// import { RxCrossCircled } from "react-icons/rx";
// import blueFly from "../../../assets/mainpageclouds.svg";
// import { baseURL } from "../../../Constants/urls";

// const SignIn = ({ mediaBtn }) => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//   });
//   const [errors, setErrors] = useState({});

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

//         if (data.status) {
//           localStorage.setItem("user-info", JSON.stringify(data));
//           alert("Sign in successful");
//           navigate("/home");
//         } else {
//           alert("Sign in failed");
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
//     <div className="text-white bg-cover bg-center absolute h-[100vh] w-full flex flex-col justify-center items-center sm:ml-2 sm:mr-2">
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
//           className="bg-gray-800 bg-opacity-75 p-6 rounded-md space-y-4"
//         >
//           <label className="block mb-2">
//             Email Address / Username
//             <input
//               className="w-full h-12 pl-3 bg-gray-800 rounded-tl-md"
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
//             <input
//               className="w-full h-12 pl-3 bg-gray-800 rounded-tl-md"
//               type="password"
//               name="password"
//               value={formData.password}
//               placeholder="Enter Password"
//               onChange={handleChange}
//               required
//             />
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
//       </div>
//     </div>
//   );
// };

// export default SignIn;
