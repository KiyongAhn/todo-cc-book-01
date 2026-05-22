import { useEffect, useState } from 'react';

const STORAGE_KEY = 'todo-cc-book-01:todos';

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function newId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function useTodos() {
  const [todos, setTodos] = useState(loadInitial);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch {
      // localStorage 사용 불가 환경(예: 시크릿 모드 일부)에서는 무시
    }
  }, [todos]);

  const addTodo = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setTodos((prev) => [
      ...prev,
      {
        id: newId(),
        text: trimmed,
        completed: false,
        createdAt: Date.now(),
      },
    ]);
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const updateTodo = (id, text) => {
    const trimmed = text.trim();
    if (!trimmed) {
      // 빈 값으로 수정 시 삭제 — TodoMVC 관례
      setTodos((prev) => prev.filter((t) => t.id !== id));
      return;
    }
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: trimmed } : t)),
    );
  };

  return { todos, addTodo, toggleTodo, deleteTodo, updateTodo };
}
