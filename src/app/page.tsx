"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { MoonIcon, SunIcon } from "lucide-react";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? theme === "dark" : true;

  return (
    <main className="min-h-screen flex items-center justify-center bg-background p-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle className="text-2xl">Cursor Workshop</CardTitle>
            <Badge variant="secondary">Hiroshima v1</Badge>
            <div className="flex items-center gap-1 rounded-full border px-2 py-1">
              {isDark ? (
                <MoonIcon className="size-4 text-foreground" />
              ) : (
                <SunIcon className="size-4 text-foreground" />
              )}
              <Switch
                checked={isDark}
                onCheckedChange={(checked) =>
                  setTheme(checked ? "dark" : "light")
                }
                aria-label="Toggle dark mode"
              />
            </div>
          </div>
          <CardDescription>
            Everything is set up and ready to go. Start building with Cursor!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="demo-input">Try typing something</Label>
            <Input id="demo-input" placeholder="Hello from shadcn/ui..." />
          </div>
          <Button asChild className="w-full">
            <Link href="/components">Get Started</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
