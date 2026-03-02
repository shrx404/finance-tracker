"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TransactionType, CATEGORY_CONFIG } from "@/types";
import {
  Plus,
  ArrowDownCircle,
  ArrowUpCircle,
  CalendarIcon,
  DollarSign,
} from "lucide-react";

import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface TransactionFormProps {
  onAddTransaction: (transaction: {
    amount: number;
    type: TransactionType;
    category?: string;
    description?: string;
    date: string;
  }) => void;
}

export const TransactionForm = ({ onAddTransaction }: TransactionFormProps) => {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<TransactionType>("EXPENSE");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date>(new Date());

  // Dynamically derive available categories from config
  const availableCategories = useMemo(() => {
    return Object.entries(CATEGORY_CONFIG)
      .filter(([name, config]) => config.type === type && name !== "Other")
      .map(([name]) => name);
  }, [type]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || isNaN(Number(amount))) return;

    onAddTransaction({
      amount: Number(amount),
      type,
      category: category || "Other",
      description: description || "New Transaction",
      date: date.toISOString().split("T")[0],
    });

    // Reset fields
    setAmount("");
    setDescription("");
    setDate(new Date());
  };

  return (
    <div className="bg-card/40 backdrop-blur-xl border border-border/50 shadow-2xl rounded-3xl p-6 md:p-8 mb-8 relative overflow-hidden group transition-all duration-500 hover:shadow-primary/5 hover:border-border/80">
      {/* Decorative top border */}
      <div
        className={cn(
          "absolute top-0 left-0 w-full h-1.5 opacity-80 transition-colors duration-500",
          type === "EXPENSE" ? "bg-rose-500" : "bg-emerald-500",
        )}
      ></div>
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-primary/10 rounded-full blur-3xl pointer-events-none transition-all group-hover:bg-primary/20"></div>

      <div className="flex flex-row md:flex-col md:items-center justify-between gap-4 mb-8">
        {/* Unified Type Toggle - Replaces older Dropdown */}
        <div className="flex bg-muted/40 backdrop-blur-md p-1.5 rounded-xl border border-border/40">
          <button
            type="button"
            className={cn(
              "px-5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2",
              type === "EXPENSE"
                ? "bg-background text-rose-500 shadow-sm border border-border/50"
                : "text-muted-foreground hover:text-foreground",
            )}
            onClick={() => {
              setType("EXPENSE");
              setCategory("");
            }}
          >
            <ArrowDownCircle className="w-4 h-4" />
            Expense
          </button>
          <button
            type="button"
            className={cn(
              "px-5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2",
              type === "INCOME"
                ? "bg-background text-emerald-500 shadow-sm border border-border/50"
                : "text-muted-foreground hover:text-foreground",
            )}
            onClick={() => {
              setType("INCOME");
              setCategory("");
            }}
          >
            <ArrowUpCircle className="w-4 h-4" />
            Income
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        <div className="flex flex-col gap-4">
          {/* Amount input - focal point */}
          <div className="space-y-3">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider ml-1 mb-2 block">
              Amount
            </label>
            <div className="relative group/input">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <DollarSign
                  className={cn(
                    "h-5 w-5 transition-colors duration-300",
                    type === "EXPENSE" ? "text-rose-500" : "text-emerald-500",
                  )}
                />
              </div>
              <Input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="h-14 pl-11 bg-background/60 backdrop-blur-md border-border/60 focus-visible:ring-primary/20 text-2xl font-bold shadow-sm transition-all rounded-xl"
                required
              />
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider ml-1 mb-2 block">
              Date
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full h-14 justify-start text-left font-normal bg-background/60 backdrop-blur-md border-border/60 hover:bg-background/80 transition-all shadow-sm rounded-xl text-base",
                    !date && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-3 h-5 w-5 opacity-70" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto p-0 z-50 pointer-events-auto rounded-xl border-border/60 shadow-xl"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(d) => d && setDate(d)}
                  initialFocus
                  className="bg-card"
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-3">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider ml-1 text-nowrap pr-2 mb-2 block">
              Category
            </label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="h-14 bg-background/60 backdrop-blur-md border-border/60 focus:ring-primary/20 transition-all shadow-sm rounded-xl text-base">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-border/60 shadow-xl group/selectcontent">
                {availableCategories.map((c: string) => (
                  <SelectItem
                    key={c}
                    value={c}
                    className="rounded-lg cursor-pointer"
                  >
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-3">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider ml-1 mb-2 block">
              Description{" "}
              <span className="lowercase font-normal opacity-60 ml-1">
                (Optional)
              </span>
            </label>
            <Input
              placeholder="What was this for?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-14 bg-background/60 backdrop-blur-md border-border/60 focus-visible:ring-primary/20 transition-all shadow-sm rounded-xl text-base placeholder:text-muted-foreground/50"
            />
          </div>
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            className={cn(
              "w-full h-14 text-base font-bold transition-all rounded-xl gap-2 shadow-md hover:shadow-lg active:scale-[0.98] text-white border-none",
              type === "EXPENSE"
                ? "bg-rose-500 hover:bg-rose-600 shadow-rose-500/25"
                : "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/25",
            )}
          >
            <Plus className="w-5 h-5 stroke-[3]" />
            Add {type === "EXPENSE" ? "Expense" : "Income"}
          </Button>
        </div>
      </form>
    </div>
  );
};
