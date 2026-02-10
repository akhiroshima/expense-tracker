"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircleIcon } from "lucide-react";

export function SetupBanner() {
  return (
    <Card className="border-destructive/50 bg-destructive/5">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <AlertCircleIcon className="size-5 text-destructive" />
          <CardTitle className="text-lg">Supabase Not Configured</CardTitle>
        </div>
        <CardDescription>
          The app needs a Supabase connection to store expenses. Follow these
          steps:
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
          <li>
            Create a free project at{" "}
            <a
              href="https://supabase.com/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-foreground"
            >
              supabase.com/dashboard
            </a>
          </li>
          <li>
            Go to <strong>Project Settings → API</strong> and copy your{" "}
            <Badge variant="outline" className="font-mono text-xs">
              Project URL
            </Badge>{" "}
            and{" "}
            <Badge variant="outline" className="font-mono text-xs">
              anon public key
            </Badge>
          </li>
          <li>
            Create a <code className="font-mono text-xs">.env.local</code> file
            in the project root:
          </li>
        </ol>
        <pre className="rounded-lg bg-muted p-3 text-xs font-mono overflow-x-auto">
          {`NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here`}
        </pre>
        <ol start={4} className="list-decimal list-inside space-y-2 text-muted-foreground">
          <li>
            Run the SQL setup script from{" "}
            <code className="font-mono text-xs">sql/setup.sql</code> in the
            Supabase SQL Editor
          </li>
          <li>Restart the dev server</li>
        </ol>
      </CardContent>
    </Card>
  );
}
