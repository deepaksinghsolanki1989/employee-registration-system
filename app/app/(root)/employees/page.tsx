"use client";

import React, { useEffect } from "react";
import { columns } from "./columns";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "@/components/DataTable";
import { RootState } from "@/redux/store";
import { GET_EMPLOYEES } from "@/redux/action.types";

const Employees = () => {
  const dispatch = useDispatch();
  const { employees } = useSelector((state: RootState) => state.employees);

  useEffect(() => {
    dispatch({ type: GET_EMPLOYEES });
  }, []);

  return (
    <div className="page-container">
      <section className="w-full">
        <h1 className="h1 capitalize">Employees</h1>
      </section>
      <DataTable columns={columns} data={employees} />
    </div>
  );
};

export default Employees;
