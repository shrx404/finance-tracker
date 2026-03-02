"use client";

import { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { Transaction } from "@/types";

interface ExpensePieChartProps {
  transactions: Transaction[];
}

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

export function ExpensePieChart({ transactions }: ExpensePieChartProps) {
  const data = useMemo(() => {
    const expenses = transactions.filter((t) => t.type === "EXPENSE");

    const categories = expenses.reduce(
      (acc, t) => {
        const cat = t.category || "Other";
        if (!acc[cat]) {
          acc[cat] = 0;
        }
        acc[cat] += t.amount;
        return acc;
      },
      {} as Record<string, number>,
    );

    return Object.entries(categories)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  if (transactions.filter((t) => t.type === "EXPENSE").length === 0) {
    return (
      <div className="flex h-[300px] w-full items-center justify-center border rounded-lg bg-card/10 backdrop-blur-md border-border/20">
        <p className="text-muted-foreground text-sm">
          Add expenses to see breakdown
        </p>
      </div>
    );
  }

  return (
    <div className="h-[300px] w-full p-4 border rounded-2xl bg-card/10 backdrop-blur-xl border-border/20 shadow-lg relative overflow-hidden group hover:bg-card/20 transition-all duration-500">
      <div className="absolute inset-0 bg-gradient-to-br from-chart-1/5 to-chart-2/5 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={5}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => `$${value.toFixed(2)}`}
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              borderColor: "hsl(var(--border))",
              borderRadius: "12px",
              color: "hsl(var(--foreground))",
              boxShadow:
                "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
            }}
            itemStyle={{ color: "hsl(var(--foreground))" }}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            formatter={(value) => (
              <span className="text-sm font-medium text-muted-foreground ml-1">
                {value}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
