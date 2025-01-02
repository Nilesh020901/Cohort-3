const QuestionList = ({ questions }) => {
    return (
        <div className="mt-4">
            {questions.map((q) => (
                <div
                key={q.id}
                className="flex justify-between items-center p-4 bg-gray-800 text-white mb-2 rounded-md">
                    <p>{q.title}</p>
                    <span className="text-green-400">{ q.difficulty }</span>
                </div>
            ))}
        </div>
    );
};

export default QuestionList;