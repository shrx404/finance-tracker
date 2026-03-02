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
      <div className="flex min-h-screen w-full items-center justify-center">
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
    <main className="container mx-auto px-4 md:px-6 py-8 max-w-[1400px] flex flex-col lg:flex-row gap-8 items-start relative z-10">
      {/* Left Column - Stats & Charts */}
      <div className="flex-1 w-full flex flex-col gap-8">
        {/* Overview Cards */}
        <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150 fill-mode-both">
          <OverviewCards
            totalIncome={totalIncome}
            totalExpense={totalExpense}
            balance={balance}
          />
        </section>

        {/* Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          <div className="xl:col-span-7 flex flex-col gap-6">
            <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both">
              <div className="flex items-center justify-between mb-3 px-1">
                <h2 className="text-xl font-bold tracking-tight">
                  Financial Flow
                </h2>
              </div>
              <FinanceChart transactions={transactions} />
            </section>
          </div>

          <div className="xl:col-span-5 flex flex-col gap-6">
            <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500 fill-mode-both">
              <div className="flex items-center justify-between mb-3 px-1">
                <h2 className="text-xl font-bold tracking-tight">
                  Expense Categories
                </h2>
              </div>
              <ExpensePieChart transactions={transactions} />
            </section>
          </div>
        </div>

        {/* Transactions List */}
        <div className="w-full pb-8">
          <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-700 fill-mode-both">
            <div className="flex items-center justify-between mb-3 px-1">
              <h2 className="text-xl font-bold tracking-tight">
                Recent Transactions
              </h2>
            </div>
            <TransactionList
              transactions={transactions}
              onDelete={deleteTransaction}
            />
          </section>
        </div>
      </div>

      {/* Right Column - Sticky Transaction Form */}
      <div className="w-full lg:w-[400px] xl:w-[420px] shrink-0 lg:sticky lg:top-8 animate-in fade-in slide-in-from-right-8 duration-700 delay-150 fill-mode-both">
        <TransactionForm onAddTransaction={addTransaction} />
      </div>
    </main>
  );
}
