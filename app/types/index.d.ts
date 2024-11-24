/* eslint-disable no-unused-vars */
declare type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

declare type FormType = "sign-in" | "sign-up";
declare type ActionsDropdownItem = {
  label: string;
  icon: string;
  value: string;
  action?: string;
};

declare interface ActionType {
  label: string;
  icon: string;
  value: string;
  type?: string;
}

declare interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

// Auth Slice
declare interface AuthSliceState {
  user: {
    id: string;
    fullName: string;
    employeeCode: string;
    email: string;
  } | null;
  loading: boolean;
  error: string | string[] | null;
  success: boolean | null;
}

declare interface SignUpPayload {
  fullName: string;
  employeeCode: string;
  email: string;
  password: string;
}

declare interface SignInPayload {
  email: string;
  password: string;
}

// Employeers
declare type Employee = {
  id: string;
  fullName: string;
  employeeCode: string;
  email: string;
  isActive: boolean;
  createdAt: string;
};

declare interface EmployeesSliceState {
  employees: Employee[];
  loading: boolean;
  error: string | string[] | null;
  success: boolean | null;
}

// Painting Jobs
declare type PaintingJobPayload = {
  id?: string;
  title: string;
  description: string;
};

declare type PaintingJob = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
};

declare interface PaintingJobsSliceState {
  paintingJobs: PaintingJob[];
  loading: boolean;
  error: string | string[] | null;
  success: boolean | null;
}
