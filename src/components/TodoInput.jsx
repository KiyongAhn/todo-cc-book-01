import { useState } from 'react';

export function TodoInput({ onAdd }) {
  const [text, setText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!text.trim()) return;
    onAdd(text);
    setText('');
  };

  return (
    <form className="todo-input" onSubmit={handleSubmit}>
      <input
        className="todo-input__field"
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="할 일을 입력하세요"
        aria-label="새 할 일"
        autoFocus
      />
      <button
        className="todo-input__submit"
        type="submit"
        disabled={!text.trim()}
      >
        추가
      </button>
    </form>
  );
}
