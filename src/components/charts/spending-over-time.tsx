"use client";

import * as React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { format, startOfWeek, startOfMonth, parseISO } from "date-fns";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ExpenseWithCategory } from "@/lib/supabase/queries";

type Granularity = "daily" | "weekly" | "monthly";

interface SpendingOverTimeProps {
  expenses: ExpenseWithCategory[];
}

interface ChartDatum {
  label: string;
  total: number;
}

function aggregateExpenses(
  expenses: ExpenseWithCategory[],
  granularity: Granularity
): ChartDatum[] {
  const map = new Map<string, number>();

  for (const exp of expenses) {
    const d = parseISO(exp.date);
    let key: string;
    switch (granularity) {
      case "daily":
        key = format(d, "MMM d");
        break;
      case "weekly":
        key = "Week of " + format(startOfWeek(d, { weekStartsOn: 1 }), "MMM d");
        break;
      case "monthly":
        key = format(startOfMonth(d), "MMM yyyy");
        break;
    }
    map.set(key, (map.get(key) ?? 0) + exp.amount);
  }

  return Array.from(map.entries())
    .map(([label, total]) => ({ label, total }));
}

export function SpendingOverTime({ expenses }: SpendingOverTimeProps) {
  const [granularity, setGranularity] = React.useState<Granularity>("daily");

  const data = React.useMemo(
    () => aggregateExpenses(expenses, granularity),
    [expenses, granularity]
  );

  return (
    <div className="space-y-3">
      <Tabs
        value={granularity}
        onValueChange={(v) => setGranularity(v as Granularity)}
      >
        <TabsList>
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
        </TabsList>
      </Tabs>

      {data.length === 0 ? (
        <div className="flex items-center justify-center h-[250px] text-muted-foreground text-sm">
          No data yet
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 12 }}
              className="fill-muted-foreground"
            />
            <YAxis
              tick={{ fontSize: 12 }}
              className="fill-muted-foreground"
              tickFormatter={(v) => `$${v}`}
            />
            <Tooltip
              formatter={(value: number) => [`$${value.toFixed(2)}`, "Total"]}
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid hsl(var(--border))",
                backgroundColor: "hsl(var(--popover))",
                color: "hsl(var(--popover-foreground))",
              }}
            />
            <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
