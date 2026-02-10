import { supabase } from "./client";

// ── Types ────────────────────────────────────────────────────────────────────

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
  created_at: string;
}

export interface Expense {
  id: string;
  amount: number;
  description: string;
  category_id: string | null;
  date: string;
  created_at: string;
}

export interface ExpenseWithCategory extends Expense {
  categories: Category | null;
}

// ── Categories ───────────────────────────────────────────────────────────────

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");
  if (error) throw error;
  return data ?? [];
}

export async function createCategory(
  category: Pick<Category, "name" | "color" | "icon">
): Promise<Category> {
  const { data, error } = await supabase
    .from("categories")
    .insert(category)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateCategory(
  id: string,
  updates: Partial<Pick<Category, "name" | "color" | "icon">>
): Promise<Category> {
  const { data, error } = await supabase
    .from("categories")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteCategory(id: string): Promise<void> {
  const { error } = await supabase.from("categories").delete().eq("id", id);
  if (error) throw error;
}

// ── Expenses ─────────────────────────────────────────────────────────────────

export async function getExpenses(filters?: {
  startDate?: string;
  endDate?: string;
  categoryId?: string;
}): Promise<ExpenseWithCategory[]> {
  let query = supabase
    .from("expenses")
    .select("*, categories(*)")
    .order("date", { ascending: false })
    .order("created_at", { ascending: false });

  if (filters?.startDate) {
    query = query.gte("date", filters.startDate);
  }
  if (filters?.endDate) {
    query = query.lte("date", filters.endDate);
  }
  if (filters?.categoryId) {
    query = query.eq("category_id", filters.categoryId);
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as ExpenseWithCategory[];
}

export async function createExpense(
  expense: Pick<Expense, "amount" | "description" | "category_id" | "date">
): Promise<Expense> {
  const { data, error } = await supabase
    .from("expenses")
    .insert(expense)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateExpense(
  id: string,
  updates: Partial<Pick<Expense, "amount" | "description" | "category_id" | "date">>
): Promise<Expense> {
  const { data, error } = await supabase
    .from("expenses")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteExpense(id: string): Promise<void> {
  const { error } = await supabase.from("expenses").delete().eq("id", id);
  if (error) throw error;
}

// ── Analytics helpers ────────────────────────────────────────────────────────

export async function getExpensesByDateRange(
  startDate: string,
  endDate: string
): Promise<ExpenseWithCategory[]> {
  return getExpenses({ startDate, endDate });
}
