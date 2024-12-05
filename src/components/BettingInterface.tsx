'use client'

import { useState } from 'react'
import CoinFlip from './CoinFlip'

export default function BettingInterface() {
  const [betAmount, setBetAmount] = useState(0.1)
  const [betSide, setBetSide] = useState<'heads' | 'tails'>('heads')
  const [isFlipping, setIsFlipping] = useState(false)
  const [result, setResult] = useState<'heads' | 'tails' | null>(null)

  const placeBet = async () => {
    setIsFlipping(true)
    // Here you would integrate with Solana to process the bet
    // For now, we'll just simulate the flip
    setTimeout(() => {
      const flipResult = Math.random() < 0.5 ? 'heads' : 'tails'
      setResult(flipResult)
      setIsFlipping(false)
    }, 3000)
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="betAmount">
          Bet Amount (SOL)
        </label>
        <input
          id="betAmount"
          type="number"
          value={betAmount}
          onChange={(e) => setBetAmount(parseFloat(e.target.value))}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          step="0.1"
          min="0.1"
        />
      </div>
      <div className="mb-4">
        <span className="text-gray-700 text-sm font-bold mb-2">Choose Side</span>
        <div className="mt-2">
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio"
              name="betSide"
              value="heads"
              checked={betSide === 'heads'}
              onChange={() => setBetSide('heads')}
            />
            <span className="ml-2">Heads</span>
          </label>
          <label className="inline-flex items-center ml-6">
            <input
              type="radio"
              className="form-radio"
              name="betSide"
              value="tails"
              checked={betSide === 'tails'}
              onChange={() => setBetSide('tails')}
            />
            <span className="ml-2">Tails</span>
          </label>
        </div>
      </div>
      <button
        onClick={placeBet}
        disabled={isFlipping}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        {isFlipping ? 'Flipping...' : 'Flip Coin'}
      </button>
      {isFlipping && <CoinFlip />}
      {result && (
        <div className="mt-4 text-center">
          <p className="text-xl font-bold">Result: {result}</p>
          <p className="text-lg">
            {result === betSide ? 'You won!' : 'You lost.'} {result === betSide ? betAmount : -betAmount} SOL
          </p>
        </div>
      )}
    </div>
  )
}

