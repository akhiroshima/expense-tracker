"use client";

import * as React from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2Icon } from "lucide-react";
import { format, isToday, isYesterday } from "date-fns";
import type { ExpenseWithCategory } from "@/lib/supabase/queries";

interface ExpenseListProps {
  expenses: ExpenseWithCategory[];
  onDelete: (id: string) => void;
}

function dateLabel(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  if (isToday(d)) return "Today";
  if (isYesterday(d)) return "Yesterday";
  return format(d, "EEEE, MMM d");
}

export function ExpenseList({ expenses, onDelete }: ExpenseListProps) {
  const groupedByDay = React.useMemo(() => {
    const map = new Map<string, ExpenseWithCategory[]>();
    for (const e of expenses) {
      const list = map.get(e.date) ?? [];
      list.push(e);
      map.set(e.date, list);
    }
    return Array.from(map.entries())
      .sort(([a], [b]) => b.localeCompare(a))
      .map(([dateStr, list]) => ({
        dateStr,
        expenses: list,
        total: list.reduce((sum, x) => sum + x.amount, 0),
      }));
  }, [expenses]);

  if (expenses.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        <p className="text-lg">No expenses yet</p>
        <p className="text-sm mt-1">Tap the + button to add your first one</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {groupedByDay.map(({ dateStr, expenses: dayExpenses, total }) => (
        <div key={dateStr} className="space-y-3">
          <div className="sticky top-0 z-10 flex items-center justify-between gap-2 py-1 -mx-1 px-1 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <span className="text-sm font-medium">{dateLabel(dateStr)}</span>
            <span className="text-sm text-muted-foreground">
              ${total.toFixed(2)}
            </span>
          </div>
          <div className="space-y-3">
            {dayExpenses.map((expense) => (
              <Card key={expense.id} className="group relative">
                <CardContent className="flex items-center gap-4 py-4 px-4">
                  <div
                    className="w-1 self-stretch rounded-full shrink-0"
                    style={{
                      backgroundColor: expense.categories?.color ?? "#6b7280",
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium truncate">
                        {expense.description || "Expense"}
                      </p>
                      {expense.categories && (
                        <Badge
                          variant="outline"
                          className="text-xs shrink-0 gap-1"
                          style={{
                            borderColor: expense.categories.color,
                            color: expense.categories.color,
                          }}
                        >
                          <span
                            className="inline-block size-1.5 rounded-full"
                            style={{ backgroundColor: expense.categories.color }}
                          />
                          {expense.categories.name}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-lg font-semibold">
                      ${expense.amount.toFixed(2)}
                    </p>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2Icon className="size-4 text-muted-foreground" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete expense?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete this ${expense.amount.toFixed(2)}{" "}
                          expense. This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => onDelete(expense.id)}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
