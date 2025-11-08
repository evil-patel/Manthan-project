import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  const features = [
    { title: "Interactive Threads", desc: "Ask questions, react, and engage with the community." },
    { title: "Smart Recommendations", desc: "Get personalized topics tailored to your interests." },
    { title: "Community Driven", desc: "Connect with like-minded people and grow together." },
  ];

  const team = [
    { name: "Alice Johnson", role: "Community Manager", img: 1, bio: "Ensures the community thrives and stays engaged." },
    { name: "Bob Smith", role: "Lead Developer", img: 2, bio: "Builds and maintains CharchaHub platform seamlessly." },
    { name: "Clara Lee", role: "UI/UX Designer", img: 3, bio: "Designs intuitive and modern user experiences." },
    { name: "David Kim", role: "Content Strategist", img: 4, bio: "Creates and curates valuable content for users." },
  ];

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

  return (
    <div className="relative min-h-screen p-10 flex flex-col bg-black px-6 overflow-hidden text-white font-sans">
      {/* Particle Animations */}
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
          .animate-slideUp { opacity: 0; transform: translateY(20px); animation: slideUp 1s forwards; }
          @keyframes slideUp { to { opacity: 1; transform: translateY(0); } }
          .perspective { perspective: 1000px; }
          .backface-hidden { backface-visibility: hidden; }
          .rotate-y-180 { transform: rotateY(180deg); }
          .transform-style { transform-style: preserve-3d; }
        `}
      </style>

      {/* Particles */}
      {particles.map((p) => (
        <div key={p.id} className="particle" style={p.style}></div>
      ))}

      {/* Glowing background shapes */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="animate-pulse-slow absolute w-72 h-72 bg-blue-500/20 rounded-full -top-20 -left-20 blur-3xl"></div>
        <div className="animate-pulse-slow absolute w-72 h-72 bg-blue-400/20 rounded-full -bottom-20 -right-10 blur-3xl"></div>
        <div className="animate-pulse-slow absolute w-56 h-56 bg-blue-300/30 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
      </div>

      {/* Hero Section */}
      <section className="py-16 text-center relative z-10">
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
          CharchaHub
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto animate-slideUp">
          The modern forum for discussions, ideas, and community growth.
        </p>
      </section>

      {/* Features Section */}
      <section className="py-20 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-400 animate-slideUp">
          Why Choose Us
        </h2>
        <div className="flex flex-col md:flex-row md:-space-x-8 space-y-8 md:space-y-0">
          {features.map((f, idx) => (
            <div key={idx} className="flex-1 p-8 rounded-3xl bg-black/50 backdrop-blur-lg border border-cyan-400/40 shadow-lg transform hover:scale-105 hover:-rotate-1 transition duration-500 cursor-pointer">
              <h3 className="text-2xl font-bold mb-2 text-cyan-300">{f.title}</h3>
              <p className="text-gray-300">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-400 animate-slideUp">Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {team.map((member, idx) => (
            <div key={idx} className="group perspective cursor-pointer">
              <div className="relative w-full h-72 transform-style preserve-3d transition-transform duration-700 group-hover:rotate-y-180">
                {/* Front */}
                <div className="absolute w-full h-full bg-black/50 backdrop-blur-lg border border-cyan-400/30 rounded-3xl shadow-lg flex flex-col items-center justify-center backface-hidden p-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-cyan-400 shadow-md">
                    <img src={`https://i.pravatar.cc/100?img=${member.img}`} alt={member.name} className="w-full h-full object-cover"/>
                  </div>
                  <h3 className="text-lg font-semibold text-cyan-300">{member.name}</h3>
                  <p className="text-gray-300">{member.role}</p>
                </div>
                {/* Back */}
                <div className="absolute w-full h-full bg-blue-900/50 backdrop-blur-lg border border-cyan-400/30 rounded-3xl shadow-lg flex items-center justify-center backface-hidden rotate-y-180 p-4">
                  <p className="text-gray-200 text-center">{member.bio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-24 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-400 animate-slideUp">Join the Community</h2>
        <Link to={'/registration'} className="bg-gradient-to-r from-blue-400 to-cyan-300 px-8 py-3 rounded-full font-bold hover:scale-105 transform transition duration-500 shadow-lg">
          Get Started
        </Link>
      </section>
    </div>
  );
}
