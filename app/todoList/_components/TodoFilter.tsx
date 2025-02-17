export type FilterType = 'All' | 'To do' | 'Done';

interface TodoFilterProps {
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
}

const filterOptions: FilterType[] = ['All', 'To do', 'Done'];

export default function TodoFilter({ filter, setFilter }: TodoFilterProps) {
  return (
    <ul className="mb-6 flex gap-[6px]">
      {filterOptions.map((option) => {
        return (
          <li key={option}>
            <button
              onClick={() => setFilter(option)}
              className={`rounded-[20px] px-4 py-[6px] hover:opacity-70 ${filter === option ? 'bg-[#FFF0F0] text-[#F86969]' : 'border border-[#F2EFEF] text-[#C0C0C0]'}`}
            >
              {option}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
