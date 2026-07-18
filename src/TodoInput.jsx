import { useState } from 'react';

// 輸入框與新增按鈕
export default function TodoInput({ onAddTodo, isLoading }) {
  const [todoText, setTodoText] = useState('');

  const handleSubmit = () => {
    if (!todoText.trim()) return;
    onAddTodo(todoText.trim());
    setTodoText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };
  const handleAddButton = () => {
    handleSubmit();
  };

  return (
    <>
      <div className="flex items-center mx-3 w-full gap-3 ">
        <div className="flex-1 border border-space-secondary-dark rounded cursor-pointer p-3 ">
          <input
            type="text"
            className="outline-0 w-full"
            value={todoText}
            disabled={isLoading}
            onChange={(e) => {
              setTodoText(e.target.value);
            }}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <button
            type="button"
            className="cursor-pointer border border-space-secondary-dark rounded p-3 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!todoText.trim()}
            onClick={handleAddButton}
          >
            新增
          </button>
        </div>
      </div>

      <div className="w-full text-center">
        <p
          className={` text-primary-foreground ${todoText.trim() ? 'opacity-0' : 'opacity-100'}`}
        >
          **請輸入代辦事項**
        </p>
      </div>
    </>
  );
}
