const fs = require('fs');
const { Command } = require('commander');
const program = new Command();

// File path for todos.json
const todosFilePath = './todos.json';

// Read todos from file
const readTodos = () => {
  try {
    const data = fs.readFileSync(todosFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.log('Error reading todos:', error.message);
    return [];
  }
};

// Function to write todos to the file
const writeTodos = (todos) => {
  try {
    const data = JSON.stringify(todos, null, 2);
    fs.writeFileSync(todosFilePath, data, 'utf-8');
  } catch (error) {
    console.log('Error writing todos:', error.message);
  }
};

// Add a todo
program
  .command('add <task>')
  .description('add a new todo')
  .action((task) => {
    const todos = readTodos();
    todos.push({ task, done: false });
    writeTodos(todos);
    console.log(`Added todo: "${task}"`);
  });

// Delete a todo
program
  .command('delete <index>')
  .description('delete a todo')
  .action((index) => {
    const todos = readTodos();
    const idx = parseInt(index, 10);
    if (idx >= 0 && idx < todos.length) {
      const deleted = todos.splice(idx, 1);
      writeTodos(todos);
      console.log(`Deleted todo: "${deleted[0].task}"`);
    } else {
      console.error('Invalid index');
    }
  });

// Mark a todo as done
program
  .command('done <index>')
  .description('mark a todo as done')
  .action((index) => {
    const todos = readTodos();
    const idx = parseInt(index, 10);
    if (idx >= 0 && idx < todos.length) {
      todos[idx].done = true;
      writeTodos(todos);
      console.log(`Marked todo as done: "${todos[idx].task}"`);
    } else {
      console.error('Invalid index');
    }
  });

// List all todos
program
  .command('list')
  .description('list all todos')
  .action(() => {
    const todos = readTodos();
    if (todos.length === 0) {
      console.log('No todos');
    } else {
      todos.forEach((todo, index) => {
        console.log(`${index}: [${todo.done ? '✓' : ' '}] ${todo.task}`);
      });
    }
  });

// Parse the command-line arguments
program.parse(process.argv);
