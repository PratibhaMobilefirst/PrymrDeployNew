import React, { useState } from "react";
import handleBack from "../../assets/handleBack.svg";
import mailchimp from "../../assets/mailchimp.png";
import instagram from "../../assets/instagram.svg";
import message from "../../assets/message.png";
import twitter from "../../assets/Twitter.png";
import editToolNavbar from "../../assets/settings.png";
import { baseURL } from "../../Constants/urls";

function Contact() {
  const [contactSubmitted, setContactSubmitted] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${baseURL}/auth/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.status) {
        alert(result.message);
        setContactSubmitted(result.message);
        console.log(result);
      } else {
        alert("Failed to send message.");
        setContactSubmitted("Failed to send message.");
      }
    } catch (error) {
      console.error("Error sending message", error);
      alert("Error sending message.");
      setContactSubmitted("Error sending message.");
    }
  };

  return (
    <>
      <div className=" flex justify-between gap-5 pt-14 ">
        <div className="bg-[#1E1E1E] w-full h-[70vh] ml-10 md:block lg:block hidden ">
          <div>
            <img src={editToolNavbar} className="ml-auto m-1" />
          </div>
          <div className="p-3">I’d love to hear from you</div>
          <div className="p-3">
            The canvas stretched before the artist, blank yet pregnant with
            possibilities. With each stroke of the brush, colors danced in
            harmony or clashed in discord, reflecting the artist's emotions and
            visions. Layers of paint intertwined, revealing depths of meaning
            that words could not convey.
          </div>
          <div className="ml-4 py-[10vh] mt-10">
            <div className="flex items-center m-2 space-x-2">
              <img src={instagram} />
              <span className="text-md">@creatorart</span>
            </div>
            <div className="flex items-center m-2  space-x-2">
              <img src={twitter} />
              <span className="text-md">@creatorartist</span>
            </div>
            <div className="m-2  ">
              <button className="w-auto flex  gap-3 p-2 bg-black rounded text-white">
                <img className="w-5 h-5" src={mailchimp} />
                Join Mailing list
              </button>
            </div>
          </div>
        </div>
        <div className="w-full bg-[#1E1E1E] h-screen lg:h-[70vh] lg:mr-10">
          <div>
            <img src={editToolNavbar} className="ml-auto m-1" />
          </div>
          <div className="flex gap-2 ml-3">
            <img src={message} /> erik@erikjonesart.com
          </div>
          <form className="space-y-3 mt-6 w-full p-5" onSubmit={handleSubmit}>
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              value={formData.firstName}
              onChange={handleChange}
              className="p-2 bg-[#2A2A2A] border-2 h-[5vh] text-xs w-full rounded italic"
            />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              className="p-2 bg-[#2A2A2A] border-2 h-[5vh] text-xs w-full rounded italic"
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject Matter"
              value={formData.subject}
              onChange={handleChange}
              className="p-2 bg-[#2A2A2A] border-2 h-[5vh] text-xs w-full rounded italic"
            />
            <textarea
              name="message"
              placeholder="Write Your Message Here"
              value={formData.message}
              onChange={handleChange}
              className="p-2 bg-[#2A2A2A] border-2 mb-3 text-sm w-full h-[20vh] rounded italic"
            />
            <button
              type="submit"
              className="bg-[#696969] py-2 w-full rounded-full"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Contact;
