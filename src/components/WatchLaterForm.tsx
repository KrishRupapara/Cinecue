"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { Toaster } from "./ui/sonner";
import { Icons } from "./ui/icons";

const FormSchema = z.object({
  title: z.string(),
  platform: z.string(),
  link: z.string(),
});

type FormSchemaType = z.infer<typeof FormSchema>;

export default function WatchLaterForm({
  title,
  id,
  type,
  userId,
}: {
  title: string;
  id: number;
  type: string;
  userId: string;
}) {
  const [loading, setLoading] = useState(false);

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues: {
      title: title,
      platform: "",
      link: "",
    },
  });

  function onSubmit(e: FormSchemaType) {
    setLoading(true);

    const data = { ...e, id, title, type, userId };

    const res = fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/add/watchlist`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.message === "added") {
          toast.success("Successfully added");
        } else {
          toast.error("Please try again!");
        }
      });
  }

  return (
    <Form {...form}>
      <Toaster richColors />
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="title" {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="platform"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Platform</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose the platform..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Netflix">Netflix</SelectItem>
                  <SelectItem value="Amazon prime">Amazon prime</SelectItem>
                  <SelectItem value="Disney+">Disney+</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link</FormLabel>
              <FormControl>
                <Input placeholder="Enter link to watch it." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-center">
          <Button type="submit" className="px-8 mt-3">
            {loading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
