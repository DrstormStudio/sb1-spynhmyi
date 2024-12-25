"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase/client";
import { TiptapEditor } from "../editor/tiptap-editor";

const formSchema = z.object({
  title: z.string().min(1).max(100),
  content: z.string(),
});

interface PageFormProps {
  workspaceId: string;
  parentId?: string;
  initialData?: {
    id: string;
    title: string;
    content: string;
  };
  onSuccess?: () => void;
}

export function PageForm({
  workspaceId,
  parentId,
  initialData,
  onSuccess,
}: PageFormProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || "",
      content: initialData?.content || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      
      const {
        data: { user },
      } = await supabase.auth.getUser();
       <boltAction type="file" filePath="components/page/page-form.tsx">      if (!user) throw new Error("Not authenticated");

      if (initialData) {
        const { error } = await supabase
          .from("pages")
          .update({
            title: values.title,
            content: values.content,
            updated_by: user.id,
          })
          .eq("id", initialData.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("pages")
          .insert({
            workspace_id: workspaceId,
            parent_id: parentId,
            title: values.title,
            content: values.content,
            created_by: user.id,
            updated_by: user.id,
          });

        if (error) throw error;
      }

      toast({
        title: "Success",
        description: `Page ${initialData ? "updated" : "created"} successfully.`,
      });

      router.refresh();
      onSuccess?.();
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Page Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <TiptapEditor
                  content={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {initialData ? "Update" : "Create"} Page
        </Button>
      </form>
    </Form>
  );
}