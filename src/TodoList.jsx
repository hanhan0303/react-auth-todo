import TodoItem from './TodoItem';

// 列表容器
export default function TodoList({ todoList, onChange, onDeleteTodo }) {
  return (
    <>
      <div className="flex w-full flex-col gap-2 p-5 border rounded border-space-secondary-light">
        {todoList &&
          todoList.map((item, index) => {
            return (
              <div key={index}>
                <TodoItem
                  todoItem={item}
                  onChange={onChange}
                  onDeleteTodo={onDeleteTodo}
                />
              </div>
            );
          })}
        {!todoList.length && <p>目前沒有代辦事項</p>}
      </div>
    </>
  );
}
