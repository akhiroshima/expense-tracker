"use client";

import * as React from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";

type ComponentExampleProps = {
  id: string;
};

export function ComponentExample({ id }: ComponentExampleProps) {
  switch (id) {
    case "button":
      return (
        <div className="flex flex-wrap gap-2">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
        </div>
      );
    case "input":
      return (
        <div className="space-y-2">
          <Label htmlFor="input-example">Email</Label>
          <Input id="input-example" placeholder="you@example.com" />
        </div>
      );
    case "label":
      return (
        <div className="space-y-2">
          <Label htmlFor="label-example">Username</Label>
          <Input id="label-example" placeholder="hiroshima" />
        </div>
      );
    case "textarea":
      return (
        <Textarea placeholder="Write a short note..." className="min-h-24" />
      );
    case "card":
      return (
        <Card>
          <CardHeader>
            <CardTitle>Workshop Card</CardTitle>
            <CardDescription>Cards group related content.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            This is a nested card example.
          </CardContent>
        </Card>
      );
    case "badge":
      return (
        <div className="flex flex-wrap items-center gap-2">
          <Badge>New</Badge>
          <Badge variant="secondary">Beta</Badge>
        </div>
      );
    case "tabs":
      return (
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="text-sm text-muted-foreground">
            Tabs let you switch between sections.
          </TabsContent>
          <TabsContent value="details" className="text-sm text-muted-foreground">
            This is the details tab content.
          </TabsContent>
        </Tabs>
      );
    case "dialog":
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Open Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dialog Title</DialogTitle>
              <DialogDescription>
                Use dialogs for focused tasks.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );
    case "alert-dialog":
      return (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    case "popover":
      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Open Popover</Button>
          </PopoverTrigger>
          <PopoverContent className="text-sm text-muted-foreground">
            Popovers are great for contextual details.
          </PopoverContent>
        </Popover>
      );
    case "dropdown-menu":
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Open Menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    case "table":
      return (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Component</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Button</TableCell>
              <TableCell>Ready</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Dialog</TableCell>
              <TableCell>Ready</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
    case "select":
      return (
        <Select defaultValue="option-1">
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option-1">Option 1</SelectItem>
            <SelectItem value="option-2">Option 2</SelectItem>
            <SelectItem value="option-3">Option 3</SelectItem>
          </SelectContent>
        </Select>
      );
    case "switch":
      return (
        <div className="flex items-center gap-2">
          <Switch id="switch-example" />
          <Label htmlFor="switch-example">Enabled</Label>
        </div>
      );
    case "calendar": {
      const [selected, setSelected] = React.useState<Date | undefined>(
        new Date()
      );
      return (
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">
            Selected: {selected ? selected.toDateString() : "None"}
          </div>
          <Calendar
            mode="single"
            selected={selected}
            onSelect={setSelected}
            className="rounded-md border"
          />
        </div>
      );
    }
    case "sonner":
      return (
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            onClick={() => toast("Hello from Sonner")}
          >
            Show Toast
          </Button>
          <Button onClick={() => toast.success("Success!")}>Success</Button>
        </div>
      );
    default:
      return (
        <div className="text-sm text-muted-foreground">Example coming soon.</div>
      );
  }
}
