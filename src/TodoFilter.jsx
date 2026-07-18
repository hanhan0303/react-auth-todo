import { TODO_ITEM_FILTER } from './constants';
import { cn } from './lib/utils';

function TodoFilterItem({ text, onClick, selectedItem }) {
  const isSelected = selectedItem === text;

  return (
    <li>
      <button
        type="button"
        className={cn(
          'rounded-3xl border border-border text-ring py-1 cursor-pointer min-w-[80px] text-center transition-all duration-150',

          {
            'bg-primary text-primary-foreground': isSelected,
          },
        )}
        onClick={() => onClick(text)}
      >
        {text}
      </button>
    </li>
  );
}

// 全部/未完成/已完成的切換 Tab & 清除按鈕
export default function TodoFilter({ onFilterChange, filter }) {
  return (
    <>
      <ul className="flex justify-center items-center gap-2 w-full">
        <TodoFilterItem
          text={TODO_ITEM_FILTER.ALL}
          onClick={onFilterChange}
          selectedItem={filter}
        />
        <TodoFilterItem
          text={TODO_ITEM_FILTER.COMPLETED}
          onClick={onFilterChange}
          selectedItem={filter}
        />
        <TodoFilterItem
          text={TODO_ITEM_FILTER.INCOMPLETE}
          onClick={onFilterChange}
          selectedItem={filter}
        />
      </ul>
    </>
  );
}
