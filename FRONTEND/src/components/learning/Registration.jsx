import React, { useRef, useState } from 'react';
import { API_URL } from '../../Config';
import axios from "axios"
import { Link } from 'react-router-dom';

export default function RegistrationForm() {
    const name = useRef();
    const email = useRef();
    const contact = useRef();
    const password = useRef();
    const confirmPassword = useRef();
    const address = useRef();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password.current.value !== confirmPassword.current.value) {
            setError("Passwords do not match!");
            return;
        }

        let user = {
            name: name.current.value,
            address: address.current.value,
            email: email.current.value,
            password: password.current.value,
            contact: contact.current.value
        }

        console.log(user);

        await axios.post(API_URL + "/user", user)
            .then((d) => {
                setError(
                    <Link to={`/verify/${d.data.id}`} className="hover:text-gray-200 text-cyan-400">
                        {d.data.msg} Click here to verify OTP
                    </Link>
                );
            })
            .catch((err) => {
                console.log(err);
            });
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
        <div className="relative min-h-screen pt-17 flex items-center justify-center bg-black px-4 overflow-hidden">
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

            {/* Registration form (logic untouched) */}
            <div className="w-full max-w-md p-6 bg-gradient-to-t from-black/80 to-blue-900/70 backdrop-blur-md rounded-3xl shadow-2xl border border-cyan-500/30 z-10">
                <h2 className="text-3xl font-bold text-center text-cyan-400 mb-4">Register</h2>
                <p className="text-center text-gray-300 mb-5 text-sm">Join CharchaHub and start discussing!</p>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                        type="text"
                        placeholder="Name"
                        ref={name}
                        required
                        className="w-full p-3 rounded-xl border border-cyan-400/50 bg-black/20 text-white placeholder-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        ref={email}
                        required
                        className="w-full p-3 rounded-xl border border-cyan-400/50 bg-black/20 text-white placeholder-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm"
                    />
                    <input
                        type="text"
                        placeholder="Contact"
                        ref={contact}
                        required
                        className="w-full p-3 rounded-xl border border-cyan-400/50 bg-black/20 text-white placeholder-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        ref={password}
                        required
                        className="w-full p-3 rounded-xl border border-cyan-400/50 bg-black/20 text-white placeholder-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm"
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        ref={confirmPassword}
                        required
                        className="w-full p-3 rounded-xl border border-cyan-400/50 bg-black/20 text-white placeholder-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm"
                    />
                    <textarea
                        placeholder="Address"
                        ref={address}
                        required
                        className="w-full p-3 rounded-xl border border-cyan-400/50 bg-black/20 text-white placeholder-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm resize-none"
                    />
                    <button
                        type="submit"
                        className="w-full py-3 bg-cyan-500 hover:bg-cyan-600 text-black font-semibold rounded-xl transition duration-200 shadow-md"
                    >
                        Register
                    </button>
                    {error && <div className="text-center mt-2 text-red-500 text-sm">{error}</div>}
                </form>
                <p className="text-center text-gray-400 mt-4 text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="text-cyan-400 font-medium hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
