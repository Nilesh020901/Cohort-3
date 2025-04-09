let taskIdCounter = 0;

function addTask(targetListId) {
    const taskText = prompt("Enter task text:");
    if (!taskText) return; 

    const task = document.createElement("div");
    task.className = "task";
    task.setAttribute("draggable", "true");
    task.setAttribute("id", `task-${taskIdCounter++}`);

    const textSpan = document.createElement("span");
    textSpan.innerText = taskText;
    textSpan.className = "task-text";

    const editButton = document.createElement("button");
    editButton.innerText = "✏️";
    editButton.className = "edit-button";
    editButton.onclick = () => {
        const newText = prompt("Edit task text:", textSpan.innerText);
        if (newText !== null && newText.trim() !== "") {
            textSpan.innerText = newText;
        }
    };

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "🗑️";
    deleteButton.className = "delete-button";
    deleteButton.onclick = () => {
        if (confirm("Are you sure you want to delete this task?")) {
            task.remove();
        }
    };

    const buttonGroup = document.createElement("div");
    buttonGroup.className = "task-actions";
    buttonGroup.appendChild(editButton);
    buttonGroup.appendChild(deleteButton);

    task.appendChild(textSpan);
    task.appendChild(buttonGroup);

    addDragEvents(task);
    document.getElementById(targetListId).appendChild(task);
}


function addDragEvents(task) {
    task.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", e.target.id);
        setTimeout(() => {
            task.style.display = "none";
        }, 0);
    });

    task.addEventListener("dragend", () => {
        task.style.display = "block";
    })
}

const lists = document.querySelectorAll(".task-list");

lists.forEach((list) => {
    list.addEventListener("dragover", (e) => {
        e.preventDefault();
        list.classList.add("drag-over");
    });

    list.addEventListener("dragleave", () => {
        list.classList.remove("drag-over");
    });
    list.addEventListener("drop", (e) => {
        e.preventDefault();
        list.classList.remove("drag-over");

        const taskId = e.dataTransfer.getData("text/plain");
        const task = document.getElementById(taskId);
        if (task) {
            list.appendChild(task);
        }
    })
})