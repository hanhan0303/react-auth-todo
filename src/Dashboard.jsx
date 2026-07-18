import { useEffect, useMemo, useState } from 'react';
import TodoFilter from './TodoFilter';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import { TODO_ITEM_FILTER } from './constants';
import { todoService } from './api';
import TodoTitle from './TodoTitle';

export default function Dashboard() {
  const [todoList, setTodoList] = useState([]);
  const [activeFilter, setActiveFilter] = useState(TODO_ITEM_FILTER.ALL);
  const [isLoading, setIsLoading] = useState(false);

  const addNewTodo = async (todoTitle) => {
    const todoData = {
      title: todoTitle,
    };

    try {
      const res = await todoService.create(todoData);
      console.log('新增todo成功，後端回傳：', res);

      setTodoList((prevList) => [...prevList, res]);
    } catch (error) {
      console.log('新增失敗', error);
    }
  };

  const handleTodoCompleted = async (id, completed) => {
    if (isLoading) return;
    setIsLoading(true);
    const todoData = { completed: completed };
    try {
      const res = await todoService.update(id, todoData);
      console.log('切換completed成功', res);
    } catch (err) {
      console.log('變更失敗', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTodoItemChange = (id, updatedFields) => {
    const newTodoList = [...todoList];
    const index = newTodoList.findIndex((todo) => {
      return todo.id === id;
    });
    if (index === -1) return;
    const todo = newTodoList[index];
    const newTodo = {
      ...todo,
      ...updatedFields,
    };
    newTodoList[index] = newTodo;
    setTodoList(newTodoList);
    if ('completed' in updatedFields) {
      handleTodoCompleted(id, updatedFields.completed);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      const res = await todoService.delete(id);
      console.log('刪除成功', res);
    } catch (err) {
      console.log('刪除失敗', err);
    }
  };

  const deleteTodoItem = (id) => {
    const newTodoList = todoList.filter((todo) => {
      return todo.id !== id;
    });
    setTodoList(newTodoList);
    handleDeleteTodo(id);
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const incompleteCount = useMemo(() => {
    return todoList.filter((todo) => !todo.completed).length;
  }, [todoList]);

  const filteredTodoList = useMemo(() => {
    switch (activeFilter) {
      case TODO_ITEM_FILTER.COMPLETED:
        return todoList.filter((todo) => todo.completed);
      case TODO_ITEM_FILTER.INCOMPLETE:
        return todoList.filter((todo) => !todo.completed);
      case TODO_ITEM_FILTER.ALL:
      default:
        return todoList;
    }
  }, [todoList, activeFilter]);

  useEffect(() => {
    const loadData = async () => {
      const data = await todoService.getAll();
      setTodoList(data);
    };
    loadData();
  }, []);
  return (
    <>
      <TodoTitle />
      <section className="flex flex-col items-center gap-3 py-5">
        <TodoInput onAddTodo={addNewTodo} isLoading={isLoading} />
        <TodoFilter onFilterChange={handleFilterChange} filter={activeFilter} />
        <TodoList
          todoList={filteredTodoList}
          onChange={handleTodoItemChange}
          onDeleteTodo={deleteTodoItem}
        />
        <div className="flex justify-end w-full text-ring">
          <p>還有{incompleteCount}項未完成的任務</p>
        </div>
      </section>
    </>
  );
}
