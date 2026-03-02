"use client";

import { useFinanceData } from "@/hooks/useFinanceData";
import { OverviewCards } from "@/components/OverviewCards";
import { TransactionForm } from "@/components/TransactionForm";
import { TransactionList } from "@/components/TransactionList";
import { FinanceChart } from "@/components/FinanceChart";
import { ExpensePieChart } from "@/components/ExpensePieChart";
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
          <Gem className="w-12 h-12 mb-4 text-primary animate-spin" />
          <p className="text-muted-foreground font-medium">
            Loading your wealth matrix...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative selection:bg-primary/20 selection:text-primary overflow-x-hidden">
      {/* Background Decorators - Modern Aurora Effect */}
      <div className="fixed top-[-10%] left-[-20%] w-[800px] h-[800px] rounded-full bg-primary/10 blur-[150px] pointer-events-none mix-blend-screen" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-[150px] pointer-events-none mix-blend-screen" />
      <div className="fixed top-[40%] right-[-20%] w-[500px] h-[500px] rounded-full bg-rose-500/10 blur-[120px] pointer-events-none mix-blend-screen" />

      <main className="container mx-auto px-4 py-12 max-w-6xl relative z-10 flex flex-col gap-10">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 animate-in fade-in slide-in-from-top-6 duration-700">
          <div>
            <div className="inline-flex items-center justify-center px-3 py-1 text-xs font-semibold tracking-wide uppercase rounded-full bg-primary/10 text-primary mb-4 border border-primary/20">
              Personal Wealth
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight flex items-center gap-3">
              <Gem className="w-10 h-10 text-primary drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]" />
              Finance Tracker
            </h1>
            <p className="text-muted-foreground mt-2 text-lg max-w-lg">
              Manage your transactions, analyze your spending, and build your
              wealth with elegance.
            </p>
          </div>
        </header>

        {/* Quick Add Form Component */}
        <TransactionForm onAddTransaction={addTransaction} />

        {/* Overview Cards */}
        <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150 fill-mode-both">
          <OverviewCards
            totalIncome={totalIncome}
            totalExpense={totalExpense}
            balance={balance}
          />
        </section>

        {/* Charts & List Grid */}
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 flex flex-col gap-8">
            <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both">
              <div className="flex items-center justify-between mb-4 px-1">
                <h2 className="text-2xl font-bold tracking-tight">
                  Financial Flow
                </h2>
              </div>
              <FinanceChart transactions={transactions} />
            </section>

            <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500 fill-mode-both">
              <div className="flex items-center justify-between mb-4 px-1">
                <h2 className="text-2xl font-bold tracking-tight">
                  Recent Transactions
                </h2>
              </div>
              <TransactionList
                transactions={transactions}
                onDelete={deleteTransaction}
              />
            </section>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-8">
            <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-700 fill-mode-both">
              <div className="flex items-center justify-between mb-4 px-1">
                <h2 className="text-2xl font-bold tracking-tight">
                  Expense Categories
                </h2>
              </div>
              <ExpensePieChart transactions={transactions} />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
