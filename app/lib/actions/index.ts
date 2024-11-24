"use client";

import { axiosClient } from "@/lib/actions/api";

export const signup = async (data: SignUpPayload) => {
  return await axiosClient.post("/signup", data);
};

export const signin = async (data: SignInPayload) => {
  return await axiosClient.post("/signin", data);
};

export const signout = async () => {
  return await axiosClient.get("/signout");
};

export const getCurrentUser = async () => {
  return await axiosClient.get("/user/me");
};

export const refreshToken = async () => {
  return await axiosClient.get("/refresh-token");
};

export const changePassword = async () => {};

export const getAllEmployees = async () => {
  return await axiosClient.get("/users");
};

export const approveEmployee = async (id: string) => {
  return await axiosClient.get(`/users/approve/${id}`);
};

export const deleteEmployee = async (id: string) => {
  return await axiosClient.delete(`/users/${id}`);
};

export const getAllPaintingJobs = async () => {
  return await axiosClient.get("/painting-jobs");
};

export const createPaintingJob = async (data: PaintingJobPayload) => {
  return await axiosClient.post("/painting-jobs", data);
};

export const deletePaintingJob = async (id: string) => {
  return await axiosClient.delete(`/painting-jobs/${id}`);
};
