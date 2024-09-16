'use client'
import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import todoStore from './store/TodoStore';

const TodoList = observer(() => {
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim()) {
      todoStore.addTodoItem(newTodo);
      setNewTodo('');
    }
  };

  const handleComplete = (id) => {
    todoStore.completeTodoItem(id);
  };

  const handleRemove = (id) => {
    todoStore.removeTodoItem(id);
  };

  const highlightEven = () => {
    todoStore.highlightEvenItems();
  };

  const highlightOdd = () => {
    todoStore.highlightOddItems();
  };

  const removeFirst = () => {
    todoStore.removeFirstTodo();
  };

  const removeLast = () => {
    todoStore.removeLastTodo();
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Добавить новое"
      />
      <button onClick={addTodo}>Добавить</button>

      <ul>
        {todoStore.todos.map((todo, index) => (
          <li
            key={todo.id}
            style={{
              textDecoration: todo.completed ? 'line-through' : 'none',
              backgroundColor: todo.highlighted ? '#f0f0f0' : 'white',
            }}
          >
            {todo.title}
            <button onClick={() => handleComplete(todo.id)}>Выполнено</button>
            <button onClick={() => handleRemove(todo.id)}>Удалить</button>
          </li>
        ))}
      </ul>

      <div>
        <button onClick={highlightEven}>Четные</button>
        <button onClick={highlightOdd}>Нечетные</button>
        <button onClick={removeFirst}>Удалить первое</button>
        <button onClick={removeLast}>Удалить последнее</button>
      </div>
    </div>
  );
});

export default TodoList;
