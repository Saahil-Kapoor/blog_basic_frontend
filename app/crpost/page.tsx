"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import axios from "axios"


const formSchema = z.object({
    name: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    title:z.string().min(5,{
        message:"title should be atleast 3 character"
    }
    ).max(50),
    content:z.string().max(500,{
        message:"can only contain 500 words"
    }).min(5)
  });

export default function() {
  // ...
  const router = useRouter();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const data = {
        name: values.name,
        title: values.title,
        content: values.content
    }
    try {
        // Make sure to wait for the request to complete
        await axios.post('http://localhost:5000/posts', data);
        alert("Blog created successfully");
        
        // Navigate to the home page after successful request
        router.push('/');
    } catch (error) {
        console.error("Error creating blog:", error);
        alert("There was an error creating the blog.");
    }

    // Logging the form values
    console.log(values);
  }
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name:"",
      title:"",
      content:""
    },
  })
  return (
    <div className="h-screen w-screen flex justify-center items-center">
        <div className="shadow-lg rounded-md w-1/2">
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="name " {...field} />
              </FormControl>
              <FormDescription>
                Name of the author
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title " {...field} />
              </FormControl>
              <FormDescription>
                Title of the blog
              </FormDescription>
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
                <Input placeholder="Content" {...field} />
              </FormControl>
              <FormDescription>
                Content of the blog
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
        </div>
        
    </div>
    
  )
}
