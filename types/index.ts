export type TransactionType = "INCOME" | "EXPENSE";

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  category?: string;
  description?: string;
  date: string;
}

export interface CategoryConfig {
  type: TransactionType;
  colorClass: string;
  colorHex: string;
}

export const CATEGORY_CONFIG: Record<string, CategoryConfig> = {
  // Income
  Salary: { type: "INCOME", colorClass: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30", colorHex: "#10b981" },
  Freelance: { type: "INCOME", colorClass: "bg-teal-500/15 text-teal-500 border-teal-500/30", colorHex: "#14b8a6" },
  Investments: { type: "INCOME", colorClass: "bg-indigo-500/15 text-indigo-500 border-indigo-500/30", colorHex: "#6366f1" },
  "Other Income": { type: "INCOME", colorClass: "bg-green-500/15 text-green-500 border-green-500/30", colorHex: "#22c55e" },
  
  // Expenses - Carefully selected to ensure distinct contrast
  Housing: { type: "EXPENSE", colorClass: "bg-amber-700/15 text-amber-700 border-amber-700/30", colorHex: "#bb4d00" }, // Brown
  Food: { type: "EXPENSE", colorClass: "bg-amber-500/15 text-amber-500 border-amber-500/30", colorHex: "#f59e0b" }, // Amber / Yellow-Orangish
  Transportation: { type: "EXPENSE", colorClass: "bg-indigo-500/15 text-indigo-500 border-indigo-500/30", colorHex: "#6366f1" }, // Indigo / Deep Blue
  Utilities: { type: "EXPENSE", colorClass: "bg-cyan-500/15 text-cyan-500 border-cyan-500/30", colorHex: "#06b6d4" }, // Cyan / Light Blue
  Entertainment: { type: "EXPENSE", colorClass: "bg-violet-500/15 text-violet-500 border-violet-500/30", colorHex: "#8b5cf6" }, // Violet / Purple
  Healthcare: { type: "EXPENSE", colorClass: "bg-pink-500/15 text-pink-500 border-pink-500/30", colorHex: "#ec4899" }, // Pink
  "Other Expense": { type: "EXPENSE", colorClass: "bg-slate-500/15 text-slate-500 border-slate-500/30", colorHex: "#64748b" }, // Slate / Gray
  
  // Fallback
  Other: { type: "EXPENSE", colorClass: "bg-slate-500/15 text-slate-500 border-slate-500/30", colorHex: "#64748b" },
};
