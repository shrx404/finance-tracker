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
import { Transaction, CATEGORY_CONFIG } from "@/types";

interface ExpensePieChartProps {
  transactions: Transaction[];
}

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
      .map(([name, value]) => ({
        name,
        value,
        color: CATEGORY_CONFIG[name]?.colorHex || "#64748b",
      }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  if (transactions.filter((t) => t.type === "EXPENSE").length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center border border-border/40 rounded-2xl bg-card/30 backdrop-blur-2xl shadow-lg h-[300px] relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent pointer-events-none opacity-50" />
        <p className="text-muted-foreground text-sm font-medium relative z-10">
          Add expenses to see breakdown
        </p>
      </div>
    );
  }

  return (
    <div className="h-[300px] w-full p-4 border-[1px] rounded-2xl bg-card/30 backdrop-blur-2xl border-border/40 shadow-2xl relative overflow-hidden group hover:border-primary/30 transition-all duration-500">
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={65}
            outerRadius={95}
            paddingAngle={5}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => `$${value.toFixed(2)}`}
            contentStyle={{
              backgroundColor: "#18181b",
              borderColor: "#27272a",
              borderRadius: "12px",
              color: "#f4f4f5",
              boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.5)",
            }}
            itemStyle={{ color: "#f4f4f5", fontWeight: 600 }}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            formatter={(value) => (
              <span
                className="text-sm font-semibold"
                style={{ color: "#a1a1aa" }}
              >
                {value}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
