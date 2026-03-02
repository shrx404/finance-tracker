"use client";

import { useFinanceData } from "@/hooks/useFinanceData";
import { OverviewCards } from "@/components/OverviewCards";
import { TransactionForm } from "@/components/TransactionForm";
import { TransactionList } from "@/components/TransactionList";
import { FinanceChart } from "@/components/FinanceChart";
import { Gem } from "lucide-react";

export default function Home() {
  const {
    transactions,
    addTransaction,
    deleteTransaction,
    totalIncome,
    totalExpense,
    balance,
    isLoaded,
  } = useFinanceData();

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <div className="animate-pulse flex flex-col items-center">
          <Gem className="w-10 h-10 mb-4 text-primary animate-spin" />
          <p className="text-muted-foreground">Loading your finances...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative selection:bg-primary selection:text-primary-foreground">
      {/* Background Decorators */}
      <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-rose-500/5 blur-[100px] pointer-events-none" />

      <main className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-2">
              <Gem className="w-8 h-8 text-primary" />
              Finance Tracker
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your wealth with elegance and precision.
            </p>
          </div>
          <TransactionForm onAddTransaction={addTransaction} />
        </header>

        <section className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
          <OverviewCards
            totalIncome={totalIncome}
            totalExpense={totalExpense}
            balance={balance}
          />
        </section>

        <div className="grid lg:grid-cols-3 gap-8">
          <section className="lg:col-span-2 animate-in fade-in slide-in-from-bottom-6 duration-700 ease-out delay-150">
            <div className="px-1 mb-4">
              <h2 className="text-xl font-bold tracking-tight">
                Recent Transactions
              </h2>
            </div>
            <TransactionList
              transactions={transactions}
              onDelete={deleteTransaction}
            />
          </section>

          <section className="animate-in fade-in slide-in-from-bottom-6 duration-700 ease-out delay-300">
            <div className="px-1 mb-4">
              <h2 className="text-xl font-bold tracking-tight">
                Financial Overview
              </h2>
            </div>
            <FinanceChart transactions={transactions} />
          </section>
        </div>
      </main>
    </div>
  );
}
