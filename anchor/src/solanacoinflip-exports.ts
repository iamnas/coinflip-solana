// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import SolanacoinflipIDL from '../target/idl/solanacoinflip.json'
import type { Solanacoinflip } from '../target/types/solanacoinflip'

// Re-export the generated IDL and type
export { Solanacoinflip, SolanacoinflipIDL }

// The programId is imported from the program IDL.
export const SOLANACOINFLIP_PROGRAM_ID = new PublicKey(SolanacoinflipIDL.address)

// This is a helper function to get the Solanacoinflip Anchor program.
export function getSolanacoinflipProgram(provider: AnchorProvider) {
  return new Program(SolanacoinflipIDL as Solanacoinflip, provider)
}

// This is a helper function to get the program ID for the Solanacoinflip program depending on the cluster.
export function getSolanacoinflipProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the Solanacoinflip program on devnet and testnet.
      return new PublicKey('CounNZdmsQmWh7uVngV9FXW2dZ6zAgbJyYsvBpqbykg')
    case 'mainnet-beta':
    default:
      return SOLANACOINFLIP_PROGRAM_ID
  }
}
