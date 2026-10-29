import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from './auth';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (login(email, password)) {
      navigate('/todos', { replace: true });
    } else {
      setError('Invalid email or password');
    }
  }

  return (
    <main className="card">
      <h1>Sign in</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="email"
            data-testid="email-input"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="username"
          />
        </label>
        <label>
          Password
          <input
            type="password"
            data-testid="password-input"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
          />
        </label>
        {error && <p className="error">{error}</p>}
        <button type="submit" data-testid="login-button">
          Log in
        </button>
      </form>
    </main>
  );
}
