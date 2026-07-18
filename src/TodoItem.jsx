import { RiDeleteBinLine } from 'react-icons/ri';
import { FaRegCircleCheck, FaRegCircleXmark } from 'react-icons/fa6';
import { useCallback, useEffect, useRef, useState } from 'react';
import { todoService } from './api';

// 單一任務：包含 Checkbox、文字、刪除按鈕
export default function TodoItem({ todoItem, onChange, onDeleteTodo }) {
  const [isEdit, setIsEdit] = useState(false);
  const [newTitle, setNewTitle] = useState(todoItem.title);
  const createdTime = new Date(todoItem.createdAt).toLocaleString();

  const inputRef = useRef(null);

  const [prevTitle, setPrevTitle] = useState(todoItem.title);

  if (todoItem.title !== prevTitle) {
    setNewTitle(todoItem.title);
    setPrevTitle(todoItem.title);
  }

  const handleCancelEdit = useCallback(() => {
    setNewTitle(todoItem.title);
    setIsEdit(false);
  }, [todoItem.title]);

  const updateTodoTitle = async (id, title) => {
    if (title === todoItem.title) {
      setIsEdit(false);
      return;
    }
    const todoData = { title: title };
    try {
      const res = await todoService.update(id, todoData);
      console.log('編輯成功', res);
      onChange(id, { title: title });
    } catch (err) {
      console.log('編輯失敗', err);
      // 失敗時還原成舊的值
      setNewTitle(todoItem.title);
    } finally {
      setIsEdit(false);
    }
  };

  const handleKeyDown = (id, title, e) => {
    if (e.key === 'Escape') {
      handleCancelEdit();
      e.target.blur();
    }
    if (e.key === 'Enter') {
      updateTodoTitle(id, title);
      e.target.blur();
    }
  };

  useEffect(() => {
    const clickOutside = (e) => {
      if (isEdit && inputRef.current && !inputRef.current.contains(e.target)) {
        handleCancelEdit();
      }
    };

    if (isEdit) {
      document.addEventListener('mousedown', clickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, [isEdit, handleCancelEdit]);

  return (
    <div className="flex gap-2 py-2 px-3 items-center border rounded-2xl border-border group">
      <div>
        <input
          type="checkbox"
          checked={todoItem.completed}
          onChange={(e) => {
            onChange(todoItem.id, { completed: e.target.checked });
          }}
        />
      </div>
      <div
        className={`md:flex-1 gap-2 flex justify-between items-center${todoItem.completed ? 'opacity-50' : ''}`}
      >
        <div className="flex justify-between items-center gap-2" ref={inputRef}>
          <input
            type="text"
            className={` ${todoItem.completed ? 'line-through' : ''}`}
            value={newTitle}
            disabled={todoItem.completed}
            onChange={(e) => {
              setNewTitle(e.target.value);
            }}
            onKeyDown={(e) => {
              handleKeyDown(todoItem.id, newTitle, e);
            }}
            onClick={() => {
              if (!todoItem.completed) setIsEdit(true);
            }}
          />
          {isEdit ? (
            <div className="flex justify-between items-center gap-2 cursor-pointer text-xl md:flex-row flex-col">
              <FaRegCircleCheck
                className="text-green-600"
                onClick={() => {
                  updateTodoTitle(todoItem.id, newTitle);
                }}
              />
              <FaRegCircleXmark
                className="text-red-500"
                onClick={handleCancelEdit}
              />
            </div>
          ) : (
            <></>
          )}
        </div>

        <p className="text-gray-700 text-sm hidden md:inline-block">
          {todoItem.createdAt ? createdTime : '載入中...'}
        </p>
      </div>
      <div className="flex items-center justify-center md:opacity-0 md:group-hover:opacity-100 active:scale-90 transition-transform duration-150">
        <button
          type="button"
          className="cursor-pointer"
          onClick={() => {
            onDeleteTodo(todoItem.id);
          }}
        >
          <RiDeleteBinLine className="text-destructive text-2xl" />
        </button>
      </div>
    </div>
  );
}
