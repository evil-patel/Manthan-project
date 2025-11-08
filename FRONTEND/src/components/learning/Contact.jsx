import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { API_URL } from '../../Config';

export default function Contact() {
  const nameref = useRef();
  const emailref = useRef();
  const messageref = useRef();
  const [msg, setmsg] = useState();

  const savemessage = () => {
    const username = nameref.current.value;
    const useremail = emailref.current.value;
    const usermessage = messageref.current.value;

    if (!username) {
      setmsg("Please enter your name!");
    } else if (!useremail) {
      setmsg("Please enter your email!");
    } else if (!usermessage) {
      setmsg("Please enter your message!");
    } else {
      let data = {
        name: nameref.current.value,
        email: emailref.current.value.toLowerCase(),
        message: messageref.current.value
      };
      axios.post(API_URL + "/contactinfo", data)
        .then((d) => {
          console.log(d.data.data);
          setmsg("✅ Thanks for your feedback!");
          nameref.current.value = "";
          emailref.current.value = "";
          messageref.current.value = "";
        })
        .catch((err) => {
          console.log(err);
          setmsg("❌ Something went wrong. Try again.");
        });
    }
  };

  useEffect(() => {
    if (msg) {
      const timer = setTimeout(() => setmsg(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [msg]);

  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    style: {
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      width: `${Math.random() * 6 + 4}px`,
      height: `${Math.random() * 6 + 4}px`,
      animationDelay: `${Math.random() * 10}s`,
      background: `rgba(0, 200, 255, 0.4)`,
    },
  }));

  return (
    <div className="min-h-screen pt-15 relative bg-black flex items-center justify-center p-6 overflow-hidden">
      <style>
        {`
          @keyframes pulse-slow {
            0%, 100% { transform: scale(1) translate(0,0); opacity: 0.6; }
            50% { transform: scale(1.2) translate(20px, 20px); opacity: 0.3; }
          }
          .animate-pulse-slow { animation: pulse-slow 15s ease-in-out infinite; }

          @keyframes fadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }
          .animate-fadeIn { animation: fadeIn 1.5s ease forwards; }

          @keyframes slideInLeft { 0% { opacity: 0; transform: translateX(-50px); } 100% { opacity: 1; transform: translateX(0); } }
          .animate-slideInLeft { animation: slideInLeft 1s ease forwards; }

          @keyframes slideInRight { 0% { opacity: 0; transform: translateX(50px); } 100% { opacity: 1; transform: translateX(0); } }
          .animate-slideInRight { animation: slideInRight 1s ease forwards; }

          @keyframes particleMove {
            0% { transform: translate(0,0); opacity: 0.5; }
            50% { transform: translate(20px,-30px); opacity: 0.3; }
            100% { transform: translate(0,0); opacity: 0.5; }
          }
          .particle {
            position: absolute;
            border-radius: 50%;
            animation: particleMove 10s ease-in-out infinite;
          }
        `}
      </style>


      {particles.map((p) => (
        <div key={p.id} className="particle" style={p.style}></div>
      ))}


      <div className="absolute top-0 left-0 w-full h-full">
        <div className="animate-pulse-slow absolute w-72 h-72 bg-blue-500/20 rounded-full -top-20 -left-20 blur-3xl"></div>
        <div className="animate-pulse-slow absolute w-72 h-72 bg-blue-400/20 rounded-full -bottom-20 -right-10 blur-3xl"></div>
        <div className="animate-pulse-slow absolute w-56 h-56 bg-blue-300/30 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
      </div>

      <div className="relative w-full max-w-6xl pt-6 lg:flex lg:space-x-10 z-10">


        <div className="lg:w-1/2 bg-gray-900/80 p-10 rounded-3xl flex flex-col justify-center space-y-6 backdrop-blur-md shadow-lg border border-blue-400/50 animate-slideInLeft">
          <h1 className="text-4xl font-extrabold text-blue-400">Contact CharchaHub</h1>
          <p className="text-gray-300">
            Questions, feedback, or just want to chat? Reach out and let's connect!
          </p>

          <div className="space-y-4 text-gray-200">
            <div className="flex items-center space-x-3">
              <span className="text-blue-400">📧</span>
              <span>contact@charchahub.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-blue-400">📞</span>
              <span>+91 123 456 7890</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-blue-400">📍</span>
              <span>India</span>
            </div>
          </div>

          <div className="flex space-x-5 text-blue-400 text-2xl mt-6">
            <a href="#" className="hover:text-blue-300 transition"> <FaFacebookF /> </a>
            <a href="#" className="hover:text-blue-300 transition"> <FaTwitter /> </a>
            <a href="#" className="hover:text-blue-300 transition"> <FaInstagram /> </a>
            <a href="#" className="hover:text-blue-300 transition"> <FaLinkedin /> </a>
          </div>
        </div>


        <div className="lg:w-1/2 mt-8 lg:mt-0 bg-gray-900/80 p-10 rounded-3xl backdrop-blur-md shadow-lg border border-blue-400/50 animate-slideInRight">
          <form className="space-y-5">
            <input
              type="text"
              ref={nameref}
              placeholder="Your Name"
              className="w-full p-4 rounded-xl bg-black border border-blue-400 text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-blue-300 transition-all duration-300 transform hover:scale-105"
            />
            <input
              type="email"
              ref={emailref}
              placeholder="Your Email"
              className="w-full p-4 rounded-xl bg-black border border-blue-400 text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-blue-300 transition-all duration-300 transform hover:scale-105"
            />
            <textarea
              rows="5"
              ref={messageref}
              placeholder="Your Message"
              className="w-full p-4 rounded-2xl bg-black border border-blue-400 text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-blue-300 transition-all duration-300 transform hover:scale-105"
            ></textarea>
            <button
              type="button"
              onClick={savemessage}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white py-4 rounded-2xl font-bold hover:scale-105 hover:shadow-xl transition-all duration-300"
            >
              Send Message
            </button>

            {msg && (
              <div className="msg-box mt-4 p-3 rounded-xl text-center font-semibold text-white bg-gradient-to-r from-blue-500 to-cyan-400 shadow-lg">
                {msg}
              </div>
            )}

          </form>
        </div>

      </div>
    </div>
  );
}
