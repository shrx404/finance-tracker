"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TransactionType } from "@/types";
import { Plus, ArrowDownCircle, ArrowUpCircle } from "lucide-react";

interface TransactionFormProps {
  onAddTransaction: (transaction: {
    amount: number;
    type: TransactionType;
    category?: string;
    description?: string;
    date: string;
  }) => void;
}

const CATEGORIES = {
  INCOME: ["Salary", "Freelance", "Investments", "Other Income"],
  EXPENSE: [
    "Housing",
    "Food",
    "Transportation",
    "Utilities",
    "Entertainment",
    "Healthcare",
    "Other Expense",
  ],
};

export function TransactionForm({ onAddTransaction }: TransactionFormProps) {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<TransactionType>("EXPENSE");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || isNaN(Number(amount))) return;

    onAddTransaction({
      amount: Number(amount),
      type,
      category: category || "Other",
      description: description || "New Transaction",
      date: new Date().toISOString().split("T")[0], // Defaults to today
    });

    // Reset fields
    setAmount("");
    setDescription("");
  };

  return (
    <div className="bg-card border border-border shadow-xl rounded-2xl p-5 mb-8 relative overflow-hidden group transition-all duration-300 hover:border-primary/50">
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-emerald-500 to-rose-500 opacity-80"></div>

      <div className="flex items-center gap-2 mb-5">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Plus className="w-4 h-4 text-primary" />
        </div>
        <h3 className="font-semibold text-foreground tracking-tight">
          Record Transaction
        </h3>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-5 gap-5 items-end"
      >
        <div className="space-y-2 w-full">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider ml-1">
            Type
          </label>
          <Select
            value={type}
            onValueChange={(val: TransactionType) => {
              setType(val);
              setCategory("");
            }}
          >
            <SelectTrigger className="h-11 bg-background border-border/60 focus:ring-primary/20 transition-all font-medium">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="EXPENSE">
                <span className="flex items-center gap-2 text-rose-500">
                  <ArrowDownCircle className="w-4 h-4" /> Expense
                </span>
              </SelectItem>
              <SelectItem value="INCOME">
                <span className="flex items-center gap-2 text-emerald-500">
                  <ArrowUpCircle className="w-4 h-4" /> Income
                </span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 w-full">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider ml-1">
            Amount
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
              $
            </span>
            <Input
              type="number"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="h-11 pl-7 bg-background border-border/60 focus-visible:ring-primary/20 text-lg font-bold transition-all"
              required
            />
          </div>
        </div>

        <div className="space-y-2 w-full">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider ml-1">
            Category (Opt)
          </label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="h-11 bg-background border-border/60 focus:ring-primary/20 transition-all">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES[type].map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 w-full md:col-span-2 flex gap-4 items-end">
          <div className="flex-1 space-y-2">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider ml-1">
              Description (Opt)
            </label>
            <Input
              placeholder="What was this for?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-11 bg-background border-border/60 focus-visible:ring-primary/20 transition-all placeholder:text-muted-foreground/50"
            />
          </div>
          <Button
            type="submit"
            className="h-11 px-8 gap-2 font-bold shadow-lg hover:shadow-primary/25 transition-all"
          >
            Add
          </Button>
        </div>
      </form>
    </div>
  );
}
