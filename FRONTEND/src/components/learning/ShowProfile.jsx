import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaGlobe } from "react-icons/fa";
import { useSelector } from "react-redux";
import { API_URL } from "../../Config";

export default function ShowProfile() {
    const email = useSelector((store) => store.user.userdata.email);
    const username = useSelector((store) => store.user.userdata.name);
    const usereducation = useSelector((store) => store.user.userdata.education);
    const userfacebook = useSelector((store) => store.user.userdata.facebook);
    const userinstagram = useSelector((store) => store.user.userdata.instagram);
    const usertwitter = useSelector((store) => store.user.userdata.twitter);
    const useryoutube = useSelector((store) => store.user.userdata.youtube);
    const userwebsite = useSelector((store) => store.user.userdata.website);
    const profileImage = useSelector((store) => store.user.userdata.profilepic);

    const about =
        `Hello! I’m ${username || "John Doe"}, a passionate software developer who loves building web applications. I specialize in React, Node.js, and MongoDB. In my free time, I enjoy creating open-source projects and exploring new technologies.`;

    const skills = ["React", "Node.js", "MongoDB", "Open Source", "Web Development"];

    return (
        <div className="min-h-screen relative bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1612832020780-1b6c1f8e0b8d?auto=format&fit=crop&w=1950&q=80')" }}>
            
            {/* Overlay for readability */}
            <div className="absolute inset-0 bg-black opacity-20"></div>

            {/* Profile Banner Card */}
            <div className="relative h-40 flex items-center justify-center z-10">
                <div className="absolute w-60 h-36 bg-white rounded-b-3xl shadow-lg"></div>
                
                <div className="absolute -bottom-16 flex items-center justify-center w-36 h-36 bg-white rounded-full shadow-2xl">
                    <img
                        src={profileImage ? API_URL + profileImage : "https://via.placeholder.com/150"}
                        alt={username || "Profile"}
                        className="w-32 h-32 rounded-full object-cover"
                    />
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto mt-24 px-4 md:px-0 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                {/* Left Column */}
                <div className="flex flex-col gap-6">
                    <div className="bg-white rounded-2xl shadow p-6 text-center md:text-left">
                        <h1 className="text-2xl font-bold text-gray-800">{username || "Unknown User"}</h1>
                        <p className="text-gray-500 mt-1">{usereducation || "No education info"}</p>
                        <p className="text-gray-400 mt-1 text-sm">{email || "No email"}</p>
                    </div>

                    <div className="bg-white rounded-2xl shadow p-6 text-center md:text-left">
                        <h2 className="text-lg font-semibold text-gray-800 mb-3">Social Links</h2>
                        <div className="flex justify-center md:justify-start gap-3 flex-wrap">
                            {userfacebook && <SocialIcon href={userfacebook} color="blue" Icon={FaFacebookF} />}
                            {userinstagram && <SocialIcon href={userinstagram} color="pink" Icon={FaInstagram} />}
                            {usertwitter && <SocialIcon href={usertwitter} color="sky" Icon={FaTwitter} />}
                            {useryoutube && <SocialIcon href={useryoutube} color="red" Icon={FaYoutube} />}
                            {userwebsite && <SocialIcon href={userwebsite} color="gray" Icon={FaGlobe} />}
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="md:col-span-2 flex flex-col gap-6">
                    <div className="bg-white rounded-2xl shadow p-6 hover:shadow-xl transition duration-300">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b border-gray-200 pb-2">About</h2>
                        <p className="text-gray-600 leading-relaxed">{about}</p>
                    </div>

                    <div className="bg-white rounded-2xl shadow p-6 hover:shadow-xl transition duration-300">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b border-gray-200 pb-2">Skills & Interests</h2>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill, i) => (
                                <span key={i} className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm shadow-sm">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SocialIcon({ href, color, Icon }) {
    const colors = {
        blue: "bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white",
        pink: "bg-pink-100 text-pink-600 hover:bg-pink-600 hover:text-white",
        sky: "bg-sky-100 text-sky-600 hover:bg-sky-600 hover:text-white",
        red: "bg-red-100 text-red-600 hover:bg-red-600 hover:text-white",
        gray: "bg-gray-100 text-gray-600 hover:bg-gray-600 hover:text-white",
    };

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-12 h-12 flex items-center justify-center rounded-full shadow-md transition-all duration-300 ${colors[color]}`}
        >
            <Icon size={20} />
        </a>
    );
}
