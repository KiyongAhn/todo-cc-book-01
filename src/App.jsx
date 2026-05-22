import { useMemo, useState } from 'react';
import { useTodos } from './hooks/useTodos.js';
import { TodoInput } from './components/TodoInput.jsx';
import { FilterBar } from './components/FilterBar.jsx';
import { TodoList } from './components/TodoList.jsx';
import './App.css';

export function App() {
  const { todos, addTodo, toggleTodo, deleteTodo, updateTodo } = useTodos();
  const [filter, setFilter] = useState('all');

  const stats = useMemo(
    () => ({
      total: todos.length,
      active: todos.filter((t) => !t.completed).length,
      completed: todos.filter((t) => t.completed).length,
    }),
    [todos],
  );

  const visibleTodos = useMemo(() => {
    if (filter === 'active') return todos.filter((t) => !t.completed);
    if (filter === 'completed') return todos.filter((t) => t.completed);
    return todos;
  }, [todos, filter]);

  return (
    <div className="app">
      <header className="app__header">
        <h1>할 일</h1>
      </header>

      <main className="app__main">
        <TodoInput onAdd={addTodo} />
        <FilterBar filter={filter} onChange={setFilter} stats={stats} />
        <TodoList
          todos={visibleTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onUpdate={updateTodo}
          filter={filter}
        />
      </main>
    </div>
  );
}
