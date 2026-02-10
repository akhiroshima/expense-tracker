"use client";

import * as React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import type { ExpenseWithCategory } from "@/lib/supabase/queries";

interface SpendingByCategoryProps {
  expenses: ExpenseWithCategory[];
}

interface ChartDatum {
  name: string;
  value: number;
  color: string;
}

export function SpendingByCategory({ expenses }: SpendingByCategoryProps) {
  const data = React.useMemo<ChartDatum[]>(() => {
    const map = new Map<string, { name: string; value: number; color: string }>();

    for (const exp of expenses) {
      const name = exp.categories?.name ?? "Uncategorized";
      const color = exp.categories?.color ?? "#6b7280";
      const key = name;
      const existing = map.get(key);
      if (existing) {
        existing.value += exp.amount;
      } else {
        map.set(key, { name, value: exp.amount, color });
      }
    }

    return Array.from(map.values()).sort((a, b) => b.value - a.value);
  }, [expenses]);

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[250px] text-muted-foreground text-sm">
        No data yet
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          paddingAngle={2}
          dataKey="value"
          nameKey="name"
        >
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value: number | undefined) => [`$${(value ?? 0).toFixed(2)}`, "Amount"]}
          contentStyle={{
            borderRadius: "8px",
            border: "1px solid hsl(var(--border))",
            backgroundColor: "hsl(var(--popover))",
            color: "hsl(var(--popover-foreground))",
          }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
