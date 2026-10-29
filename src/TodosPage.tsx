import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { addTodo, deleteTodo, fetchTodos, type Todo } from './api';
import { logout } from './auth';

export default function TodosPage() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [text, setText] = useState('');

  useEffect(() => {
    let cancelled = false;
    fetchTodos().then((loaded) => {
      if (!cancelled) {
        setTodos(loaded);
        setIsLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleAdd(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = text.trim();
    if (!value) {
      return;
    }
    setText('');
    const created = await addTodo(value);
    setTodos((current) => [...current, created]);
  }

  async function handleDelete(id: number) {
    await deleteTodo(id);
    setTodos((current) => current.filter((todo) => todo.id !== id));
  }

  function handleLogout() {
    logout();
    navigate('/', { replace: true });
  }

  return (
    <main className="card">
      <header className="todos-header">
        <h1>My tasks</h1>
        <button type="button" className="secondary" onClick={handleLogout}>
          Log out
        </button>
      </header>

      <form className="add-form" onSubmit={handleAdd}>
        <input
          type="text"
          data-testid="todo-input"
          placeholder="What needs to be done?"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <button type="submit" data-testid="add-button">
          Add
        </button>
      </form>

      {isLoading ? (
        <p className="muted">Loading...</p>
      ) : todos.length === 0 ? (
        <p className="muted">No tasks yet</p>
      ) : (
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} data-testid="todo-item">
              <span>{todo.text}</span>
              <button type="button" className="delete" onClick={() => handleDelete(todo.id)}>
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
