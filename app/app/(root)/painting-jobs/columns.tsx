import { ColumnDef } from "@tanstack/react-table";
import ActionDropdown from "@/components/ActionDropdown";
import { DELETE_PAINTING_JOB, GET_PAINTING_JOBS } from "@/redux/action.types";
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
    label: "Delete",
    icon: "/assets/icons/delete.svg",
    value: "delete",
    type: DELETE_PAINTING_JOB,
  },
];

const renderDetails = (data: PaintingJob) => (
  <div className="space-y-4 px-2 pt-2">
    <DetailRow label="Title:" value={data.title} />
    <DetailRow label="Description:" value={data.description} />
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

export const columns: ColumnDef<PaintingJob>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown />
        </Button>
      );
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Description
          <ArrowUpDown />
        </Button>
      );
    },
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
      return (
        <ActionDropdown
          name="paintingJobs"
          renderDetails={renderDetails}
          actionsDropdownItems={actionsDropdownItems}
          data={row.original}
          fetchAction={GET_PAINTING_JOBS}
        />
      );
    },
  },
];
