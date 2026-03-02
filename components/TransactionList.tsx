import { Transaction } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2, TrendingUp, TrendingDown } from "lucide-react";
import { format } from "date-fns";

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

export function TransactionList({
  transactions,
  onDelete,
}: TransactionListProps) {
  const formatCurrency = (amount: number, type: string) => {
    const formatted = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
    return type === "INCOME" ? `+${formatted}` : `-${formatted}`;
  };

  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center border border-border/20 rounded-2xl bg-card/10 backdrop-blur-xl shadow-lg">
        <div className="w-16 h-16 rounded-full bg-muted/20 flex items-center justify-center mb-4">
          <TrendingUp className="w-8 h-8 text-muted-foreground/50" />
        </div>
        <h3 className="text-xl font-semibold mb-2">No Transactions Yet</h3>
        <p className="text-muted-foreground max-w-xs mx-auto">
          Start building your financial history by adding an income or expense
          above.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border/20 bg-card/10 backdrop-blur-xl shadow-lg overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/10 border-b border-border/20">
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[100px] text-xs uppercase tracking-wider text-muted-foreground">
              Date
            </TableHead>
            <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">
              Details
            </TableHead>
            <TableHead className="text-right text-xs uppercase tracking-wider text-muted-foreground">
              Amount
            </TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((t) => (
            <TableRow
              key={t.id}
              className="group hover:bg-muted/20 border-b border-border/10 transition-colors"
            >
              <TableCell className="font-medium whitespace-nowrap text-muted-foreground">
                {format(new Date(t.date), "MMM d, yyyy")}
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium text-foreground">
                    {t.description || "Untitled Transaction"}
                  </span>
                  <span className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>
                    {t.category || "Uncategorized"}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div
                  className={`flex items-center justify-end font-bold tracking-tight ${t.type === "INCOME" ? "text-emerald-500" : "text-foreground"}`}
                >
                  {t.type === "EXPENSE" && (
                    <TrendingDown className="w-3 h-3 mr-1 text-rose-500" />
                  )}
                  {t.type === "INCOME" && (
                    <TrendingUp className="w-3 h-3 mr-1 text-emerald-500" />
                  )}
                  {formatCurrency(t.amount, t.type)}
                </div>
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all hover:bg-destructive/10 hover:text-destructive"
                  onClick={() => onDelete(t.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
