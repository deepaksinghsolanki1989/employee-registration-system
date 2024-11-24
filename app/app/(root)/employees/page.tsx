// "use client";
import React from "react";
import Sort from "@/components/Sort";
import { Input } from "@/components/ui/input";
import Image from "next/image";
// import { Models } from "node-appwrite";
// import Card from "@/components/Card";
// import { getFileTypesParams } from "@/lib/utils";
import { Payment, columns } from "./columns";
// import { DataTable } from "./data-table";
import DataTable from "./data-table";

interface SearchParamProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "m5gr84i9",
      amount: 316,
      status: "success",
      email: "ken99@yahoo.com",
    },
    {
      id: "3u1reuv4",
      amount: 242,
      status: "success",
      email: "Abe45@gmail.com",
    },
    {
      id: "derv1ws0",
      amount: 837,
      status: "processing",
      email: "Monserrat44@gmail.com",
    },
    {
      id: "5kma53ae",
      amount: 874,
      status: "success",
      email: "Silas22@gmail.com",
    },
    {
      id: "bhqecj4p",
      amount: 721,
      status: "failed",
      email: "carmella@hotmail.com",
    },
    {
      id: "3u1reuv4",
      amount: 242,
      status: "success",
      email: "Abe45@gmail.com",
    },
    {
      id: "derv1ws0",
      amount: 837,
      status: "processing",
      email: "Monserrat44@gmail.com",
    },
    {
      id: "5kma53ae",
      amount: 874,
      status: "success",
      email: "Silas22@gmail.com",
    },
    {
      id: "bhqecj4p",
      amount: 721,
      status: "failed",
      email: "carmella@hotmail.com",
    },
    {
      id: "derv1ws0",
      amount: 837,
      status: "processing",
      email: "Monserrat44@gmail.com",
    },
    {
      id: "5kma53ae",
      amount: 874,
      status: "success",
      email: "Silas22@gmail.com",
    },
    {
      id: "bhqecj4p",
      amount: 721,
      status: "failed",
      email: "carmella@hotmail.com",
    },
  ];
}

const Employees = async ({ searchParams }: SearchParamProps) => {
  const data = await getData();
  const searchText = ((await searchParams)?.query as string) || "";
  const sort = ((await searchParams)?.sort as string) || "";

  return (
    <div className="page-container">
      <section className="w-full">
        <h1 className="h1 capitalize">Employees</h1>
      </section>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default Employees;
