export default function ResultsTable() {
    const results = [
      { user: '5qmY', amount: 0.01, won: true, time: '1 hour' },
      { user: '5qmY', amount: 0.01, won: false, time: '1 hour' },
      { user: '5qmY', amount: 0.01, won: false, time: '1 hour' },
      { user: '5qmY', amount: 0.01, won: true, time: '1 hour' },
      { user: 'Gaab', amount: 0.05, won: false, time: '7 hours' },
    ]
  
    return (
      <div className="bg-yellow-300 p-6 rounded-3xl border-4 border-yellow-600 w-full max-w-2xl mt-8">
        <h2 className="text-2xl font-bold mb-4 text-center">RESULTS</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">👤</th>
                <th className="px-4 py-2 text-left">💰</th>
                <th className="px-4 py-2 text-left">🏆</th>
                <th className="px-4 py-2 text-left">⏰</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={index} className="border-t border-yellow-400">
                  <td className="px-4 py-2">{result.user}</td>
                  <td className="px-4 py-2">{result.amount.toFixed(2)}</td>
                  <td className="px-4 py-2">{result.won ? '🏆' : '💔'}</td>
                  <td className="px-4 py-2">{result.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
  
  