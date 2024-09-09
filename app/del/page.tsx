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
    giv_id:z.string(),
    /*
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
    */
  });

export default function() {
  // ...
  const router = useRouter();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    /*
    const data = {
        id:values.giv_id,
    }
    */
   const id = values.giv_id;
    try {
        // Make sure to wait for the request to complete
        await axios.post(`http://localhost:5000/posts/${id}`);
        alert("Blog deleted successfully");
        
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
      giv_id:"",
    },
  })
  return (
    <div className="h-screen w-screen flex justify-center items-center">
        <div className="shadow-lg rounded-md w-1/2">
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="giv_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Id</FormLabel>
              <FormControl>
                <Input placeholder="id " {...field} />
              </FormControl>
              <FormDescription>
                Enter the id to delete
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Delete</Button>
      </form>
    </Form>
        </div>
        
    </div>
    
  )
}
