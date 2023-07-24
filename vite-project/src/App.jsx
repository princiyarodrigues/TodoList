import './Styles.css';
import { useState, useEffect } from 'react';

export default function App() {
  const [newItem, setNewItem] = useState('');
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  function handleSubmit(e) {
    e.preventDefault();

    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        { id: todos.length, title: newItem, completed: false },
      ];
    });
    setNewItem('');
  }

  function toggleTodo(id, completed) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }
        return todo;
      });
    });
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <form onSubmit={handleSubmit} className='new-item-form'>
        <div className='form-row'>
          <label>New Item</label>
          <input
            value={newItem}
            required
            onChange={(e) => setNewItem(e.target.value)}
            type='text'
            id='item'
          />
        </div>
        <button className='btn'>Add</button>
      </form>
      <h1 className='header'>Todo List</h1>
      <ul className='list'>
        {todos.length === 0 && <p>No Todos</p>}
        {todos.map((todo) => (
          <li key={todo.id}>
            <label>
              <input
                type='checkbox' 
                checked = {todo.completed}
                onChange={(e) => toggleTodo(todo.id, e.target.checked)}
              />
              {todo.title}
            </label>
            <button
              onClick={() => deleteTodo(todo.id)}
              className='btn btn-danger'
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

