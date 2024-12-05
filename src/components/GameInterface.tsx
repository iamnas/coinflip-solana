'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function GameInterface() {
  const [betSide, setBetSide] = useState<'HEADS' | 'TAILS' | null>(null)
  const [betAmount, setBetAmount] = useState<number | null>(null)

  const betAmounts = [0.01, 0.02, 0.05, 0.10, 0.25, 0.50, 1, 2]

  const handleFlip = () => {
    if (betSide && betAmount) {
      // Here you would implement the actual betting logic
      console.log(`Flipping coin for ${betSide} with ${betAmount} SOL`)
    }
  }

  return (
    <div className="bg-yellow-300 p-8 rounded-3xl border-4 border-yellow-600 w-full max-w-2xl">
      <div className="flex flex-col items-center space-y-6">
        <Image src="/placeholder.svg" alt="Solana Coin" width={100} height={100} className="rounded-full" />
        <h2 className="text-2xl font-bold">I PICK</h2>
        <div className="flex space-x-4">
          {['HEADS', 'TAILS'].map((side) => (
            <button
              key={side}
              onClick={() => setBetSide(side as 'HEADS' | 'TAILS')}
              className={`px-6 py-2 rounded-md font-bold ${
                betSide === side ? 'bg-yellow-500 text-white' : 'bg-yellow-400 text-black'
              } border-2 border-yellow-600 hover:bg-yellow-500 transition-colors`}
            >
              {side}
            </button>
          ))}
        </div>
        <h2 className="text-2xl font-bold">FOR</h2>
        <div className="grid grid-cols-3 gap-4">
          {betAmounts.map((amount) => (
            <button
              key={amount}
              onClick={() => setBetAmount(amount)}
              className={`px-4 py-2 rounded-md font-bold ${
                betAmount === amount ? 'bg-yellow-500 text-white' : 'bg-yellow-400 text-black'
              } border-2 border-yellow-600 hover:bg-yellow-500 transition-colors`}
            >
              {amount.toFixed(2)}
            </button>
          ))}
        </div>
        <button
          onClick={handleFlip}
          disabled={!betSide || !betAmount}
          className="px-8 py-3 bg-yellow-500 text-white font-bold rounded-md border-2 border-yellow-600 hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          FLIP
        </button>
      </div>
    </div>
  )
}

