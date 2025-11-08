import React, { useState } from 'react';
import ChangePassword from './Changepassword';
import { useSelector } from 'react-redux';
import Profile from './Profile';
import Profileimage from './Profileimage';
import AskQuestions from './AskQuestions';
import { Link } from 'react-router-dom';

export default function Home() {
  const [selectedMenu, setSelectedMenu] = useState('home');
  const userislogin = useSelector((store) => store.user.userislogin);
  const username = useSelector((store) => store.user.userdata.name);

  // Generate random particles
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    style: {
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      width: `${Math.random() * 6 + 4}px`,
      height: `${Math.random() * 6 + 4}px`,
      animationDelay: `${Math.random() * 10}s`,
      background: `rgba(0,200,255,0.4)`,
    },
  }));

  // ----------------- NOT LOGGED IN -----------------
  if (!userislogin) {
    return (
      <div className="relative min-h-screen pt-20 flex flex-col bg-black text-white overflow-hidden font-sans">
        {/* Background Animations */}
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
              0%, 100% { transform: scale(1); opacity: 0.6; }
              50% { transform: scale(1.3); opacity: 0.3; }
            }
            .animate-pulse-slow { animation: pulse-slow 15s ease-in-out infinite; }
          `}
        </style>

        {/* Particles */}
        {particles.map((p) => (
          <div key={p.id} className="particle" style={p.style}></div>
        ))}

        {/* Glowing background shapes */}
        <div className="absolute top-0 left-0 w-full h-full -z-10">
          <div className="animate-pulse-slow absolute w-72 h-72 bg-blue-500/20 rounded-full -top-20 -left-20 blur-3xl"></div>
          <div className="animate-pulse-slow absolute w-72 h-72 bg-cyan-400/20 rounded-full -bottom-20 -right-10 blur-3xl"></div>
          <div className="animate-pulse-slow absolute w-56 h-56 bg-purple-400/20 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
        </div>

        {/* Hero */}
        <section className="flex-1 flex flex-col justify-center items-center text-center px-6 py-24 relative z-10">
          <h2 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent drop-shadow-lg">
            Join the Conversation 💬
          </h2>
          <p className="text-lg max-w-2xl mx-auto mb-8 text-gray-300">
            Ask questions, share knowledge, and connect with a community that grows together.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/registration"
              className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-black rounded-xl font-semibold shadow hover:scale-105 transform transition"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="px-6 py-3 bg-blue-800 text-white rounded-xl font-semibold shadow hover:bg-blue-900 transition"
            >
              Sign In
            </Link>
          </div>
        </section>
      </div>
    );
  }

  // ----------------- LOGGED IN -----------------
  return (
    <div className="relative flex min-h-screen mt-12 bg-black text-white overflow-hidden font-sans">
      {/* Background Animations */}
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
            0%, 100% { transform: scale(1); opacity: 0.6; }
            50% { transform: scale(1.3); opacity: 0.3; }
          }
          .animate-pulse-slow { animation: pulse-slow 15s ease-in-out infinite; }
        `}
      </style>

      {/* Particles */}
      {particles.map((p) => (
        <div key={p.id} className="particle" style={p.style}></div>
      ))}

      {/* Glowing background shapes */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="animate-pulse-slow absolute w-72 h-72 bg-blue-500/20 rounded-full -top-20 -left-20 blur-3xl"></div>
        <div className="animate-pulse-slow absolute w-72 h-72 bg-cyan-400/20 rounded-full -bottom-20 -right-10 blur-3xl"></div>
        <div className="animate-pulse-slow absolute w-56 h-56 bg-purple-400/20 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
      </div>

      {/* Sidebar */}
      <aside className="w-64 bg-black/60 backdrop-blur-lg border-r border-cyan-400/30 shadow-lg p-6 sticky top-0 h-screen z-10">
        <h2 className="text-xl font-bold mb-6 text-cyan-300">Forum Menu</h2>
        <div className="space-y-2">
          {['home', 'question', 'changePassword', 'profile', 'profile Image'].map((menu) => (
            <button
              key={menu}
              onClick={() => setSelectedMenu(menu)}
              className={`w-full text-left px-4 py-2 rounded-lg font-medium transition ${
                selectedMenu === menu
                  ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-black shadow-md'
                  : 'text-gray-300 hover:bg-gray-800/60'
              }`}
            >
              {menu === 'home'
                ? 'Home'
                : menu === 'question'
                ? 'Ask Questions'
                : menu === 'changePassword'
                ? 'Change Password'
                : menu === 'profile'
                ? 'Profile'
                : 'Profile Image'}
            </button>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto relative z-10">
        {selectedMenu === 'home' && (
          <div className="max-w-5xl mx-auto space-y-6">
            {/* Search */}
            <div className="mb-8">
              <input
                type="text"
                placeholder="🔍 Search discussions..."
                className="w-full px-4 py-3 rounded-xl border shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-black/50 text-white placeholder-gray-400"
              />
            </div>

            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black p-8 rounded-2xl shadow-lg">
              <h1 className="text-3xl font-bold mb-2">Welcome back, {username} 👋</h1>
              <p className="text-lg">Your personalized community dashboard is ready.</p>
            </div>

            {/* Latest Threads */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-cyan-300">Latest Discussions</h2>
              {[
                { title: '🔥 How to optimize React apps?', user: 'Alex', replies: 15, tag: 'React' },
                { title: '🎨 Best UI design resources for beginners?', user: 'Priya', replies: 9, tag: 'UI/UX' },
                { title: '📢 Forum Rules Update (Aug 2025)', user: 'Admin', replies: 0, tag: 'Announcement' },
              ].map((thread, i) => (
                <div
                  key={i}
                  className="bg-black/50 backdrop-blur-lg p-6 rounded-xl shadow hover:shadow-cyan-400/20 transition flex items-start justify-between border border-cyan-400/20"
                >
                  <div>
                    <h3 className="font-semibold text-lg text-white">{thread.title}</h3>
                    <p className="text-sm text-gray-400">
                      Posted by <span className="font-medium text-cyan-300">{thread.user}</span> • {thread.replies} replies
                    </p>
                    <span className="inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full bg-cyan-500/20 text-cyan-300">
                      {thread.tag}
                    </span>
                  </div>
                  <button className="text-gray-400 hover:text-cyan-300">💬 Reply</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedMenu === 'question' && (
          <div className="bg-transparent p-8 rounded-2xl shadow-lg border border-cyan-400/20">
            <h1 className="text-2xl font-bold mb-6 text-cyan-300">Ask a Question ❓</h1>
            <AskQuestions />
          </div>
        )}

        {selectedMenu === 'changePassword' && (
          <div className="bg-transparent p-8 rounded-2xl shadow-lg border border-cyan-400/20">
            <h2 className="text-2xl font-bold mb-6 text-cyan-300">Change Password 🔑</h2>
            <ChangePassword />
          </div>
        )}

        {selectedMenu === 'profile' && (
          <div className="bg-transparent p-8 rounded-2xl shadow-lg border border-cyan-400/20">
            <h2 className="text-2xl font-bold mb-6 text-cyan-300">Edit Profile 👤</h2>
            <Profile />
          </div>
        )}

        {selectedMenu === 'profile Image' && (
          <div className="bg-transparent p-8 rounded-2xl shadow-lg border border-cyan-400/20">
            <h2 className="text-2xl font-bold mb-6 text-cyan-300">Upload Profile Image 🖼️</h2>
            <Profileimage />
          </div>
        )}
      </main>
    </div>
  );
}
