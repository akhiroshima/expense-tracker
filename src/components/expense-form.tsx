"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CategoryPicker } from "@/components/category-picker";
import type { Category } from "@/lib/supabase/queries";

interface ExpenseFormProps {
  categories: Category[];
  onSubmit: (data: {
    amount: number;
    description: string;
    category_id: string | null;
    date: string;
  }) => void;
  initialData?: {
    amount: number;
    description: string;
    category_id: string | null;
    date: string;
  };
  submitLabel?: string;
  loading?: boolean;
}

export function ExpenseForm({
  categories,
  onSubmit,
  initialData,
  submitLabel = "Add Expense",
  loading = false,
}: ExpenseFormProps) {
  const [amount, setAmount] = React.useState(
    initialData?.amount?.toString() ?? ""
  );
  const [description, setDescription] = React.useState(
    initialData?.description ?? ""
  );
  const [categoryId, setCategoryId] = React.useState<string | null>(
    initialData?.category_id ?? null
  );
  const [date, setDate] = React.useState(
    initialData?.date ?? new Date().toISOString().split("T")[0]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) return;
    onSubmit({
      amount: parsedAmount,
      description,
      category_id: categoryId,
      date,
    });
    if (!initialData) {
      setAmount("");
      setDescription("");
      setCategoryId(null);
      setDate(new Date().toISOString().split("T")[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-2">
        <div className="flex-1 space-y-2">
          <Label htmlFor="amount">Amount ($)</Label>
          <Input
            id="amount"
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="flex-1 space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          placeholder="What did you spend on?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Category</Label>
        <CategoryPicker
          categories={categories}
          value={categoryId}
          onChange={setCategoryId}
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Saving..." : submitLabel}
      </Button>
    </form>
  );
}
