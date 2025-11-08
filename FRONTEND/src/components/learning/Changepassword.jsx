import React, { useRef, useState } from "react";
import axios from "axios";
import { API_URL } from "../../Config";
import { useSelector } from "react-redux";

export default function ChangePassword() {
  const passwordRef = useRef();
  const newPasswordRef = useRef();
  const reenterPasswordRef = useRef();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const user = useSelector((store) => store.user.userdata);

  const fun1 = () => {
    const current = passwordRef.current.value;
    const newPass = newPasswordRef.current.value;
    const reenter = reenterPasswordRef.current.value;
    if (newPass !== reenter) {
      setError("New passwords do not match.");
    } else {
      setError("");
      let data = {
        email: user.email,
        currentpassword: current,
        newpassword: newPass,
      };

      axios
        .put(API_URL + "/user/changepwd", data)
        .then((d) => {
          if (d.data.msg === "Password changed successfully!") {
            setSuccess("Password changed successfully!");
          } else {
            alert(d.data.msg);
          }
        })
        .catch((err) => {
          console.log(err);
          alert("Unexpected error, please try again.");
        });

      passwordRef.current.value = "";
      newPasswordRef.current.value = "";
      reenterPasswordRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-black/60 backdrop-blur-md border border-cyan-500/40 shadow-lg shadow-cyan-500/40 rounded-3xl p-8">
        {/* <h2 className="text-3xl font-bold mb-6 text-center text-cyan-400 drop-shadow-lg">
          Change Password
        </h2> */}

        <form className="space-y-5">
          {/* Current Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Current Password
            </label>
            <input
              type="password"
              ref={passwordRef}
              required
              placeholder="Enter current password"
              className="w-full px-4 py-3 bg-gray-900 border border-cyan-500/40 text-gray-200 rounded-2xl shadow-inner focus:ring-2 focus:ring-cyan-400 focus:outline-none transition duration-200 placeholder-gray-500"
            />
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              New Password
            </label>
            <input
              type="password"
              ref={newPasswordRef}
              required
              placeholder="Enter new password"
              className="w-full px-4 py-3 bg-gray-900 border border-cyan-500/40 text-gray-200 rounded-2xl shadow-inner focus:ring-2 focus:ring-cyan-400 focus:outline-none transition duration-200 placeholder-gray-500"
            />
          </div>

          {/* Re-enter Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Re-enter New Password
            </label>
            <input
              type="password"
              ref={reenterPasswordRef}
              required
              placeholder="Re-enter new password"
              className="w-full px-4 py-3 bg-gray-900 border border-cyan-500/40 text-gray-200 rounded-2xl shadow-inner focus:ring-2 focus:ring-cyan-400 focus:outline-none transition duration-200 placeholder-gray-500"
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}
          {success && <p className="text-green-400 text-sm">{success}</p>}

          <button
            type="button"
            onClick={fun1}
            className="w-full bg-gradient-to-r from-cyan-500 to-cyan-700 hover:from-cyan-600 hover:to-cyan-800 text-white font-semibold py-3 rounded-2xl shadow-lg shadow-cyan-500/50 transition-all duration-300"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}
