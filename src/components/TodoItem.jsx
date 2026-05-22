import { useEffect, useRef, useState } from 'react';

export function TodoItem({ todo, onToggle, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing]);

  const startEdit = () => {
    setDraft(todo.text);
    setEditing(true);
  };

  const commit = () => {
    if (!editing) return;
    setEditing(false);
    onUpdate(todo.id, draft);
  };

  const cancel = () => {
    setDraft(todo.text);
    setEditing(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      commit();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      cancel();
    }
  };

  return (
    <li className={`todo-item ${todo.completed ? 'todo-item--completed' : ''}`}>
      <input
        className="todo-item__checkbox"
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        aria-label={`${todo.text} 완료 표시`}
      />

      {editing ? (
        <input
          ref={inputRef}
          className="todo-item__edit"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onBlur={commit}
          onKeyDown={handleKeyDown}
          aria-label="할 일 수정"
        />
      ) : (
        <span
          className="todo-item__text"
          onDoubleClick={startEdit}
          title="더블 클릭으로 수정"
        >
          {todo.text}
        </span>
      )}

      <div className="todo-item__actions">
        {!editing && (
          <button
            type="button"
            className="todo-item__action"
            onClick={startEdit}
          >
            수정
          </button>
        )}
        <button
          type="button"
          className="todo-item__action todo-item__action--danger"
          onClick={() => onDelete(todo.id)}
        >
          삭제
        </button>
      </div>
    </li>
  );
}
