import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../Config';

export default function ResetPassword() {
    const { id } = useParams();
    const otpRef = useRef();
    const passRef = useRef();
    const confirmRef = useRef();
    const [message, setMessage] = useState('');

    const handleReset = () => {
        const otp = otpRef.current.value;
        const password = passRef.current.value;
        const confirmPassword = confirmRef.current.value;

        if (!otp || !password || !confirmPassword) {
            alert("All fields are required.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        axios.put(`${API_URL}/user/resetpwd`, {
            id,
            otp,
            password
        })
            .then((d) => {
                setMessage(d.data.msg || "Password reset successful.");
            })
            .catch((err) => {
                console.log(err);
                alert("Something went wrong.");
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-blue-900 px-4">
            <div className="w-full max-w-sm p-6 bg-black/80 backdrop-blur-md rounded-3xl shadow-2xl border border-cyan-500/30">
                <h2 className="text-3xl font-bold text-center text-cyan-400 mb-6">Reset Password</h2>

                <div className="space-y-4">
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-300">Enter OTP</label>
                        <input
                            ref={otpRef}
                            type="text"
                            placeholder="Enter OTP"
                            className="w-full p-3 rounded-xl border border-cyan-400/50 bg-black/20 text-white placeholder-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-300">New Password</label>
                        <input
                            ref={passRef}
                            type="password"
                            placeholder="New Password"
                            className="w-full p-3 rounded-xl border border-cyan-400/50 bg-black/20 text-white placeholder-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-300">Confirm Password</label>
                        <input
                            ref={confirmRef}
                            type="password"
                            placeholder="Confirm Password"
                            className="w-full p-3 rounded-xl border border-cyan-400/50 bg-black/20 text-white placeholder-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm"
                        />
                    </div>

                    {message && <p className="text-green-400 text-sm text-center">{message}</p>}

                    <button
                        onClick={handleReset}
                        className="w-full py-3 bg-cyan-500 hover:bg-cyan-600 text-black font-semibold rounded-xl transition duration-200 shadow-md"
                    >
                        Change Password
                    </button>
                </div>
            </div>
        </div>
    );
}
