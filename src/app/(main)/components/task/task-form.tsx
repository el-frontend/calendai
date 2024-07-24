"use client";

import AdvanceEditor from "@/components/rich_editor/advance-editor";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { z } from "zod";
import PostDateField from "./fields/post-date";
import { taskFormSchema } from "./task-schema";

type Props = {
  onSubmitTask: (values: z.infer<typeof taskFormSchema>) => void;
};

const TaskForm: React.FC<Props> = ({ onSubmitTask }) => {
  const form = useFormContext<z.infer<typeof taskFormSchema>>();

  function onSubmit(values: z.infer<typeof taskFormSchema>) {
    onSubmitTask(values);
  }
  
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 p-2"
        id="task-form"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Some Title Here" {...field} />
              </FormControl>
              <FormDescription>Enter the title of the task.</FormDescription>
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
                <AdvanceEditor
                  onChange={field.onChange}
                  initialValue={field.value}
                />
              </FormControl>
              <FormDescription>You can use markdown format</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input placeholder="tags" {...field} />
              </FormControl>
              <FormDescription>
                Enter the tags separated by coma.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <PostDateField
          control={form.control}
          name="postDate"
          label="Post Date"
        />
      </form>
    </Form>
  );
};

export default TaskForm;
