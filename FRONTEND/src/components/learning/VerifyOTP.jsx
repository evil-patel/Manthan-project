import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../Config";

export default function VerifyOTP() {
  const { id } = useParams();
  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState('');

  const handleVerify = async () => {
    try {
      const d = await axios.post(API_URL + `/user/verify/${id}`, { otp });
      setMsg(d.data.msg);
      setError(
        <Link to="/login">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Click here to Login
          </button>
        </Link>
      )

    } catch (err) {
      setMsg("Verification failed");
    }
  };




  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-xl p-6 w-80 text-center">
        <h2 className="text-lg font-semibold mb-4">Enter OTP</h2>
        <input
          type="text"
          maxLength="4"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full h-12 text-center border rounded-md text-lg mb-4 focus:outline-none"
        />
        <button
          onClick={() => handleVerify()}
          className="w-full bg-blue-500 text-white py-2 rounded-md"
        >
          Verify
        </button>
        {msg && <p className="mt-3 text-sm text-gray-600">{msg}</p>}
        {error}
      </div>
    </div>
  );
}
