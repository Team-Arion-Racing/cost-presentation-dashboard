export default function Sidebar({ selected, onSelect }) {
  const systems = [
    { key: "DT", name: "Drive Train" },
    { key: "ET", name: "Engine Transmission" },
  ];

  return (
    <div className="w-60 bg-white p-5 border-r">
      <h2 className="font-semibold mb-4">System Selection</h2>

      {systems.map((sys) => (
        <button
          key={sys.key}
          className={`block w-full text-left p-2 rounded mb-2 ${
            selected === sys.key ? "bg-blue-200" : "bg-gray-100"
          }`}
          onClick={() => onSelect(sys.key)}
        >
          {sys.name}
        </button>
      ))}
    </div>
  );
}
