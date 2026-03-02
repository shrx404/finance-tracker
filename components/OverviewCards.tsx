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
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="bg-card/50 backdrop-blur-md border-border/50 shadow-sm transition-all hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Balance
          </CardTitle>
          <DollarSign className="w-4 h-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(balance)}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Current available funds
          </p>
        </CardContent>
      </Card>
      <Card className="bg-card/50 backdrop-blur-md border-border/50 shadow-sm transition-all hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Income
          </CardTitle>
          <ArrowUpCircle className="w-4 h-4 text-emerald-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-emerald-500">
            {formatCurrency(totalIncome)}
          </div>
          <p className="text-xs text-muted-foreground mt-1">Across all time</p>
        </CardContent>
      </Card>
      <Card className="bg-card/50 backdrop-blur-md border-border/50 shadow-sm transition-all hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Expenses
          </CardTitle>
          <ArrowDownCircle className="w-4 h-4 text-rose-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-rose-500">
            {formatCurrency(totalExpense)}
          </div>
          <p className="text-xs text-muted-foreground mt-1">Across all time</p>
        </CardContent>
      </Card>
    </div>
  );
}
