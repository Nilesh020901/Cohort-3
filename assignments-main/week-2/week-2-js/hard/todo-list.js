/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
*/

class Todo {
  constructor() {
    this.todos = [];
  }

  //Add todo
  add(todo) {
    this.todos.push(todo);
  }

  //remove todo
  remove(indexOfTodo) {
    if (indexOfTodo >= 0 && indexOfTodo < this.todos.length) {
      this.todos.splice(indexOfTodo, 1);
    }
    else {
      console.log('Todo not found');
    }
  }

  //update todos
  update(index, updatedTodo) {
    if (index >= 0 && index < this.todos.length) {
      this.todos[index] = updatedTodo;
    }
    else {
      console.log('Todo not found');
    }
  }

  //all todos
  getAll() {
    return this.todos;
  }

  //get index of todos
  get(indexOfTodo) {
    if (indexOfTodo >= 0 && indexOfTodo < this.todos.length) {
      return this.todos[indexOfTodo];
    }
    else {
      console.log('Todo not found');
      return null;
    }
  }

  //clear todos
  clear() {
    return this.todos = [];
  }

}

module.exports = Todo;
