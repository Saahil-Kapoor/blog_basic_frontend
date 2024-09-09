"use client"
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import axios from "axios";

import React from 'react'

export default function () {
    const { id } = useParams();
    const [data, setData]:any = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/posts/${id}`);
                setData(response.data);
            }
            catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);
    return (
        <div className="h-vh w-lvw">
                    <Card>
                        <CardHeader>{data.id}</CardHeader>
                        <CardTitle >{data.title}</CardTitle>
                        <CardContent >{data.content}</CardContent>
                        <CardFooter>{data.name}</CardFooter>
                    </Card>
        </div>
    );
}
