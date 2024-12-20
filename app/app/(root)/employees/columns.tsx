import { ColumnDef } from "@tanstack/react-table";
import ActionDropdown from "@/components/ActionDropdown";
import {
  APPROVE_EMPLOYEE,
  DELETE_EMPLOYEE,
  GET_EMPLOYEES,
} from "@/redux/action.types";
import DetailRow from "@/components/DetailRow";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

const actionsDropdownItems = [
  {
    label: "Details",
    icon: "/assets/icons/info.svg",
    value: "details",
  },
  {
    label: "Approve",
    icon: "/assets/icons/edit.svg",
    value: "approve",
    type: APPROVE_EMPLOYEE,
  },
  {
    label: "Delete",
    icon: "/assets/icons/delete.svg",
    value: "delete",
    type: DELETE_EMPLOYEE,
  },
];

const renderDetails = (data: Employee) => (
  <div className="space-y-4 px-2 pt-2">
    <DetailRow label="Employee Name:" value={data.fullName} />
    <DetailRow label="Employee Code:" value={data.employeeCode} />
    <DetailRow label="Email:" value={data.email} />
    <DetailRow
      label="isActive:"
      value={data.isActive ? "Approved" : "Not Approved"}
    />
    <DetailRow
      label="Created At:"
      value={new Intl.DateTimeFormat("en", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }).format(new Date(data.createdAt))}
    />
  </div>
);

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: "fullName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Employee Name
          <ArrowUpDown />
        </Button>
      );
    },
  },
  {
    accessorKey: "employeeCode",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Employee Code
          <ArrowUpDown />
        </Button>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown />
        </Button>
      );
    },
  },
  {
    accessorKey: "isActive",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Approved?
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (row.getValue("isActive") ? "Approved" : "Not Approved"),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      return new Intl.DateTimeFormat("en", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }).format(new Date(row.getValue("createdAt")));
    },
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const isActive = row.getValue("isActive");

      return (
        <ActionDropdown
          name="employees"
          renderDetails={renderDetails}
          actionsDropdownItems={actionsDropdownItems.filter((item) =>
            item.value === "approve" ? !isActive : true
          )}
          data={row.original}
          fetchAction={GET_EMPLOYEES}
        />
      );
    },
  },
];
