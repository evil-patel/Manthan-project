import axios from "axios";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginuserMain } from "../../slices/Userslice";
import { API_URL } from "../../Config";

export default function Profile() {
  const email = useSelector((store) => store.user.userdata.email);
  const username = useSelector((store) => store.user.userdata.name);
  const usereducation = useSelector((store) => store.user.userdata.education);
  const userfacebook = useSelector((store) => store.user.userdata.facebook);
  const userinstagram = useSelector((store) => store.user.userdata.instagram);
  const usertwitter = useSelector((store) => store.user.userdata.twitter);
  const useryoutube = useSelector((store) => store.user.userdata.youtube);
  const userwebsite = useSelector((store) => store.user.userdata.website);

  const nameref = useRef();
  const educationref = useRef();
  const facebookRef = useRef();
  const instagramRef = useRef();
  const twitterRef = useRef();
  const youtubeRef = useRef();
  const websiteRef = useRef();

  const [message, setmessage] = useState();
  const [enable, setenable] = useState(false);
  let dispatch = useDispatch();

  const fun1 = async () => {
    let data = {
      name: nameref.current.value,
      education: educationref.current.value,
      email: email,
      facebook: facebookRef.current.value,
      instagram: instagramRef.current.value,
      twitter: twitterRef.current.value,
      youtube: youtubeRef.current.value,
      website: websiteRef.current.value,
    };

    await axios
      .post(API_URL + "/user/setprofile", data)
      .then((d) => {
        setmessage("Saved");
        dispatch(loginuserMain(d.data.data));
        setenable(false);
      })
      .catch((err) => {
        console.log(err);
        setmessage("Something went wrong");
      });
  };

  const handleCancel = () => {
    setenable(false);
    setmessage("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl bg-gray-900/60 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-cyan-400 mb-6">
          Profile
        </h2>

        <div className="grid grid-cols-1 gap-5">
          {/* Name */}
          <div>
            <label className="block font-medium text-cyan-300 mb-1">👤 Name</label>
            <input
              type="text"
              ref={nameref}
              placeholder="Enter your name"
              defaultValue={username}
              disabled={!enable}
              className={`w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-cyan-500/20 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition duration-200 ${
                !enable ? "opacity-60 cursor-not-allowed" : ""
              }`}
            />
          </div>

          {/* Education */}
          <div>
            <label className="block font-medium text-cyan-300 mb-1">🎓 Education</label>
            <input
              type="text"
              ref={educationref}
              placeholder="Your education"
              defaultValue={usereducation}
              disabled={!enable}
              className={`w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-cyan-500/20 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition duration-200 ${
                !enable ? "opacity-60 cursor-not-allowed" : ""
              }`}
            />
          </div>

          {/* Social Links */}
          {[
            { label: "📘 Facebook", ref: facebookRef, value: userfacebook, placeholder: "https://facebook.com/yourprofile" },
            { label: "📸 Instagram", ref: instagramRef, value: userinstagram, placeholder: "https://instagram.com/yourprofile" },
            { label: "🐦 Twitter", ref: twitterRef, value: usertwitter, placeholder: "https://twitter.com/yourprofile" },
            { label: "📺 YouTube", ref: youtubeRef, value: useryoutube, placeholder: "https://youtube.com/yourchannel" },
            { label: "🌐 Website", ref: websiteRef, value: userwebsite, placeholder: "https://yourwebsite.com" },
          ].map((item, idx) => (
            <div key={idx}>
              <label className="block font-medium text-cyan-300 mb-1">{item.label}</label>
              <input
                type="text"
                ref={item.ref}
                placeholder={item.placeholder}
                defaultValue={item.value}
                disabled={!enable}
                className={`w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-cyan-500/20 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition duration-200 ${
                  !enable ? "opacity-60 cursor-not-allowed" : ""
                }`}
              />
            </div>
          ))}

          {/* Buttons */}
          {!enable ? (
            <button
              onClick={() => setenable(true)}
              className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 rounded-lg mt-2 w-full transition duration-300"
            >
              Edit
            </button>
          ) : (
            <div className="flex gap-4 mt-2">
              <button
                onClick={fun1}
                className="bg-green-600 hover:bg-green-700 w-1/2 text-white font-semibold py-2 rounded-lg transition duration-300"
              >
                Update
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-600 hover:bg-gray-700 w-1/2 text-white font-semibold py-2 rounded-lg transition duration-300"
              >
                Cancel
              </button>
            </div>
          )}

          {message && (
            <div className="text-center text-cyan-400 font-semibold mt-2">
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
