"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ExpenseForm } from "@/components/expense-form";
import { ExpenseList } from "@/components/expense-list";
import { SetupBanner } from "@/components/setup-banner";
import { PlusIcon } from "lucide-react";
import { toast } from "sonner";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import {
  getCategories,
  getExpenses,
  createExpense,
  deleteExpense,
  type Category,
  type ExpenseWithCategory,
} from "@/lib/supabase/queries";

export default function ExpensesPage() {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [expenses, setExpenses] = React.useState<ExpenseWithCategory[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [addOpen, setAddOpen] = React.useState(false);

  // Filter
  const [filterCategory, setFilterCategory] = React.useState<string | null>(
    null
  );

  const loadData = React.useCallback(async () => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    try {
      const [cats, exps] = await Promise.all([
        getCategories(),
        getExpenses({
          categoryId: filterCategory ?? undefined,
        }),
      ]);
      setCategories(cats);
      setExpenses(exps);
    } catch {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  }, [filterCategory]);

  React.useEffect(() => {
    loadData();
  }, [loadData]);

  const handleCreate = async (data: {
    amount: number;
    description: string;
    category_id: string | null;
    date: string;
  }) => {
    setSaving(true);
    try {
      await createExpense(data);
      toast.success("Expense added");
      setAddOpen(false);
      loadData();
    } catch {
      toast.error("Failed to add expense");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteExpense(id);
      toast.success("Expense deleted");
      loadData();
    } catch {
      toast.error("Failed to delete expense");
    }
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8 pb-24 space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Expenses</h1>
        <p className="text-muted-foreground text-sm">
          Track and manage your spending
        </p>
      </div>

      {!isSupabaseConfigured && <SetupBanner />}

      {/* Category filter chips */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={filterCategory === null ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setFilterCategory(null)}
          >
            All
          </Badge>
          {categories.map((cat) => (
            <Badge
              key={cat.id}
              variant={filterCategory === cat.id ? "default" : "outline"}
              className="cursor-pointer gap-1.5"
              style={
                filterCategory === cat.id
                  ? { backgroundColor: cat.color, color: "white" }
                  : { borderColor: cat.color, color: cat.color }
              }
              onClick={() =>
                setFilterCategory(filterCategory === cat.id ? null : cat.id)
              }
            >
              <span
                className="inline-block size-2 rounded-full"
                style={{ backgroundColor: cat.color }}
              />
              {cat.name}
            </Badge>
          ))}
        </div>
      )}

      {/* Expense cards */}
      {loading ? (
        <div className="text-center py-12 text-muted-foreground">
          Loading...
        </div>
      ) : (
        <ExpenseList expenses={expenses} onDelete={handleDelete} />
      )}

      {/* Floating add button */}
      <Button
        size="lg"
        className="fixed bottom-6 right-6 size-14 rounded-full shadow-lg z-40"
        onClick={() => setAddOpen(true)}
      >
        <PlusIcon className="size-6" />
      </Button>

      {/* Add expense modal */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Expense</DialogTitle>
          </DialogHeader>
          <ExpenseForm
            categories={categories}
            onSubmit={handleCreate}
            loading={saving}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
