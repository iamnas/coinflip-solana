import * as anchor from '@coral-xyz/anchor'
import {Program} from '@coral-xyz/anchor'
import {Keypair} from '@solana/web3.js'
import {Solanacoinflip} from '../target/types/solanacoinflip'

describe('solanacoinflip', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.Solanacoinflip as Program<Solanacoinflip>

  const solanacoinflipKeypair = Keypair.generate()

  it('Initialize Solanacoinflip', async () => {
    await program.methods
      .initialize()
      .accounts({
        solanacoinflip: solanacoinflipKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([solanacoinflipKeypair])
      .rpc()

    const currentCount = await program.account.solanacoinflip.fetch(solanacoinflipKeypair.publicKey)

    expect(currentCount.count).toEqual(0)
  })

  it('Increment Solanacoinflip', async () => {
    await program.methods.increment().accounts({ solanacoinflip: solanacoinflipKeypair.publicKey }).rpc()

    const currentCount = await program.account.solanacoinflip.fetch(solanacoinflipKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Increment Solanacoinflip Again', async () => {
    await program.methods.increment().accounts({ solanacoinflip: solanacoinflipKeypair.publicKey }).rpc()

    const currentCount = await program.account.solanacoinflip.fetch(solanacoinflipKeypair.publicKey)

    expect(currentCount.count).toEqual(2)
  })

  it('Decrement Solanacoinflip', async () => {
    await program.methods.decrement().accounts({ solanacoinflip: solanacoinflipKeypair.publicKey }).rpc()

    const currentCount = await program.account.solanacoinflip.fetch(solanacoinflipKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Set solanacoinflip value', async () => {
    await program.methods.set(42).accounts({ solanacoinflip: solanacoinflipKeypair.publicKey }).rpc()

    const currentCount = await program.account.solanacoinflip.fetch(solanacoinflipKeypair.publicKey)

    expect(currentCount.count).toEqual(42)
  })

  it('Set close the solanacoinflip account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        solanacoinflip: solanacoinflipKeypair.publicKey,
      })
      .rpc()

    // The account should no longer exist, returning null.
    const userAccount = await program.account.solanacoinflip.fetchNullable(solanacoinflipKeypair.publicKey)
    expect(userAccount).toBeNull()
  })
})
