import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const userislogin = useSelector((store) => store.user.userislogin);
    const [isOpen, setIsOpen] = useState(false);

    const closeMenu = () => setIsOpen(false);

    return (
        <>
            <nav className="w-full fixed top-0 left-0 bg-black text-white shadow-md z-50">
                <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <Link to={"/about"}>
                            <div className="w-10 h-10 rounded-xl bg-cyan-500 flex items-center justify-center shadow-md border border-cyan-400">
                                <span className="text-lg font-extrabold text-black">C</span>
                            </div>
                        </Link>
                        <span className="text-xl font-extrabold tracking-wide text-white">
                            Charcha<span className="text-cyan-400">Hub</span>
                        </span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="space-x-6 hidden md:flex font-medium">
                        <Link to="/" className="hover:text-cyan-400 transition">Home</Link>
                        <Link to="/allquestions" className="hover:text-cyan-400 transition">Questions/Answers</Link>
                        <Link to="/about" className="hover:text-cyan-400 transition">About Me</Link>
                        <Link to="/contact" className="hover:text-cyan-400 transition">Contact</Link>
                        {!userislogin ? (
                            <>
                                <Link to="/login" className="hover:text-cyan-400 transition">Login</Link>
                                <Link to="/registration" className="hover:text-cyan-400 transition">Registration</Link>
                            </>
                        ) : (
                            <>
                                <Link to="/logout" className="hover:text-cyan-400 transition">Logout</Link>
                                <Link to="/showprofile" className="hover:text-cyan-400 transition">Profile</Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="focus:outline-none bg-black/30 px-3 py-2 rounded-lg text-white"
                        >
                            {isOpen ? "✖" : "☰"}
                        </button>
                    </div>
                </div>

                {/* Mobile Dropdown */}
                {isOpen && (
                    <div className="absolute right-2 top-full mt-2 w-48 bg-black rounded-xl shadow-lg p-4 flex flex-col space-y-3 text-sm z-50 border border-cyan-400">
                        <Link to="/" onClick={closeMenu} className="hover:text-cyan-400 transition">Home</Link>
                        <Link to="/allquestions" onClick={closeMenu} className="hover:text-cyan-400 transition">Questions/Answers</Link>
                        <Link to="/about" onClick={closeMenu} className="hover:text-cyan-400 transition">About Me</Link>
                        <Link to="/contact" onClick={closeMenu} className="hover:text-cyan-400 transition">Contact</Link>
                        {!userislogin ? (
                            <>
                                <Link to="/login" onClick={closeMenu} className="hover:text-cyan-400 transition">Login</Link>
                                <Link to="/registration" onClick={closeMenu} className="hover:text-cyan-400 transition">Registration</Link>
                            </>
                        ) : (
                            <>
                                <Link to="/logout" onClick={closeMenu} className="hover:text-cyan-400 transition">Logout</Link>
                                <Link to="/showprofile" onClick={closeMenu} className="hover:text-cyan-400 transition">Profile</Link>
                            </>
                        )}
                    </div>
                )}
            </nav>
        </>
    );
}
