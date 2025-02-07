export type FilterType = 'All' | 'To do' | 'Done';

interface TodoFilterProps {
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
}

const filterOptions: FilterType[] = ['All', 'To do', 'Done'];

export default function TodoFilter({ filter, setFilter }: TodoFilterProps) {
  return (
    <ul className="flex gap-2">
      {filterOptions.map((option) => {
        return (
          <li key={option}>
            <button
              onClick={() => setFilter(option)}
              className={filter === option ? 'bg-[#F86969] text-white' : ''}
            >
              {option}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
