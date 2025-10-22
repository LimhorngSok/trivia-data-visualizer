interface CategorySelectorProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

export default function CategorySelector({
  categories,
  selected,
  onSelect,
}: CategorySelectorProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      <button
        onClick={() => onSelect("All")}
        className={`px-3 py-1 rounded ${
          selected === "All" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-3 py-1 rounded ${
            selected === cat ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}