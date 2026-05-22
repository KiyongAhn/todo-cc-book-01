import { TodoItem } from './TodoItem.jsx';

const EMPTY_MESSAGE = {
  all: '아직 할 일이 없습니다. 위에서 추가해 보세요.',
  active: '진행 중인 할 일이 없습니다.',
  completed: '완료된 할 일이 없습니다.',
};

export function TodoList({ todos, onToggle, onDelete, onUpdate, filter }) {
  if (todos.length === 0) {
    return <p className="todo-list__empty">{EMPTY_MESSAGE[filter] ?? EMPTY_MESSAGE.all}</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  );
}
