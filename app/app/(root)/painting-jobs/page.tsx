"use client";

import React, { useEffect } from "react";
import { columns } from "./columns";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "@/components/DataTable";
import { RootState } from "@/redux/store";
import { GET_PAINTING_JOBS } from "@/redux/action.types";
import Card from "@/components/Card";

const PaintingJobs = () => {
  const dispatch = useDispatch();
  const { user, paintingJobs } = useSelector((state: RootState) => {
    return {
      user: state.auth.user,
      paintingJobs: state.paintingJobs.paintingJobs,
    };
  });

  useEffect(() => {
    dispatch({ type: GET_PAINTING_JOBS });
  }, []);

  return (
    <div className="page-container">
      <section className="w-full">
        <h1 className="h1 capitalize">Painting Jobs</h1>
      </section>
      {user?.employeeCode === "" && (
        <DataTable columns={columns} data={paintingJobs} />
      )}
      {user?.employeeCode !== "" &&
        (paintingJobs.length > 0 ? (
          <section className="file-list">
            {paintingJobs.map((paintingJob) => (
              <Card key={paintingJob.id} data={paintingJob} />
            ))}
          </section>
        ) : (
          <p className="empty-list">No painting jobs available</p>
        ))}
    </div>
  );
};

export default PaintingJobs;
