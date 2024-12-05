// import DashboardFeature from '@/components/dashboard/dashboard-feature'

import GameInterface from "@/components/GameInterface";
import NavigationBar from "@/components/NavigationBar";
import ResultsTable from "@/components/ResultsTable";
import WalletConnection from "@/components/WalletConnection";

// export default function Page() {
//   return <DashboardFeature />
// }



export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 bg-gray-900">
      <NavigationBar />
      <GameInterface />
      <ResultsTable />
      <WalletConnection />
    </main>
  )
}

