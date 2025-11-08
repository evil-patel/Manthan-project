import axios from "axios";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../../Config";
import { changeprofilepic } from "../../slices/Userslice";

export default function Profileimage() {
    const imageref = useRef();
    const email = useSelector((store) => store.user.userdata.email);
    const imgurl = useSelector((store) => store.user.userdata.profilepic);
    const [message, setmessage] = useState("");
    const iref = useRef();
    const dispatch = useDispatch();

    const fun1 = async () => {
        let data = { email: email, userimg: imageref.current.files[0] };

        await axios
            .post(API_URL + "/user/setimage", data, { headers: { "Content-Type": "multipart/form-data" } })
            .then((d) => {
                setmessage("Image Saved");
                dispatch(changeprofilepic(d.data.data.profilepic));
                iref.current.src = API_URL + "" + d.data.data.profilepic;
            })
            .catch((err) => {
                console.log(err);
                setmessage("Something went wrong");
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-lvh bg-cyan-900/30 backdrop-blur-xl border border-cyan-400/40 rounded-3xl shadow-2xl p-8 flex flex-col items-center">
                <h2 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent mb-6">
                    Profile Image
                </h2>

                {/* Image Preview */}
                <div className="w-32 h-32 mb-6 rounded-full overflow-hidden shadow-xl border-4 border-cyan-400">
                    <img
                        ref={iref}
                        src={API_URL + imgurl}
                        alt="Profile"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* File Input */}
                <input
                    type="file"
                    ref={imageref}
                    className="w-full mb-5 border border-cyan-400/50 rounded-2xl px-4 py-3 text-gray-100 bg-cyan-800/40 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-600 file:text-white hover:file:bg-cyan-700 transition"
                />

                {/* Update Button */}
                <button
                    onClick={fun1}
                    className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-teal-400 hover:to-cyan-400 text-white font-bold py-3 px-6 rounded-2xl shadow-lg transition duration-300"
                >
                    Update
                </button>

                {/* Message */}
                {message && (
                    <div className="text-center mt-4 text-cyan-200 font-semibold">
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
}
