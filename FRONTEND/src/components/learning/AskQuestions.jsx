import React, { useRef, useState, useEffect } from 'react';
import Editor from './Editor';
import Quill from 'quill';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { API_URL } from '../../Config';
import { addQuestion } from '../../slices/UserquestionSlice';
import { Link } from 'react-router-dom';

const Delta = Quill.import('delta');

export default function AskQuestions() {
    const [range, setRange] = useState();
    const [lastChange, setLastChange] = useState();
    const [readOnly, setReadOnly] = useState(false);
    const quillRef = useRef();
    const titleref = useRef("");
    const categoryref = useRef();
    const [msg, setmsg] = useState(false);
    const user_id = useSelector((store) => store.user.userdata._id);
    const dispatch = useDispatch();
    const [currentEditId, setCurrentEditId] = useState('');
    const [questionList, setQuestionList] = useState([]);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                let res = await axios.get(API_URL + "/userquestion/" + user_id);
                setQuestionList(res.data.data);
            } catch (err) {
                console.log("Error loading questions", err);
            }
        };
        fetchQuestions();
    }, [user_id]);

    const Showdata = async () => {
        const questiontitle = titleref.current.value;
        const question = quillRef.current.container.innerHTML;
        const category = categoryref.current.value;
        const data = { user_id, question, questiontitle, category };

        await axios.post(API_URL + "/userquestion", data)
            .then((d) => {
                setmsg("✅ Question posted successfully!");
                setTimeout(() => setmsg(false), 4000)
                dispatch(addQuestion(d.data.data));
                setQuestionList(prev => [d.data.data, ...prev]);
                resetForm();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const UpdateData = async (id) => {
        const question = quillRef.current.container.innerHTML;
        const category = categoryref.current.value;
        const data = { question, category }
        await axios.put(`${API_URL}/userquestion/${id}`, data)
            .then((d) => {
                setQuestionList((prev) =>
                    prev.map((q) => q._id === id ? { ...q, question, category } : q)
                );
                resetForm();
            })
            .catch((err) => {
                console.log("Error updating question:", err);
            })
    }

    const handleDelete = async (id) => {
        await axios.delete(`${API_URL}/userquestion/${id}`)
            .then((d) => {
                setQuestionList((s) => s.filter((i) => i._id !== id));
            })
            .catch((err) => {
                console.log("Error deleting question:", err);
            })
    }

    const handleEdit = async (question) => {
        titleref.current.value = question.questiontitle;
        titleref.current.disabled = true;
        quillRef.current.container.innerHTML = question.question;
        categoryref.current.value = question.category;
        setCurrentEditId(question._id);
    }

    const resetForm = () => {
        setCurrentEditId("");
        titleref.current.disabled = false;
        titleref.current.value = "";
        // quillRef.current.container.innerHTML=""
        quillRef.current.container.defaultValue=new Delta().insert('\n', { header: 1 }) ;
        // quillRef.current.container.value=""
        // quillRef.current.container.innerHTML=""
        categoryref.current.value = "";
    }

    return (
        <div className="max-w-6xl mx-auto p-6 sm:p-10 text-white">
            {/* Ask Question Card */}
            <div className="backdrop-blur-xl bg-transparent border border-white/20 shadow-2xl rounded-3xl p-6 sm:p-8">
                <h1 className="font-extrabold text-3xl sm:text-4xl mb-6 text-center text-cyan-300">
                    🚀 Ask a Question
                </h1>

                {/* Title */}
                <input
                    type="text"
                    ref={titleref}
                    className="w-full p-3 rounded-xl mb-5 text-base bg-black/40 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-gray-300"
                    placeholder="Enter your question title..."
                />

                {/* Category */}
                <select
                    className="p-3 mb-5 w-full rounded-xl bg-black/40 border border-white/30 text-white focus:ring-2 focus:ring-cyan-400"
                    ref={categoryref}
                >
                    <option value="">Select Category</option>
                    <option value="general">General Discussion</option>
                    <option value="technology">Technology</option>
                    <option value="programming">Programming</option>
                    <option value="gaming">Gaming</option>
                    <option value="education">Education</option>
                    <option value="health">Health & Fitness</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="news">News & Current Events</option>
                    <option value="career">Career & Jobs</option>
                    <option value="feedback">Site Feedback</option>
                </select>

                {/* Editor */}
                <div className="bg-black/40 border border-white/30 rounded-xl overflow-hidden">
                    <Editor
                        ref={quillRef}
                        readOnly={readOnly}
                        defaultValue={new Delta().insert('\n', { header: 1 })}
                        onSelectionChange={setRange}
                        onTextChange={setLastChange}
                    />
                </div>

                {/* Message */}
                {msg && (
                    <div className="text-center mt-4 p-2 rounded-lg bg-green-500/20 text-green-300 font-medium">
                        {msg}
                    </div>
                )}

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
                    {currentEditId ? (
                        <>
                            <button
                                onClick={() => UpdateData(currentEditId)}
                                className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-xl shadow-lg transition font-semibold"
                            >
                                Update Question
                            </button>
                            <button
                                onClick={resetForm}
                                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-xl shadow-lg transition font-semibold"
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={Showdata}
                            className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-xl shadow-lg transition font-semibold"
                        >
                            Submit Question
                        </button>
                    )}
                </div>
            </div>

            {/* Questions Grid */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {questionList.length > 0 ? questionList.map((ques, index) => (
                    <div
                        key={index}
                        className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-5 shadow-lg hover:shadow-2xl hover:scale-95 transition-all"
                    >
                        <Link
                            to={`/Questions_details/${ques._id}`}
                            className="block font-bold text-lg sm:text-xl text-cyan-300 hover:text-cyan-400 mb-2 break-words"
                        >
                            ❓ {ques.questiontitle}
                        </Link>

                        <div className="text-sm text-gray-300 mb-3">🕒 {new Date(ques.postdate).toLocaleString()}</div>

                        <div className="flex justify-between">
                            <button
                                onClick={() => handleEdit(ques)}
                                className="text-cyan-300 hover:text-cyan-400 font-medium"
                            >
                                ✏️ Edit
                            </button>
                            <button
                                onClick={() => handleDelete(ques._id)}
                                className="text-red-400 hover:text-red-500 font-medium"
                            >
                                🗑️ Delete
                            </button>
                        </div>
                    </div>
                )) : (
                    <p className="col-span-full text-gray-400 text-center">No questions yet.</p>
                )}
            </div>
        </div>
    );
}
