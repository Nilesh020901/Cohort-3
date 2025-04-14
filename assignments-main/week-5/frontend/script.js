//  start from here
let isSigningUp = false;
let isAddingTodo = false;

// Signup Form Submission
document.getElementById("signup-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    if (isSigningUp) return;
    isSigningUp = true;

    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;

    try {
        const response = await fetch("http://localhost:3000/user/signup", {
            method: "POST",
            headers: {
                "content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });
        const result = await response.json();
        isSigningUp = false;

        if (response.ok) {
            document.getElementById("response-message").innerText = result.message || "Signup successful, please sign in";
            document.getElementById("signup-container").style.display = "none";
            document.getElementById("signin-container").style.display = "block";
        } else {
            document.getElementById("response-message").innerText = result.message || "Signup failed";
        }
    } catch (error) {
        isSigningUp = false;
        document.getElementById("response-message").innerText = "Error during signup";
    }
});

// Signin Form Submission
document.getElementById("signin-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("signin-username").value;
    const password = document.getElementById("signin-password").value;

    try {
        const response = await fetch("http://localhost:3000/user/signin", {
            method: "POST",
            headers: {
                "content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        })
        const result = await response.json();
        if (response.ok) {
            localStorage.setItem("token", result.token);
            document.getElementById("signin-container").style.display = "none";
            document.getElementById("todo-container").style.display = "block";
            document.getElementById("response-message").innerHTML = `Logged in successfully <a href="#" id="logout-link">Logout</a>`;
            loadTodos();

            // Add event listener for the logout link
            document.getElementById("logout-link").addEventListener("click", async (e) => {
                e.preventDefault();
                localStorage.removeItem("token"); // Clear token
                document.getElementById("todo-container").style.display = "none";
                document.getElementById("signin-container").style.display = "block";
                document.getElementById("response-message").innerText = "";
            });
        } else {
            document.getElementById("response-message").innerText = result.message || "signin failed";
        }
    } catch (error) {
        document.getElementById("response-message").innerText = "Error during signin";
    }
});

// Add Todo on Form Submission

document.getElementById("add-todo-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    if (isAddingTodo) return;
    isAddingTodo = true;

    const todoInput = document.getElementById("todo-input");
    const todoText = todoInput.value.trim();
    if (!todoText) {
        isAddingTodo = false;
        return;
    }

    const token = localStorage.getItem("token");

    try {
        const response = await fetch("http://localhost:3000/todo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ text: todoText }),
        });

        const result = await response.json();
        isAddingTodo = false;

        if (response.ok) {
            todoInput.value = ""; // Clear input field
            loadTodos(); // Reload todos
        } else {
            console.error("Error adding todo:", result.message || "Failed to add todo");
        }
    } catch (error) {
        isAddingTodo = false;
        console.error("Error adding todo:", error);
    }
});

// Load Todos
async function loadTodos() {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch("http://localhost:3000/todo", {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        const result = await response.json();
        const todoList = document.getElementById("todo-list");
        todoList.innerHTML = ""; // Clear existing todos

        todos.forEach(todo => {
            const li = document.createElement("li");
            li.innerText = todo.title; // Display todo text
        })

        if (todo.completed) {
            li.style.textDecoration = "line-through"; // Strike through completed todos
        }

        const completeButton = document.createElement("button");
        completeButton.textContent = "Complete";
        completeButton.onclick = () => {
            completeTodo(todo._id, !todo.completed); // Toggle completion status
        };

        if (!todo.completed) {
            li.appendChild(completeButton); // Append button only if not completed
        }

        todoList.appendChild(li); // Append todo item to list
    } catch (error) {
        console.error("Error loading todos:", error);
    }
}

// Complete Todo
async function completeTodo(id, completed) {
    const token = localStorage.getItem("token");
    try {
        await fetch(`http://localhost:3000/todo/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ completed }),
        });
        loadTodos(); // Reload todos after completion'
    } catch (error) {
        console.error("Error completing todo:", error);

    }
}

// Toggle between Signup and Signin
document.getElementById("toggle-signup").addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("signin-container").style.display = "none";
    document.getElementById("signup-container").style.display = "block";
});
document.getElementById("toggle-signin").addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("signup-container").style.display = "none";
    document.getElementById("signin-container").style.display = "block";
});         