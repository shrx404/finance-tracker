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
import { PlusCircle } from "lucide-react";

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
    <div className="bg-card/30 backdrop-blur-xl border border-border/50 rounded-2xl p-4 shadow-lg mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-4 items-end"
      >
        <div className="flex-1 space-y-2 w-full">
          <label className="text-xs font-medium text-muted-foreground ml-1">
            Type
          </label>
          <Select
            value={type}
            onValueChange={(val: TransactionType) => {
              setType(val);
              setCategory("");
            }}
          >
            <SelectTrigger className="bg-background/50 focus:ring-primary/20">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="EXPENSE">Expense</SelectItem>
              <SelectItem value="INCOME">Income</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 space-y-2 w-full">
          <label className="text-xs font-medium text-muted-foreground ml-1">
            Amount
          </label>
          <Input
            type="number"
            step="0.01"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-background/50 focus-visible:ring-primary/20"
            required
          />
        </div>

        <div className="flex-[1.5] space-y-2 w-full">
          <label className="text-xs font-medium text-muted-foreground ml-1">
            Category (Optional)
          </label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="bg-background/50 focus:ring-primary/20">
              <SelectValue placeholder="Auto" />
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

        <div className="flex-[2] space-y-2 w-full">
          <label className="text-xs font-medium text-muted-foreground ml-1">
            Description (Optional)
          </label>
          <Input
            placeholder="What was this for?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-background/50 focus-visible:ring-primary/20"
          />
        </div>

        <Button
          type="submit"
          className="w-full md:w-auto gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-primary/25 transition-all h-10"
        >
          <PlusCircle className="w-4 h-4" /> Add
        </Button>
      </form>
    </div>
  );
}
