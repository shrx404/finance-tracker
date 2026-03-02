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
      <div className="flex h-[300px] w-full items-center justify-center border rounded-lg bg-card/50 backdrop-blur-md border-border/50">
        <p className="text-muted-foreground">
          Add transactions to see chart data
        </p>
      </div>
    );
  }

  return (
    <div className="h-[300px] w-full p-4 border rounded-lg bg-card/50 backdrop-blur-md border-border/50">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="hsl(var(--border))"
          />
          <XAxis
            dataKey="date"
            tickFormatter={(str) => format(parseISO(str), "MMM d")}
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            dy={10}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
            dx={-10}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              borderColor: "hsl(var(--border))",
              borderRadius: "8px",
              color: "hsl(var(--foreground))",
            }}
            itemStyle={{ color: "hsl(var(--foreground))" }}
            labelFormatter={(label) =>
              format(parseISO(label as string), "MMM d, yyyy")
            }
          />
          <Area
            type="monotone"
            dataKey="income"
            stroke="#10b981"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorIncome)"
            name="Income"
          />
          <Area
            type="monotone"
            dataKey="expense"
            stroke="#f43f5e"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorExpense)"
            name="Expense"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
