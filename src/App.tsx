import type { ReactNode } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { isAuthenticated } from './auth';
import LoginPage from './LoginPage';
import TodosPage from './TodosPage';

function RequireAuth({ children }: { children: ReactNode }) {
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/todos"
        element={
          <RequireAuth>
            <TodosPage />
          </RequireAuth>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
