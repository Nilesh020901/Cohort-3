import { useState } from "react";

function TodoApp() {
    const [task, setTask] = useState("");
    const [todos, setTodos] = useState([]);

    const handleChange = (e) => {
        setTask(e.target.value);
    }

    const handleAdd = () => {
        if (task.trim() === "") {
            alert("Please enter the task")
            return;
        }

        setTodos([...todos, task]); // purane todos + naya task
        setTask(""); // input clear
    }

    const handleDelete = (idxToRemove) => {
        const filtered = todos.filter((_, idx) => idx !== idxToRemove);
        setTodos(filtered);
    }
    return (
        <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center" }}>
            <h2>📝 Todo List</h2>
            <input 
                type="text" 
                placeholder="Enter a task"
                value={task}
                onChange={handleChange}
            />

            <button onClick={handleAdd}>Add</button>

            <ul style={{ textAlign: "left" }}>
                {todos.length === 0 ? (
                    <p>No tasks yet 😴</p>
                ) : (
                    todos.map((todo, idx) => {
                        <li key={idx}>
                            {todo}
                            <button onClick={() => handleDelete(idx)} style={{ marginLeft: "10px"}}>❌</button>
                        </li>
                    })
                )}
            </ul>
        </div>
    );
}

export default TodoApp;