import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { API_URL } from '../../Config';
import axios from 'axios';
import Editor from './Editor';
import Quill from 'quill';
const Delta = Quill.import('delta');

export default function Questions_Details() {
  const allquestions = useSelector((store) => store.allquestions.AllQuestionsData);
  const userislogin = useSelector((store) => store.user.userislogin);
  const user_id = useSelector((store) => store.user.userdata._id);
  const { id } = useParams();
  const Questiondetailsui = allquestions.find((m) => m._id === id);
  const question_id = Questiondetailsui?._id;

  const [range, setRange] = useState();
  const [lastChange, setLastChange] = useState();
  const [readOnly, setReadOnly] = useState(false);
  const answerRef = useRef();
  const [showAnswerBox, setShowAnswerBox] = useState(false);
  const [showLoginMsg, setShowLoginMsg] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    if (question_id) {
      axios.get(`${API_URL}/useranswer/${question_id}`)
        .then((d) => setAnswers(d.data))
        .catch((err) => console.log(err));
    }
  }, [question_id]);

  // Particle animations like About page
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

  const handleAnswerClick = () => {
    if (userislogin) {
      setShowAnswerBox(true);
      setShowLoginMsg(false);
    } else {
      setShowLoginMsg(true);
      setTimeout(() => setShowLoginMsg(false), 5000);
    }
  };

  const saveAnswers = async () => {
    const answer = answerRef.current.container.innerHTML;
    if (!answer) return;

    let data = { question_id, user_id, answer };

    try {
      const res = await axios.post(API_URL + "/useranswer", data);
      setAnswers((prev) => [...prev, res.data.data]);

      axios.get(`${API_URL}/useranswer/${question_id}`)
        .then((d) => setAnswers(d.data))
        .catch((err) => console.log(err));

      setSuccessMsg("✅ Answer submitted successfully!");
      setShowAnswerBox(false);
      answerRef.current.container.innerHTML = "";
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  let answersui = answers.map((ans) => (
    <div
      key={ans._id}
      className="bg-gradient-to-br from-black via-gray-900 to-cyan-900 p-5 my-4 rounded-xl border hover:scale-95 duration-300 border-cyan-500/50 shadow-lg"
    >
      <div className="flex justify-between items-center mb-3 text-xs text-cyan-300">
        <span className="font-semibold uppercase">Answered by: {ans.user_name}</span>
        <span className="font-semibold">{new Date(ans.postdate).toLocaleDateString()}</span>
      </div>
      <div className="bg-gray-900 text-cyan-100 p-4 rounded-md border border-cyan-400/30">
        <div className="text-white leading-relaxed" dangerouslySetInnerHTML={{ __html: ans.answer }} />
      </div>
    </div>
  ));

  return (
    <div className="relative min-h-screen pt-25 px-5 sm:px-10 py-12 font-sans overflow-hidden bg-black text-white">
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

      {/* Glowing background shapes */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="animate-pulse-slow absolute w-72 h-72 bg-blue-500/20 rounded-full -top-20 -left-20 blur-3xl"></div>
        <div className="animate-pulse-slow absolute w-72 h-72 bg-blue-400/20 rounded-full -bottom-20 -right-10 blur-3xl"></div>
        <div className="animate-pulse-slow absolute w-56 h-56 bg-cyan-300/20 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto z-10">

        <header className="mb-10 border-b border-cyan-500/30 pb-6 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-cyan-100">Question Details</h1>
            <p className="text-sm text-cyan-300 mt-2">Explore the complete details of the selected question.</p>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-cyan-300 uppercase tracking-wider block">Posted by:</label>
            <div className="flex gap-2 text-right items-center text-sm">
              <Link to={`/showuserprofile/${Questiondetailsui.user_id}`}>
                <img
                  src={API_URL + Questiondetailsui.profilepic}
                  alt="User Profile"
                  className="w-6 h-6 rounded-full object-cover border shadow"
                />
              </Link>
              <p className="text-xs font-semibold text-cyan-300 uppercase tracking-wider block">{Questiondetailsui.user_name}</p>
            </div>
          </div>
        </header>

        <section className="border-b border-cyan-500/30 pb-8 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <label className="text-xs font-semibold text-cyan-300 uppercase tracking-wider mb-1 block">Title</label>
              <h2 className="text-xl sm:text-2xl font-semibold text-cyan-100 leading-snug uppercase">
                {Questiondetailsui.questiontitle}
              </h2>
            </div>
            <div className="text-right">
              <label className="text-xs font-semibold text-cyan-300 uppercase tracking-wider block">Posted On</label>
              <p className="text-sm text-cyan-300">
                {new Date(Questiondetailsui.postdate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </section>

        <section>
          <label className="text-xs font-semibold text-cyan-300 uppercase tracking-wider mb-3 block">Question Body</label>
          <div className="bg-gradient-to-br from-black via-gray-900 to-cyan-900 text-cyan-100 rounded-xl p-6 text-base leading-relaxed max-h-[65vh] overflow-y-auto border border-cyan-500/50 shadow-lg">
            <div dangerouslySetInnerHTML={{
              __html: (Questiondetailsui.question).replace('contenteditable="true"', 'contenteditable="false"')
            }} />
          </div>
        </section>

        <div className="mt-10">
          {!showAnswerBox && (
            <button
              onClick={handleAnswerClick}
              className="px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700 transition"
            >
              Answer
            </button>
          )}

          {showLoginMsg && (
            <p className="mt-3 text-red-600 font-medium">Please login before answering.</p>
          )}

          {successMsg && (
            <p className="mt-3 text-green-600 font-medium">{successMsg}</p>
          )}

          {showAnswerBox && (
            <div className="mt-6 bg-gradient-to-br from-black via-gray-900 to-cyan-900 p-6 rounded-xl shadow-lg border border-cyan-500/50">
              <label className="block mb-2 text-sm font-medium text-cyan-100">Your Answer</label>
              <Editor
                ref={answerRef}
                readOnly={readOnly}
                defaultValue={new Delta().insert('\n')}
                onSelectionChange={setRange}
                onTextChange={setLastChange}
              />
              <div className="mt-4 flex justify-end gap-3">
                <button
                  onClick={() => setShowAnswerBox(false)}
                  className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={saveAnswers}
                  className="px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700 transition"
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>

        <div>{answersui}</div>
      </div>
    </div>
  );
}
