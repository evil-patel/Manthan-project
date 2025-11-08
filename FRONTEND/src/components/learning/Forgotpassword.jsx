import axios from 'axios';
import React, { useRef, useState } from 'react';
import { API_URL } from '../../Config';

export default function Forgotpassword() {
  const emailRef = useRef();
  const [success, setSuccess] = useState('');
  const [error, seterror] = useState('');

  const fun1 = () => {
    const email = emailRef.current.value;
    if (!email) {
      alert("Please enter your email");
      return;
    }
    let data = { useremail: email };
    axios.put(API_URL + "/user/forgetpassword", data)
      .then((d) => {
        if (d.data.msg === "OTP sent to registered email.") {
          setSuccess('OTP sent to your email for verification.');
          seterror('');
        } else {
          seterror('Email is not present');
          setSuccess('');
        }
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-blue-900 px-4">
      <div className="w-full max-w-sm p-6 bg-black/80 backdrop-blur-md rounded-3xl shadow-2xl border border-cyan-500/30">
        <h2 className="text-3xl font-bold text-center text-cyan-400 mb-6">Forgot Password</h2>
        <p className="text-center text-gray-300 mb-5 text-sm">
          Enter your registered email to receive OTP for password reset.
        </p>
        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              ref={emailRef}
              className="w-full p-3 rounded-xl border border-cyan-400/50 bg-black/20 text-white placeholder-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm"
              placeholder="Enter your registered email"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-400 text-sm">{success}</p>}
          <button
            type="button"
            onClick={fun1}
            className="w-full py-3 bg-cyan-500 hover:bg-cyan-600 text-black font-semibold rounded-xl transition duration-200 shadow-md"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
