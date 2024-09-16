import { makeAutoObservable, action } from 'mobx';

class TodoStore {
  todos = [];
  nextId = 1;

  constructor() {
    makeAutoObservable(this, {
      addTodoItem: action,
      removeTodoItem: action,
      completeTodoItem: action,
      updateTodoItem: action,
      highlightEvenItems: action,
      highlightOddItems: action,
      removeFirstTodo: action,
      removeLastTodo: action
    });
  }

  addTodoItem(title) {
    this.todos.push({
      id: this.nextId++,
      title,
      completed: false,
      highlighted: false
    });
  }

  removeTodoItem(id) {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  completeTodoItem(id) {
    const todo = this.todos.find(todo => todo.id === id);
    if (todo) {
      todo.completed = true;
      this.todos = this.todos.filter(todo => todo.id !== id).concat(todo);
    }
  }

  updateTodoItem(id, newTitle) {
    const todo = this.todos.find(todo => todo.id === id);
    if (todo) {
      todo.title = newTitle;
    }
  }

  highlightEvenItems() {
    this.todos = this.todos.map((todo, index) => ({
      ...todo,
      highlighted: index % 2 === 0
    }));
  }

  highlightOddItems() {
    this.todos = this.todos.map((todo, index) => ({
      ...todo,
      highlighted: index % 2 !== 0
    }));
  }

  removeFirstTodo() {
    this.todos.shift();
  }

  removeLastTodo() {
    this.todos.pop();
  }
}

const todoStore = new TodoStore();
export default todoStore;
