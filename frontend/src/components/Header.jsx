export default function Header() {
  return (
    <div className="text-center py-6 mb-4">
      <div className="inline-flex items-center space-x-3 mb-2">
        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
          <span className="text-2xl">🏠</span>
        </div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          DormBuddy
        </h1>
      </div>
      <p className="text-lg text-white/90 font-medium">
        Your AI college sidekick ✨
      </p>
      <p className="text-sm text-white/70 mt-1">
        Choose your vibe and let's chat!
      </p>
    </div>
  );
}