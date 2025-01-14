import React from "react";

const questions = [
    { id: 14, title: "Longest Common Prefix", difficulty: "Easy" },
    { id: 217, title: "Contains Duplicate", difficulty: "Easy" },
    { id: 125, title: "Valid Palindrom", difficulty: "Easy" },
    { id: 26, title: "Remove Duplicates from Shorted Array", difficulty: "Easy" },
    { id: 66, title: "Plus One", difficulty: "Easy" },
    { id: 136, title: "Single Number", difficulty: "Easy" },
    { id: 121, title: "Best time to Buy and Sell", difficulty: "Easy" },
    { id: 88, title: "Merge Sorted Array", difficulty: "Easy" },
    { id: 69, title: "Sqrt(x)", difficulty: "Easy" },
    { id: 206, title: "Reverse Linked List", difficulty: "Easy" },
    { id: 141, title: "Linked List Cycle", difficulty: "Easy" },
];

const QuestionList = () => {
    return (
        <div className="p-3">
            {questions.map((q, index) => (
                <div key={q.id} className={`flex justify-between py-3 px-8 rounded-lg ${
                    index % 2 === 0 ? 'bg-black-800' : 'bg-black-900'
                }`}>
                    <span className="flex  justify-center items-center gap-4">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 text-green-500">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                        </span>
                        <span className="text-neutral-100 font-medium">{q.id}. {q.title}</span>
                    </span>
                    <span className="text-cyan-900 font-medium">{q.difficulty}</span>
                </div>
            ))}
        </div>
    )
}
export default QuestionList;