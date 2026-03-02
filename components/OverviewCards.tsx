import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, ArrowUpCircle, ArrowDownCircle } from "lucide-react";

interface OverviewCardsProps {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

export function OverviewCards({
  totalIncome,
  totalExpense,
  balance,
}: OverviewCardsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {/* Balance Card */}
      <Card className="relative overflow-hidden bg-card/20 backdrop-blur-2xl border-border/20 shadow-xl group transition-all duration-300 hover:shadow-primary/10 hover:-translate-y-1">
        <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent opacity-50 pointer-events-none group-hover:opacity-100 transition-opacity duration-500" />
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 relative z-10">
          <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Total Balance
          </CardTitle>
          <div className="p-2 bg-primary/10 rounded-full">
            <DollarSign className="w-5 h-5 text-primary" />
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="text-3xl font-extrabold tracking-tight">
            {formatCurrency(balance)}
          </div>
          <p className="text-xs text-muted-foreground mt-2 font-medium">
            Available funds
          </p>
        </CardContent>
      </Card>

      {/* Income Card */}
      <Card className="relative overflow-hidden bg-card/20 backdrop-blur-2xl border-border/20 shadow-xl group transition-all duration-300 hover:shadow-emerald-500/10 hover:-translate-y-1">
        <div className="absolute inset-0 bg-linear-to-br from-emerald-500/10 to-transparent opacity-50 pointer-events-none group-hover:opacity-100 transition-opacity duration-500" />
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 relative z-10">
          <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Total Income
          </CardTitle>
          <div className="p-2 bg-emerald-500/10 rounded-full">
            <ArrowUpCircle className="w-5 h-5 text-emerald-500" />
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="text-3xl font-extrabold tracking-tight text-emerald-500">
            {formatCurrency(totalIncome)}
          </div>
          <p className="text-xs text-emerald-500/60 mt-2 font-medium">
            Lifetime accumulated
          </p>
        </CardContent>
      </Card>

      {/* Expenses Card */}
      <Card className="relative overflow-hidden bg-card/20 backdrop-blur-2xl border-border/20 shadow-xl group transition-all duration-300 hover:shadow-rose-500/10 hover:-translate-y-1">
        <div className="absolute inset-0 bg-linear-to-br from-rose-500/10 to-transparent opacity-50 pointer-events-none group-hover:opacity-100 transition-opacity duration-500" />
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 relative z-10">
          <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Total Expenses
          </CardTitle>
          <div className="p-2 bg-rose-500/10 rounded-full">
            <ArrowDownCircle className="w-5 h-5 text-rose-500" />
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="text-3xl font-extrabold tracking-tight text-rose-500">
            {formatCurrency(totalExpense)}
          </div>
          <p className="text-xs text-rose-500/60 mt-2 font-medium">
            Lifetime spent
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
