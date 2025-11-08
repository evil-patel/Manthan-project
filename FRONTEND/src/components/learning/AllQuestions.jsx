import React, { useEffect, useState } from 'react';
import { API_URL } from '../../Config';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAllQuestions } from '../../slices/Allquestions';
import { Link } from 'react-router-dom';
import CategorySection from '../learning/CategorySection';
import { FaUserCircle, FaClock } from 'react-icons/fa';

export default function AllQuestions() {
    const dispatch = useDispatch();
    const [AllQuestionsUI, setAllQuestionsUI] = useState(<p>Loading...</p>);

    
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

    const fetchQuestions = async () => {
        try {
            const { data } = await axios.get(`${API_URL}/Allquestions`);
            const questions = data.data;

            const ui = questions.map((ques, index) => (
                <div
                    key={index}
                    className="bg-white/5 backdrop-blur-md rounded-2xl shadow-lg p-5 mb-6 border border-cyan-400/30 hover:border-cyan-300/70 hover:scale-[1.02] transform transition duration-300"
                >
                    <Link
                        to={`/Questions_details/${ques._id}`}
                        className="text-xl font-bold text-cyan-300 hover:text-cyan-200 break-words"
                    >
                        ❓ {ques.questiontitle}
                    </Link>

                    <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-3">
                            <Link to={`/showuserprofile/${ques.user_id}`} className="flex-shrink-0">
                                {ques.profilepic ? (
                                    <img
                                        src={API_URL + ques.profilepic}
                                        alt="Profile"
                                        className="h-12 w-12 rounded-full object-cover border-2 border-cyan-400 shadow-md"
                                    />
                                ) : (
                                    <FaUserCircle className="h-12 w-12 text-gray-400" />
                                )}
                            </Link>
                            <span className="font-medium text-gray-200">{ques.user_name || "Unknown"}</span>
                        </div>
                        <div className="flex items-center text-gray-400 text-sm">
                            <FaClock className="mr-1" /> {new Date(ques.postdate).toLocaleString()}
                        </div>
                    </div>
                </div>
            ));

            setAllQuestionsUI(ui);
            dispatch(setAllQuestions(questions));
        } catch (err) {
            console.log("Error loading questions", err);
            setAllQuestionsUI(<p className="text-red-400">Failed to load questions.</p>);
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestionsByCategory = async (category) => {
        try {
            const { data } = await axios.get(`${API_URL}/userquestion/by-category/${category}`);
            const questions = data.data;

            const ui = questions.map((ques, index) => (
                <div
                    key={index}
                    className="bg-white/5 backdrop-blur-md rounded-2xl shadow-lg p-5 mb-6 border border-green-400/30 hover:border-green-300/70 hover:scale-[1.02] transform transition duration-300"
                >
                    <Link
                        to={`/Questions_details/${ques._id}`}
                        className="text-xl font-bold text-green-300 hover:text-green-200 break-words"
                    >
                        ❓ {ques.questiontitle}
                    </Link>

                    <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-3">
                            <Link to={`/showuserprofile/${ques.user_id}`} className="flex-shrink-0">
                                {ques.profilepic ? (
                                    <img
                                        src={API_URL + ques.profilepic}
                                        alt="Profile"
                                        className="h-12 w-12 rounded-full object-cover border-2 border-green-400 shadow-md"
                                    />
                                ) : (
                                    <FaUserCircle className="h-12 w-12 text-gray-400" />
                                )}
                            </Link>
                            <span className="font-medium text-gray-200">{ques.user_name || "Unknown"}</span>
                        </div>
                        <div className="flex items-center text-gray-400 text-sm">
                            <FaClock className="mr-1" /> {new Date(ques.postdate).toLocaleString()}
                        </div>
                    </div>
                </div>
            ));

            setAllQuestionsUI(ui);
        } catch (err) {
            console.error("Error fetching questions by category", err);
        }
    };

    return (
        <div className="relative min-h-screen pt-15 flex bg-black overflow-hidden text-white">
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
                `}
            </style>

            {/* Particles */}
            {particles.map((p) => (
                <div key={p.id} className="particle" style={p.style}></div>
            ))}

            {/* Sidebar */}
            <div className="bg-white/10 backdrop-blur-lg w-64 shadow-xl p-4 flex flex-col space-y-3 border-r border-cyan-400/20 relative z-10">
                <h2 className="text-xl font-extrabold mb-3 text-cyan-300 uppercase">Categories</h2>
                <hr className='w-3/5 border-cyan-400/30' />
                <div className="overflow-y-auto max-h-[calc(100vh-20px)]">
                    <CategorySection onCategoryClick={fetchQuestionsByCategory} />
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 relative z-10">
                <h1 className="text-3xl font-bold mb-6 text-cyan-300">All Questions</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{AllQuestionsUI}</div>
            </div>
        </div>
    );
}
