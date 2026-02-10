"use client";

import * as React from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SpendingByCategory } from "@/components/charts/spending-by-category";
import { SpendingOverTime } from "@/components/charts/spending-over-time";
import { SetupBanner } from "@/components/setup-banner";
import {
  DollarSignIcon,
  TrendingUpIcon,
  CalendarIcon,
  ArrowRightIcon,
} from "lucide-react";
import {
  format,
  startOfDay,
  startOfWeek,
  startOfMonth,
} from "date-fns";
import { toast } from "sonner";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import {
  getExpenses,
  type ExpenseWithCategory,
} from "@/lib/supabase/queries";

export default function AnalyticsPage() {
  const [expenses, setExpenses] = React.useState<ExpenseWithCategory[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    (async () => {
      try {
        const data = await getExpenses();
        setExpenses(data);
      } catch {
        toast.error("Failed to load expenses");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const now = new Date();
  const todayStr = format(startOfDay(now), "yyyy-MM-dd");
  const weekStartStr = format(startOfWeek(now, { weekStartsOn: 1 }), "yyyy-MM-dd");
  const monthStartStr = format(startOfMonth(now), "yyyy-MM-dd");

  const todayTotal = expenses
    .filter((e) => e.date === todayStr)
    .reduce((sum, e) => sum + e.amount, 0);

  const weekTotal = expenses
    .filter((e) => e.date >= weekStartStr)
    .reduce((sum, e) => sum + e.amount, 0);

  const monthTotal = expenses
    .filter((e) => e.date >= monthStartStr)
    .reduce((sum, e) => sum + e.amount, 0);

  const recentExpenses = expenses.slice(0, 5);

  if (loading) {
    return (
      <div className="container mx-auto max-w-5xl px-4 py-8">
        <div className="text-center py-12 text-muted-foreground">
          Loading analytics...
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-muted-foreground text-sm">
          Your spending at a glance
        </p>
      </div>

      {!isSupabaseConfigured && <SetupBanner />}

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Today
            </CardTitle>
            <DollarSignIcon className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${todayTotal.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              This Week
            </CardTitle>
            <TrendingUpIcon className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${weekTotal.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              This Month
            </CardTitle>
            <CalendarIcon className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${monthTotal.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">By Category</CardTitle>
          </CardHeader>
          <CardContent>
            <SpendingByCategory expenses={expenses} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <SpendingOverTime expenses={expenses} />
          </CardContent>
        </Card>
      </div>

      {/* Recent expenses */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Recent Expenses</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/" className="gap-1">
              View all <ArrowRightIcon className="size-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {recentExpenses.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground text-sm">
              No expenses yet.{" "}
              <Link href="/" className="underline">
                Add your first one
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {recentExpenses.map((exp) => (
                <div
                  key={exp.id}
                  className="flex items-center justify-between py-2"
                >
                  <div className="flex items-center gap-3">
                    {exp.categories && (
                      <span
                        className="size-3 rounded-full"
                        style={{ backgroundColor: exp.categories.color }}
                      />
                    )}
                    <div>
                      <p className="text-sm font-medium">
                        {exp.description || "Expense"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(exp.date + "T00:00:00"), "MMM d")}
                        {exp.categories && ` · ${exp.categories.name}`}
                      </p>
                    </div>
                  </div>
                  <span className="font-medium">
                    ${exp.amount.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
