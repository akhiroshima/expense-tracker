import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { componentExamples } from "./data";
import { ComponentExample } from "./examples";

export default function ComponentsPage() {
  return (
    <main className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <header className="space-y-3">
          <Button asChild variant="ghost" className="w-fit">
            <Link href="/">← Back</Link>
          </Button>
          <h1 className="text-3xl font-semibold">Installed Components</h1>
          <p className="text-muted-foreground">
            Local, runnable examples for every shadcn/ui component included in this repo.
          </p>
        </header>
        <div className="grid gap-4 md:grid-cols-2">
          {componentExamples.map((example) => (
            <Card key={example.id}>
              <CardHeader>
                <CardTitle>{example.name}</CardTitle>
                <CardDescription>{example.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ComponentExample id={example.id} />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
