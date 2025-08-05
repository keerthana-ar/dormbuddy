export default function ModeSelector({ mode, setMode }) {
  const modes = [
    { 
      id: "professor", 
      label: "Professor", 
      emoji: "🧑‍🏫", 
      description: "Smart & helpful",
      color: "from-blue-500 to-indigo-600"
    },
    { 
      id: "therapist", 
      label: "Therapist Bro", 
      emoji: "🧘", 
      description: "Chill & supportive",
      color: "from-green-500 to-teal-600"
    },
    { 
      id: "roomie", 
      label: "Chill Roomie", 
      emoji: "😎", 
      description: "Fun & casual",
      color: "from-purple-500 to-pink-600"
    },
  ];

  return (
    <div className="mb-6">
      <p className="text-center text-white/80 text-sm mb-3 font-medium">
        Pick your DormBuddy's personality:
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        {modes.map(m => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={`group relative px-6 py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg ${
              mode === m.id 
                ? `bg-gradient-to-r ${m.color} text-white shadow-xl scale-105` 
                : "bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white"
            }`}
          >
            <div className="flex items-center space-x-2">
              <span className="text-lg">{m.emoji}</span>
              <div className="text-left">
                <div className="font-semibold text-sm">{m.label}</div>
                <div className={`text-xs ${mode === m.id ? 'text-white/80' : 'text-gray-500'}`}>
                  {m.description}
                </div>
              </div>
            </div>
            
            {/* Active indicator */}
            {mode === m.id && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}