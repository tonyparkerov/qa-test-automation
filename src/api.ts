// Fake server API: data lives in tab memory until the page is reloaded.

export interface Todo {
  id: number;
  text: string;
}

const FETCH_DELAY_MS = 1500;
const ADD_DELAY_MS = 800;
const DELETE_DELAY_MS = 500;

let todos: Todo[] = [];
let nextId = 1;

function delay<T>(ms: number, getValue: () => T): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(getValue()), ms);
  });
}

export function fetchTodos(): Promise<Todo[]> {
  return delay(FETCH_DELAY_MS, () => [...todos]);
}

export function addTodo(text: string): Promise<Todo> {
  return delay(ADD_DELAY_MS, () => {
    const todo: Todo = { id: nextId++, text };
    todos = [...todos, todo];
    return todo;
  });
}

export function deleteTodo(id: number): Promise<void> {
  return delay(DELETE_DELAY_MS, () => {
    todos = todos.filter((todo) => todo.id !== id);
  });
}
