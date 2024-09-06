// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import bigAvatar from "../../../assets/bigAvatar.jpg";
// import deleteuserimg from "../../../assets/deleteuserimg.png";
// import backarrow from "../../../assets/backarrow.png";
// import BellNotification from "../../../assets/BellNotification.png";
// import logoutRedBtn from "../../../assets/logoutRedBtn.png";
// import Navbar from "../../common/Navbar";
// import smallAvatar from "../../../assets/smallAvatar.svg";
// import { baseURL } from "../../../Constants/urls";
// import { useToastManager } from "../../Context/ToastContext";

// const VisitorProfile = () => {
//   const toast = useToastManager();
//   const navigate = useNavigate();
//   const [isEditing, setIsEditing] = useState(false);
//   const [profileData, setProfileData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     userName: "",
//     profileDescription: "",
//     follower: 0,
//     following: 0,
//     board: 0,
//   });
//   const [editedData, setEditedData] = useState({});
//   const [showPopup, setShowPopup] = useState(false);

//   const profileImage = localStorage.getItem("profileImage");

//   useEffect(() => {
//     fetchProfileDetails();
//   }, []);

//   const fetchProfileDetails = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(`${baseURL}/auth/getProfileDetails`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (response.data.status) {
//         setProfileData(response.data.data);
//         setEditedData(response.data.data);
//       }
//     } catch (error) {
//       console.error("Error fetching profile details:", error);
//     }
//   };

//   const handleBack = () => {
//     navigate("/home");
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("userRole");
//     localStorage.removeItem("userEmail");
//     localStorage.removeItem("userName");
//     localStorage.removeItem("profileImage");
//     navigate("/");
//   };

//   const handleEdit = () => {
//     setIsEditing(true);
//   };

//   const handleSave = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.put(
//         `${baseURL}/auth/updateProfileDetails`,
//         editedData,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       if (response.data.status) {
//         setProfileData(editedData);
//         setIsEditing(false);
//       } else {
//         console.warn("Profile update failed:", response.data);
//       }
//     } catch (error) {
//       console.error("Error updating profile:", error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEditedData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleRemoveProfileIcon = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.post(
//         `${baseURL}/auth/removeProfileIcon`,
//         {},
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       if (response.data.status) {
//         localStorage.removeItem("profileImage");
//         setProfileData((prev) => ({ ...prev, profileImage: null }));
//         toast("Profile icon removed successfully.");
//         setShowPopup(false); // Hide popup after removal
//       } else {
//         toast("Failed to remove profile icon.");
//       }
//     } catch (error) {
//       console.error("Error removing profile icon:", error);
//       toast("An error occurred while removing the profile icon.");
//     }
//   };

//   const handleUploadProfileIcon = async (file) => {
//     try {
//       const token = localStorage.getItem("token");
//       const formData = new FormData();
//       formData.append("file", file);

//       // Upload the file
//       const uploadResponse = await axios.post(
//         `${baseURL}/file-upload/uploadFile`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       if (uploadResponse.data.status) {
//         // Get the uploaded image URL
//         const imageUrl = uploadResponse.data.data.url;
//         console.log(imageUrl);
//         // Update profile icon with the uploaded image URL
//         const response = await axios.post(
//           `${baseURL}/auth/uploadProfileIcon?image=${imageUrl}`,
//           {},
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         if (response.data.status) {
//           localStorage.setItem("profileImage", imageUrl);
//           setProfileData((prev) => ({ ...prev, profileImage: imageUrl }));

//           toast("Profile icon updated successfully.");
//           setShowPopup(false); // Hide popup after successful upload
//         } else {
//           toast("Failed to update profile icon.");
//         }
//       }
//     } catch (error) {
//       console.error("Error uploading profile icon:", error);
//       toast("An error occurred while uploading the profile icon.");
//     }
//   };

//   const handleIconClick = () => {
//     setShowPopup(!showPopup); // Toggle popup visibility
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       handleUploadProfileIcon(file);
//     }
//   };

//   return (
//     <div className="h-screen lg:w-[30%] bg-black text-white">
//       <header className="flex bg-[#191919] items-center justify-between p-4">
//         <div className="flex items-center space-x-2">
//           <img
//             src={backarrow}
//             alt="Back Arrow"
//             className="w-4 h-4 cursor-pointer"
//             onClick={handleBack}
//           />
//           <div className="relative">
//             <img
//               src={profileImage || smallAvatar}
//               alt="User"
//               className="w-8 h-8 rounded-full cursor-pointer"
//               onClick={handleIconClick} // Show popup on icon click
//             />
//           </div>
//           <div className="text-sm">
//             {isEditing ? (
//               <>
//                 <input
//                   type="text"
//                   name="firstName"
//                   value={editedData.firstName}
//                   onChange={handleChange}
//                   className="bg-gray-800 text-white p-1 rounded"
//                 />
//                 <input
//                   type="text"
//                   name="lastName"
//                   value={editedData.lastName}
//                   onChange={handleChange}
//                   className="bg-gray-800 text-white p-1 rounded mt-1"
//                 />
//               </>
//             ) : (
//               <>
//                 <div>{`${profileData.firstName} ${profileData.lastName}`}</div>
//                 <div>{profileData.email}</div>
//               </>
//             )}
//           </div>
//         </div>
//         <div>
//           <button
//             className="text-blue-500 ml-auto mr-5 cursor-pointer"
//             onClick={isEditing ? handleSave : handleEdit}
//           >
//             {isEditing ? "Save" : "Edit"}
//           </button>
//         </div>
//       </header>

//       <nav className="p-4 mb-[5vh]">
//         <ul className="space-y-4">
//           <li className="flex items-center justify-between">
//             <span className="flex gap-4">
//               <img src={BellNotification} alt="Notification" />
//               Notifications
//             </span>
//             <span className="bg-yellow-500 text-black rounded-full px-2 py-1">
//               127
//             </span>
//           </li>
//           <li>Followers: {profileData.follower}</li>
//           <li>Following: {profileData.following}</li>
//           <li>Boards: {profileData.board}</li>
//         </ul>
//       </nav>
//       {showPopup && (
//         <div className="absolute m-5 ml-[5vw] bg-gray-800 p-2 rounded shadow-lg">
//           <button
//             className="text-white bg-blue-500 px-2 py-1 rounded mb-2"
//             onClick={() => document.getElementById("fileInput").click()}
//           >
//             Change Profile
//           </button>
//           <input
//             type="file"
//             id="fileInput"
//             className="hidden"
//             onChange={handleFileChange}
//           />
//           <button
//             className="text-white bg-red-500 px-2 py-1 rounded"
//             onClick={handleRemoveProfileIcon}
//           >
//             Remove Profile
//           </button>
//         </div>
//       )}
//       <footer className="p-4 fixed bottom-12 w-full">
//         <button
//           className="text-[#FF0404] text-2xl cursor-pointer flex gap-3"
//           onClick={handleLogout}
//         >
//           <img src={logoutRedBtn} className="h-6 w-6 mt-1" alt="Logout" />
//           Log Out
//         </button>
//       </footer>
//       <Navbar />
//     </div>
//   );
// };

// export default VisitorProfile;

// // const VisitorProfile = () => {
// //   const navigate = useNavigate();
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [profileData, setProfileData] = useState({
// //     firstName: "",
// //     lastName: "",
// //     email: "",
// //     userName: "",
// //     profileDescription: "",
// //     follower: 0,
// //     following: 0,
// //     board: 0,
// //   });
// //   const [editedData, setEditedData] = useState({});
// //   const [showPopup, setShowPopup] = useState(false);

// //   const profileImage = localStorage.getItem("profileImage");

// //   useEffect(() => {
// //     fetchProfileDetails();
// //   }, []);

// //   const fetchProfileDetails = async () => {
// //     try {
// //       const token = localStorage.getItem("token");
// //       const response = await axios.get(`${baseURL}/auth/getProfileDetails`, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       if (response.data.status) {
// //         setProfileData(response.data.data);
// //         setEditedData(response.data.data);
// //       }
// //     } catch (error) {
// //       console.error("Error fetching profile details:", error);
// //     }
// //   };

// //   const handleBack = () => {
// //     navigate("/home");
// //   };

// //   const handleLogout = () => {
// //     localStorage.removeItem("token");
// //     localStorage.removeItem("userRole");
// //     localStorage.removeItem("userEmail");
// //     localStorage.removeItem("userName");
// //     localStorage.removeItem("profileImage");
// //     navigate("/");
// //   };

// //   const handleEdit = () => {
// //     setIsEditing(true);
// //   };

// //   const handleSave = async () => {
// //     try {
// //       const token = localStorage.getItem("token");
// //       const response = await axios.put(
// //         `${baseURL}/auth/updateProfileDetails`,
// //         editedData,
// //         {
// //           headers: { Authorization: `Bearer ${token}` },
// //         }
// //       );

// //       if (response.data.status) {
// //         setProfileData(editedData);
// //         setIsEditing(false);
// //       } else {
// //         console.warn("Profile update failed:", response.data);
// //       }
// //     } catch (error) {
// //       console.error("Error updating profile:", error);
// //     }
// //   };

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setEditedData((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleRemoveProfileIcon = async () => {
// //     try {
// //       const token = localStorage.getItem("token");
// //       const response = await axios.post(
// //         `${baseURL}/auth/removeProfileIcon`,
// //         {},
// //         {
// //           headers: { Authorization: `Bearer ${token}` },
// //         }
// //       );

// //       if (response.data.status) {
// //         localStorage.removeItem("profileImage");
// //         setProfileData((prev) => ({ ...prev, profileImage: null }));
// //         toast("Profile icon removed successfully.");
// //         setShowPopup(false);
// //       } else {
// //         toast("Failed to remove profile icon.");
// //       }
// //     } catch (error) {
// //       console.error("Error removing profile icon:", error);
// //       toast("An error occurred while removing the profile icon.");
// //     }
// //   };

// //   const handleUploadProfileIcon = async (file) => {
// //     try {
// //       const token = localStorage.getItem("token");
// //       const formData = new FormData();
// //       formData.append("file", file);

// //       // Upload the file
// //       const uploadResponse = await axios.post(
// //         `${baseURL}/file-upload/uploadFile`,
// //         formData,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //             "Content-Type": "multipart/form-data",
// //           },
// //         }
// //       );

// //       if (uploadResponse.data.status) {
// //         // Get the uploaded image URL
// //         const imageUrl = uploadResponse.data.data.image;

// //         // Update profile icon with the uploaded image URL
// //         const response = await axios.post(
// //           `${baseURL}/auth/uploadProfileIcon?image=${imageUrl}`,
// //           {},
// //           {
// //             headers: { Authorization: `Bearer ${token}` },
// //           }
// //         );

// //         if (response.data.status) {
// //           localStorage.setItem("profileImage", imageUrl);
// //           setProfileData((prev) => ({ ...prev, profileImage: imageUrl }));
// //           toast("Profile icon updated successfully.");
// //           setShowPopup(false);
// //         } else {
// //           toast("Failed to update profile icon.");
// //         }
// //       }
// //     } catch (error) {
// //       console.error("Error uploading profile icon:", error);
// //       toast("An error occurred while uploading the profile icon.");
// //     }
// //   };

// //   const handleIconClick = () => {
// //     setShowPopup(true);
// //   };

// //   const handleFileChange = (e) => {
// //     const file = e.target.files[0];
// //     if (file) {
// //       handleUploadProfileIcon(file);
// //     }
// //   };

// //   return (
// //     <div className="h-screen lg:w-[30%] bg-black text-white">
// //       <header className="flex bg-[#191919] items-center justify-between p-4">
// //         <div className="flex items-center space-x-2">
// //           <img
// //             src={backarrow}
// //             alt="Back Arrow"
// //             className="w-4 h-4 cursor-pointer"
// //             onClick={handleBack}
// //           />
// //           {profileImage ? (
// //             <div className="relative" onClick={handleIconClick}>
// //               <img
// //                 src={profileImage || smallAvatar}
// //                 alt="User"
// //                 className="w-8 h-8 rounded-full cursor-pointer"
// //               />
// //               {showPopup && (
// //                 <div className="absolute top-10 right-0 bg-gray-800 p-2 rounded shadow-lg">
// //                   <button
// //                     className="text-white bg-blue-500 px-2 py-1 rounded mb-2"
// //                     onClick={() => document.getElementById("fileInput").click()}
// //                   >
// //                     Change Profile
// //                   </button>
// //                   <input
// //                     type="file"
// //                     id="fileInput"
// //                     className="hidden"
// //                     onChange={handleFileChange}
// //                   />
// //                   <button
// //                     className="text-white bg-red-500 px-2 py-1 rounded"
// //                     onClick={handleRemoveProfileIcon}
// //                   >
// //                     Remove Profile
// //                   </button>
// //                 </div>
// //               )}
// //             </div>
// //           ) : (
// //             <img
// //               src={smallAvatar}
// //               alt="User"
// //               className="w-8 h-8 rounded-full"
// //             />
// //           )}
// //           <div className="text-sm">
// //             {isEditing ? (
// //               <>
// //                 <input
// //                   type="text"
// //                   name="firstName"
// //                   value={editedData.firstName}
// //                   onChange={handleChange}
// //                   className="bg-gray-800 text-white p-1 rounded"
// //                 />
// //                 <input
// //                   type="text"
// //                   name="lastName"
// //                   value={editedData.lastName}
// //                   onChange={handleChange}
// //                   className="bg-gray-800 text-white p-1 rounded mt-1"
// //                 />
// //               </>
// //             ) : (
// //               <>
// //                 <div>{`${profileData.firstName} ${profileData.lastName}`}</div>
// //                 <div>{profileData.email}</div>
// //               </>
// //             )}
// //           </div>
// //         </div>
// //         <div>
// //           <button
// //             className="text-blue-500 ml-auto mr-5 cursor-pointer"
// //             onClick={isEditing ? handleSave : handleEdit}
// //           >
// //             {isEditing ? "Save" : "Edit"}
// //           </button>
// //         </div>
// //       </header>

// //       <nav className="p-4">
// //         <ul className="space-y-4">
// //           <li className="flex items-center justify-between">
// //             <span className="flex gap-4">
// //               <img src={BellNotification} alt="Notification" />
// //               Notifications
// //             </span>
// //             <span className="bg-yellow-500 text-black rounded-full px-2 py-1">
// //               127
// //             </span>
// //           </li>
// //           <li>Followers: {profileData.follower}</li>
// //           <li>Following: {profileData.following}</li>
// //           <li>Boards: {profileData.board}</li>
// //         </ul>
// //       </nav>

// //       <footer className="p-4 fixed bottom-12 w-full">
// //         <button
// //           className="text-[#FF0404] text-2xl cursor-pointer flex gap-3"
// //           onClick={handleLogout}
// //         >
// //           <img src={logoutRedBtn} className="h-6 w-6 mt-1" alt="Logout" />
// //           Log Out
// //         </button>
// //       </footer>
// //       <Navbar />
// //     </div>
// //   );
// // };

// // export default VisitorProfile;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bigAvatar from "../../../assets/bigAvatar.jpg";
import deleteuserimg from "../../../assets/deleteuserimg.png";
import backarrow from "../../../assets/backarrow.png";
import BellNotification from "../../../assets/BellNotification.png";
import logoutRedBtn from "../../../assets/logoutRedBtn.png";
import Navbar from "../../common/Navbar";
import smallAvatar from "../../../assets/smallAvatar.svg";
import { baseURL } from "../../../Constants/urls";
import { useToastManager } from "../../Context/ToastContext";

const VisitorProfile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    profileDescription: "",
    follower: 0,
    following: 0,
    board: 0,
  });
  const [editedData, setEditedData] = useState({});
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility

  const profileImage = localStorage.getItem("profileIcon");
  const initialIconUrl = localStorage.getItem("initialIconUrl");

  useEffect(() => {
    fetchProfileDetails();
  }, []);

  const fetchProfileDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${baseURL}/auth/getProfileDetails`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.status) {
        setProfileData(response.data.data);
        setEditedData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching profile details:", error);
    }
  };

  const handleBack = () => {
    navigate("/home");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    localStorage.removeItem("profileImage");
    navigate("/");
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${baseURL}/auth/updateProfileDetails`,
        editedData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.status) {
        setProfileData(editedData);
        setIsEditing(false);
      } else {
        console.warn("Profile update failed:", response.data);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRemoveProfileIcon = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${baseURL}/auth/removeProfileIcon`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.status) {
        localStorage.removeItem("profileImage");
        setProfileData((prev) => ({ ...prev, profileImage: null }));
        alert("Profile icon removed successfully.");
        setShowPopup(false); // Hide popup after removal
      } else {
        alert("Failed to remove profile icon.");
      }
    } catch (error) {
      console.error("Error removing profile icon:", error);
      alert("An error occurred while removing the profile icon.");
    }
  };

  const handleUploadProfileIcon = async (file) => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("file", file);

      // Upload the file
      const uploadResponse = await axios.post(
        `${baseURL}/file-upload/uploadFile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (uploadResponse.data.status) {
        // Get the uploaded image URL
        const imageUrl = uploadResponse.data.data.url;

        // Update profile icon with the uploaded image URL
        const response = await axios.post(
          `${baseURL}/auth/uploadProfileIcon?image=${imageUrl}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data.status) {
          localStorage.setItem("profileImage", imageUrl);
          setProfileData((prev) => ({ ...prev, profileImage: imageUrl }));
          alert("Profile icon updated successfully.");
          setShowPopup(false); // Hide popup after successful upload
        } else {
          alert("Failed to update profile icon.");
        }
      }
    } catch (error) {
      console.error("Error uploading profile icon:", error);
      alert("An error occurred while uploading the profile icon.");
    }
  };

  const handleIconClick = () => {
    setShowPopup(!showPopup); // Toggle popup visibility
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleUploadProfileIcon(file);
    }
  };

  return (
    <div className="h-screen lg:w-[30%] bg-black text-white">
      <header
        className={`flex bg-[#191919] items-center justify-between p-4 ${
          showPopup ? "" : ""
        }`}
      >
        <div className="flex items-center space-x-2">
          <img
            src={backarrow}
            alt="Back Arrow"
            className="w-4 h-4 cursor-pointer"
            onClick={handleBack}
          />
          <div className="relative">
            <img
              src={profileImage || smallAvatar}
              alt="User"
              className="w-8 h-8 rounded-full cursor-pointer"
              onClick={handleIconClick} // Show popup on icon click
            />
          </div>
          <div className="text-sm">
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="firstName"
                  value={editedData.firstName}
                  onChange={handleChange}
                  className="bg-gray-800 text-white p-1 rounded"
                />
                <input
                  type="text"
                  name="lastName"
                  value={editedData.lastName}
                  onChange={handleChange}
                  className="bg-gray-800 text-white p-1 rounded mt-1"
                />
              </>
            ) : (
              <>
                <div>{`${profileData.firstName} ${profileData.lastName}`}</div>
                <div>{profileData.email}</div>
              </>
            )}
          </div>
        </div>
        <div>
          <button
            className="text-blue-500 ml-auto mr-5 cursor-pointer"
            onClick={isEditing ? handleSave : handleEdit}
          >
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>
      </header>

      {showPopup && (
        <div className="absolute m-5 ml-[5vw] bg-gray-800 p-2 rounded shadow-lg z-10">
          <button
            className="text-white bg-blue-500 px-2 py-1 rounded mb-2"
            onClick={() => document.getElementById("fileInput").click()}
          >
            Change Profile
          </button>
          <input
            type="file"
            id="fileInput"
            className="hidden"
            accept="image/*" // Accept all image formats, including GIFs
            onChange={handleFileChange}
          />
          <button
            className="text-white bg-red-500 px-2 py-1 rounded"
            onClick={handleRemoveProfileIcon}
          >
            Remove Profile
          </button>
        </div>
      )}

      <nav
        className={`p-4 ${
          showPopup
            ? "mt-8 transition-transform duration-300 ease-in-out transform translate-y-16"
            : ""
        }`}
      >
        <ul className="space-y-4">
          <li className="flex items-center justify-between">
            <span className="flex gap-4">
              <img src={BellNotification} alt="Notification" />
              Notifications
            </span>
            <span className="bg-yellow-500 text-black rounded-full px-2 py-1">
              127
            </span>
          </li>
          <li>Followers: {profileData.follower}</li>
          <li>Following: {profileData.following}</li>
          <li>Boards: {profileData.board}</li>
        </ul>
      </nav>

      <footer className="p-4 fixed bottom-12 w-full">
        <button
          className="text-[#FF0404] text-2xl cursor-pointer flex gap-3"
          onClick={handleLogout}
        >
          <img src={logoutRedBtn} className="h-6 w-6 mt-1" alt="Logout" />
          Log Out
        </button>
      </footer>
      <Navbar />
    </div>
  );
};

export default VisitorProfile;
