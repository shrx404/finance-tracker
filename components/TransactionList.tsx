import { Transaction, CATEGORY_CONFIG } from "@/types";
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

  const getCategoryColor = (category?: string) => {
    if (!category) return CATEGORY_CONFIG["Other"]?.colorClass || "";
    return (
      CATEGORY_CONFIG[category]?.colorClass ||
      CATEGORY_CONFIG["Other"]?.colorClass ||
      ""
    );
  };

  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center border border-border/40 rounded-2xl bg-card/30 backdrop-blur-2xl shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent pointer-events-none opacity-50" />
        <div className="w-16 h-16 rounded-full bg-muted/50 backdrop-blur-md flex items-center justify-center mb-4 border border-border/50 relative z-10">
          <TrendingUp className="w-8 h-8 text-muted-foreground/60" />
        </div>
        <h3 className="text-xl font-bold mb-2 text-foreground relative z-10">
          No Transactions Yet
        </h3>
        <p className="text-muted-foreground text-sm max-w-xs mx-auto relative z-10">
          Start building your financial history by adding an income or expense
          above.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border/40 bg-card/30 backdrop-blur-2xl shadow-2xl overflow-hidden relative transition-all duration-500 hover:border-border/50">
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent pointer-events-none opacity-30" />
      <Table className="relative z-10">
        <TableHeader className="bg-muted/20 border-b border-border/40 backdrop-blur-md">
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[120px] text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Date
            </TableHead>
            <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Details
            </TableHead>
            <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground text-center">
              Category
            </TableHead>
            <TableHead className="text-right text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Amount
            </TableHead>
            <TableHead className="w-[60px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((t) => (
            <TableRow
              key={t.id}
              className="group hover:bg-muted/30 border-b border-border/20 transition-all duration-200 cursor-default"
            >
              <TableCell className="font-medium whitespace-nowrap text-muted-foreground text-sm">
                {format(new Date(t.date), "MMM d, yyyy")}
              </TableCell>
              <TableCell>
                <span className="font-semibold text-foreground">
                  {t.description || "Untitled Transaction"}
                </span>
              </TableCell>
              <TableCell className="text-center">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getCategoryColor(t.category)}`}
                >
                  {t.category || "Other"}
                </span>
              </TableCell>
              <TableCell>
                <div
                  className={`flex items-center justify-end font-bold text-base tracking-tight ${t.type === "INCOME" ? "text-emerald-500" : "text-foreground"}`}
                >
                  {t.type === "EXPENSE" && (
                    <TrendingDown className="w-4 h-4 mr-1.5 text-rose-500" />
                  )}
                  {t.type === "INCOME" && (
                    <TrendingUp className="w-4 h-4 mr-1.5 text-emerald-500" />
                  )}
                  {formatCurrency(t.amount, t.type)}
                </div>
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all hover:bg-destructive/15 hover:text-destructive shrink-0"
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
