"use client"
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from 'next/link'
/*
Hello world
      <Button >this is a button</Button>
      <Card>
        <CardTitle>This is title</CardTitle>
        <CardDescription>this is a small card</CardDescription>
        <CardContent>this will tell you about lorem ipsum</CardContent>
      </Card>
*/
export default function Home() {
  const [all_blogs, setblogs]: any = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/posts');
        setblogs(response.data);
      }
      catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  return( 
    <div>
      <div className="grid grid-cols-4 gap-2">
        {all_blogs.map((row: any) => {
          return (
            <Link className="m-3 text-center" href={`/blogs/${row.id}`}>
              <Card>
                <CardHeader>{row.id}</CardHeader>
                <CardTitle >{row.title}</CardTitle>
                <CardContent >{row.content}</CardContent>
                <CardFooter>{row.name}</CardFooter>
              </Card>
            </Link>
          )
        })}
      </div>
      <div className="m-4">
        <Link href={'/crpost/'}>
        <Button className="m-2">Add blog</Button>
        </Link>
        <Button>Detete Blog</Button>
      </div>
    </div>
  );
}
