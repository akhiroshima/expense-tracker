"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Category } from "@/lib/supabase/queries";

interface CategoryPickerProps {
  categories: Category[];
  value: string | null;
  onChange: (categoryId: string | null) => void;
  placeholder?: string;
  allowClear?: boolean;
}

export function CategoryPicker({
  categories,
  value,
  onChange,
  placeholder = "Select category",
  allowClear = false,
}: CategoryPickerProps) {
  return (
    <Select
      value={value ?? ""}
      onValueChange={(v) => onChange(v === "__clear__" ? null : v)}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {allowClear && (
          <SelectItem value="__clear__">
            <span className="text-muted-foreground">All categories</span>
          </SelectItem>
        )}
        {categories.map((cat) => (
          <SelectItem key={cat.id} value={cat.id}>
            <span className="flex items-center gap-2">
              <span
                className="inline-block size-3 rounded-full"
                style={{ backgroundColor: cat.color }}
              />
              {cat.name}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
