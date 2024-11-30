'use client'

import {getSolanacoinflipProgram, getSolanacoinflipProgramId} from '@project/anchor'
import {useConnection} from '@solana/wallet-adapter-react'
import {Cluster, Keypair, PublicKey} from '@solana/web3.js'
import {useMutation, useQuery} from '@tanstack/react-query'
import {useMemo} from 'react'
import toast from 'react-hot-toast'
import {useCluster} from '../cluster/cluster-data-access'
import {useAnchorProvider} from '../solana/solana-provider'
import {useTransactionToast} from '../ui/ui-layout'

export function useSolanacoinflipProgram() {
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  const programId = useMemo(() => getSolanacoinflipProgramId(cluster.network as Cluster), [cluster])
  const program = getSolanacoinflipProgram(provider)

  const accounts = useQuery({
    queryKey: ['solanacoinflip', 'all', { cluster }],
    queryFn: () => program.account.solanacoinflip.all(),
  })

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  const initialize = useMutation({
    mutationKey: ['solanacoinflip', 'initialize', { cluster }],
    mutationFn: (keypair: Keypair) =>
      program.methods.initialize().accounts({ solanacoinflip: keypair.publicKey }).signers([keypair]).rpc(),
    onSuccess: (signature) => {
      transactionToast(signature)
      return accounts.refetch()
    },
    onError: () => toast.error('Failed to initialize account'),
  })

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    initialize,
  }
}

export function useSolanacoinflipProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const { program, accounts } = useSolanacoinflipProgram()

  const accountQuery = useQuery({
    queryKey: ['solanacoinflip', 'fetch', { cluster, account }],
    queryFn: () => program.account.solanacoinflip.fetch(account),
  })

  const closeMutation = useMutation({
    mutationKey: ['solanacoinflip', 'close', { cluster, account }],
    mutationFn: () => program.methods.close().accounts({ solanacoinflip: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accounts.refetch()
    },
  })

  const decrementMutation = useMutation({
    mutationKey: ['solanacoinflip', 'decrement', { cluster, account }],
    mutationFn: () => program.methods.decrement().accounts({ solanacoinflip: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const incrementMutation = useMutation({
    mutationKey: ['solanacoinflip', 'increment', { cluster, account }],
    mutationFn: () => program.methods.increment().accounts({ solanacoinflip: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const setMutation = useMutation({
    mutationKey: ['solanacoinflip', 'set', { cluster, account }],
    mutationFn: (value: number) => program.methods.set(value).accounts({ solanacoinflip: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  return {
    accountQuery,
    closeMutation,
    decrementMutation,
    incrementMutation,
    setMutation,
  }
}
