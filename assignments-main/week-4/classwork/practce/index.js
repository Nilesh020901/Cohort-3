#!/usr/bin/env node

const { commander, Command } = require('commander');
const fs = require("fs");
const path = require("path");

const program = new Command();
const FILE_PATH = path.join(__dirname, "todo.json");

function loadTodos() {
    if (!fs.existsSync(FILE_PATH)) {
        return [];
    }
    const data = fs.readFileSync(FILE_PATH, "utf-8");
    return JSON.parse(data);
}

function saveTodos(todos) {
    fs.writeFileSync(FILE_PATH, JSON.stringify(todos, null, 2), "utf-8");
}

program
    .name("todo")
    .description("A simple todo list application")
    .version("1.0.0")

program
    .command("add <task>")
    .description("Add a new task")
    .action((task) => {
        const todos = loadTodos();
        todos.push({ text: task, done: false });
        saveTodos(todos);
        console.log('✅ Todo added.');
    });

program
    .command("list")
    .description("List all tasks")
    .action(() => {
        const todos = loadTodos();
        if (todos.length === 0) {
            console.log("No todos found.");
            return;
        }
        todos.forEach((todos, i) => {
            console.log(`${i + 1}. ${todos.text} [${todos.done ? "✓" : "✗"}]`);
        });
    });

program
    .command("delete <index>")
    .description("Delete a task")
    .action((index) => {
        const todos = loadTodos();
        if (index < 1 || index > todos.length) {
            console.log("Invalid index. Please provide a valid task number.");
            return;
        }

        const removedTodo = todos.splice(index - 1, 1)[0];
        saveTodos(todos);
        console.log(`✅ Todo "${removedTodo.text}" deleted.`);
    });


program
    .command("done <index>")
    .description("Mark a task as done")
    .action((index) => {
        const todos = loadTodos();
        if (index < 1 || index > todos.length) {
            console.log("Invalid index. Please provide a valid task number.");
            return;
        }
        todos[index - 1].done = true;
        saveTodos(todos);
        console.log(`✅ Todo "${todos[index - 1].text}" marked as done.`);
    });

program.parse();
