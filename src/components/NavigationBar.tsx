export default function NavigationBar() {
    return (
      <nav className="w-full flex justify-center space-x-4 mb-8">
        {['ABOUT', 'HOW TO PLAY', 'DEPOSIT', 'WITHDRAW'].map((item) => (
          <button
            key={item}
            className="px-4 py-2 bg-yellow-400 text-black font-bold rounded-md border-2 border-yellow-600 hover:bg-yellow-500 transition-colors"
          >
            {item}
          </button>
        ))}
      </nav>
    )
  }
  
  