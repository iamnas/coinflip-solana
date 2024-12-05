'use client'

import { useState, useEffect } from 'react'
import { Connection, PublicKey } from '@solana/web3.js'

export default function WalletConnection() {
  const [connected, setConnected] = useState(false)
  const [publicKey, setPublicKey] = useState<PublicKey | null>(null)

  useEffect(() => {
    const onLoad = async () => {
      await (window as any).solana.connect({ onlyIfTrusted: true })
    }
    window.addEventListener('load', onLoad)
    return () => window.removeEventListener('load', onLoad)
  }, [])

  const connectWallet = async () => {
    try {
      const { solana } = window as any
      if (solana) {
        const response = await solana.connect()
        setPublicKey(response.publicKey)
        setConnected(true)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const disconnectWallet = async () => {
    const { solana } = window as any
    if (solana) {
      await solana.disconnect()
      setPublicKey(null)
      setConnected(false)
    }
  }

  return (
    <div className="mt-8">
      {!connected ? (
        <button
          onClick={connectWallet}
          className="px-6 py-2 bg-yellow-400 text-black font-bold rounded-md border-2 border-yellow-600 hover:bg-yellow-500 transition-colors"
        >
          CONNECT WALLET
        </button>
      ) : (
        <button
          onClick={disconnectWallet}
          className="px-6 py-2 bg-yellow-400 text-black font-bold rounded-md border-2 border-yellow-600 hover:bg-yellow-500 transition-colors"
        >
          DISCONNECT
        </button>
      )}
    </div>
  )
}

