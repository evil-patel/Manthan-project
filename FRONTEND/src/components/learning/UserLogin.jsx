import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { loginuserMain } from '../../slices/Userslice';
import { API_URL } from '../../Config';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function UserLogin() {
    const emailref = useRef();
    const passref = useRef();
    let navigate = useNavigate()
    const dispatch = useDispatch();

    const setlogin = () => {
        const useremail = emailref.current.value;
        const password = passref.current.value;

        if (!useremail) {
            alert("Enter Email")
        }
        else if (!password) {
            alert("Password Required")
        }
        else {
            console.log("Logging in...");
            let data = { email: emailref.current.value.toLowerCase(), password: passref.current.value }
            axios.post(API_URL + "/user/loginUser", data)
                .then((d) => {
                    if (d.data.msg === "success") {
                        console.log(d.data.data)
                        dispatch(loginuserMain(d.data.data))
                        navigate("/")
                    }
                    else {
                        alert(d.data.msg)
                    }
                })
                .catch((err) => {
                    console.log(err);
                    alert("Unexpected error, please try again")
                })
            emailref.current.value = "";
            passref.current.value = "";
        }
    };

    // Generate random particles
    const particles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        style: {
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 6 + 4}px`,
            height: `${Math.random() * 6 + 4}px`,
            animationDelay: `${Math.random() * 10}s`,
            background: `rgba(0, 200, 255, 0.4)`, // Light blue particles
        },
    }));

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-black px-4 overflow-hidden">
            {/* Inline particle animations */}
            <style>
                {`
                @keyframes particleMove {
                    0% { transform: translate(0,0); opacity: 0.5; }
                    50% { transform: translate(20px,-30px); opacity: 0.3; }
                    100% { transform: translate(0,0); opacity: 0.5; }
                }
                .particle {
                    position: absolute;
                    border-radius: 50%;
                    animation: particleMove 10s ease-in-out infinite;
                    pointer-events: none;
                  }

                @keyframes pulse-slow {
                    0%, 100% { transform: scale(1) translate(0,0); opacity: 0.6; }
                    50% { transform: scale(1.2) translate(20px, 20px); opacity: 0.3; }
                }
                .animate-pulse-slow { animation: pulse-slow 15s ease-in-out infinite; }
                `}
            </style>

            {/* Particles */}
            {particles.map((p) => (
                <div key={p.id} className="particle" style={p.style}></div>
            ))}

            {/* Animated background shapes */}
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="animate-pulse-slow absolute w-72 h-72 bg-blue-500/20 rounded-full -top-20 -left-20 blur-3xl"></div>
                <div className="animate-pulse-slow absolute w-72 h-72 bg-blue-400/20 rounded-full -bottom-20 -right-10 blur-3xl"></div>
                <div className="animate-pulse-slow absolute w-56 h-56 bg-blue-300/30 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
            </div>

            {/* Login form (original logic untouched) */}
            <div className="w-full max-w-sm p-8 bg-black/80 backdrop-blur-md rounded-3xl shadow-2xl border border-cyan-500/30 z-10">
                <h2 className="text-3xl font-bold text-center text-cyan-400 mb-6">Login</h2>

                <div className="mb-4">
                    <label className="block mb-1 text-sm font-medium text-gray-300">Email</label>
                    <input
                        type="text"
                        ref={emailref}
                        value={'manthanp1739@gmail.com'}
                        className="w-full px-4 py-2 rounded-xl border border-cyan-400/50 bg-black/20 text-white placeholder-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm"
                        placeholder="Enter your Email"
                    />
                </div>

                <div className="mb-6">
                    <label className="block mb-1 text-sm font-medium text-gray-300">Password</label>
                    <input
                        type="password"
                        ref={passref}
                        value={'111111'}
                        className="w-full px-4 py-2 rounded-xl border border-cyan-400/50 bg-black/20 text-white placeholder-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm"
                        placeholder="Enter your password"
                    />
                </div>

                <div className="grid grid-cols-2 gap-3 items-center">
                    <button
                        onClick={setlogin}
                        className="w-full py-2 px-4 bg-cyan-500 hover:bg-cyan-600 text-black font-semibold rounded-xl transition duration-200 shadow-md"
                    >
                        Login
                    </button>
                    <Link to="/forgotpassword" className='text-right text-gray-300 hover:text-cyan-400 text-sm'>
                        Forgot Password?
                    </Link>
                </div>
            </div>
        </div>
    );
}
