export default function ModeSelector({ mode, setMode }) {
  const modes = [
    { id: "professor", label: "🧑‍🏫 Professor" },
    { id: "therapist", label: "🧘 Therapist Bro" },
    { id: "roomie", label: "😎 Chill Roomie" },
  ];
  return (
    <div className="flex justify-center gap-4 mb-4">
      {modes.map(m => (
        <button
          key={m.id}
          onClick={() => setMode(m.id)}
          className={`px-4 py-2 rounded-full transition ${
            mode === m.id ? "bg-purple-600 text-white" : "bg-white"
          }`}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}
