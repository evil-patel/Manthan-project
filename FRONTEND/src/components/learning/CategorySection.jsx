import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../Config";

export default function CategorySection({ onCategoryClick }) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios
            .get(`${API_URL}/userquestion/distinct-categories`)
            .then((res) => {
                setCategories(res.data.data); // array of { _id, count }
            })
            .catch((err) => {
                console.error("Error loading categories", err);
            });
    }, []);

    return (
        <div className="w-full">
            <ul className="flex flex-col gap-3">
                {categories.map((cat, index) => (
                    <li
                        key={index}
                        onClick={() => onCategoryClick(cat._id)}
                        className="flex justify-between items-center p-3
                                   bg-white/5 backdrop-blur-md rounded-xl
                                   border border-cyan-400/20 
                                   hover:border-cyan-400/70 hover:scale-[0.95]
                                   cursor-pointer transition-all duration-300"
                    >
                        <span className="font-medium text-cyan-300 uppercase tracking-wide">
                            {cat._id}
                        </span>
                        <span className="text-sm bg-cyan-400/20 text-cyan-200 px-3 py-1 rounded-full">
                            {cat.count}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
