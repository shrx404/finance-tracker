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
import { Trash2 } from "lucide-react";
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
      <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg bg-card/50 backdrop-blur-md border-border/50">
        <p className="text-muted-foreground">No transactions found.</p>
        <p className="text-sm text-muted-foreground/80 mt-1">
          Start by adding your first income or expense.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-md border border-border/50 bg-card/50 backdrop-blur-md overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((t) => (
            <TableRow
              key={t.id}
              className="transition-colors hover:bg-muted/50"
            >
              <TableCell className="font-medium">
                {format(new Date(t.date), "MMM d, yyyy")}
              </TableCell>
              <TableCell>{t.description}</TableCell>
              <TableCell>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-secondary text-secondary-foreground">
                  {t.category}
                </span>
              </TableCell>
              <TableCell
                className={`text-right font-medium ${t.type === "INCOME" ? "text-emerald-500" : "text-rose-500"}`}
              >
                {formatCurrency(t.amount, t.type)}
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive transition-colors"
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
