"use client";

import { useMemo } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Transaction } from "@/types";
import { format, parseISO } from "date-fns";

interface FinanceChartProps {
  transactions: Transaction[];
}

export function FinanceChart({ transactions }: FinanceChartProps) {
  const data = useMemo(() => {
    // Process transactions into daily aggregates
    const dailyData = transactions.reduce(
      (acc, t) => {
        const date = t.date;
        if (!acc[date]) {
          acc[date] = { date, income: 0, expense: 0 };
        }
        if (t.type === "INCOME") {
          acc[date].income += t.amount;
        } else {
          acc[date].expense += t.amount;
        }
        return acc;
      },
      {} as Record<string, { date: string; income: number; expense: number }>,
    );

    // Sort chronologically
    return Object.values(dailyData).sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
  }, [transactions]);

  if (transactions.length === 0) {
    return (
      <div className="flex h-[300px] w-full items-center justify-center border rounded-2xl bg-card/10 backdrop-blur-xl border-border/20 shadow-lg">
        <p className="text-muted-foreground text-sm">
          Add transactions to see chart data
        </p>
      </div>
    );
  }

  return (
    <div className="h-[300px] w-full p-4 pl-0 border-[1px] rounded-2xl bg-card/30 backdrop-blur-2xl border-border/40 shadow-2xl relative overflow-hidden group hover:border-primary/30 transition-all duration-500">
      <div className="absolute inset-0 bg-linear-to-tr from-primary/5 to-emerald-500/5 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="hsl(var(--border) / 0.4)"
          />
          <XAxis
            dataKey="date"
            tickFormatter={(str) => format(parseISO(str), "MMM d")}
            stroke="#a1a1aa"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            dy={10}
          />
          <YAxis
            stroke="#a1a1aa"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
            dx={-10}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#18181b",
              borderColor: "#27272a",
              borderRadius: "12px",
              color: "#f4f4f5",
              boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.5)",
            }}
            itemStyle={{ color: "#f4f4f5", fontWeight: 500 }}
            labelFormatter={(label) =>
              format(parseISO(label as string), "MMM d, yyyy")
            }
          />
          <Area
            type="monotone"
            dataKey="income"
            stroke="#10b981"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorIncome)"
            name="Income"
          />
          <Area
            type="monotone"
            dataKey="expense"
            stroke="#f43f5e"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorExpense)"
            name="Expense"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
