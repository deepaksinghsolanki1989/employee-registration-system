"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "./ui/textarea";
import { CREATE_PAINTING_JOB, GET_PAINTING_JOBS } from "@/redux/action.types";
import { useToast } from "@/hooks/use-toast";
import ErrorMessages from "./ErrorMessages";

const getFormSchema = () => {
  return z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
  });
};

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");

  const path = usePathname();
  const { toast } = useToast();

  const dispatch = useDispatch();
  const { loading, success, error } = useSelector(
    (state: RootState) => state.paintingJobs
  );

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
    filterFns: {},
    globalFilterFn: "includesString",
  });

  const formSchema = getFormSchema();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  useEffect(() => {
    if (isModalOpen && !loading && success) {
      dispatch({ type: GET_PAINTING_JOBS });
      setIsModalOpen(false);
      form.reset();
      toast({
        description: (
          <p className="body-2 text-white">Painting Job created successfully</p>
        ),
        className: "success-toast",
      });
    }
  }, [loading, success]);

  function onSubmit(payload: z.infer<typeof formSchema>) {
    dispatch({ type: CREATE_PAINTING_JOB, payload });
  }

  return (
    <>
      <section className="grid w-full">
        <div className="table-query-section">
          <div className="search">
            <div className="search-input-wrapper">
              <Image
                src="/assets/icons/search.svg"
                alt="Search"
                width={24}
                height={24}
              />
              <Input
                placeholder="Search..."
                className="search-input"
                value={globalFilter}
                onChange={(event) => {
                  setGlobalFilter(event.target.value);
                }}
              />
            </div>
          </div>
          {path === "/painting-jobs" && (
            <Button
              onClick={() => setIsModalOpen(true)}
              className="form-submit-button w-[200px]"
            >
              <p className="capitalize">Add</p>
            </Button>
          )}
        </div>
      </section>
      <section className="grid w-full p-5 bg-white">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="table-row"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            Total {table.getRowCount()} row(s)
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </section>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="shad-dialog button">
          <DialogHeader className="flex flex-col gap-3">
            <DialogTitle className="text-center text-light-100">
              Create
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
              <ErrorMessages error={error} />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <div className="shad-form-item">
                      <FormLabel className="shad-form-label">Title</FormLabel>

                      <FormControl>
                        <Input
                          placeholder="Enter title"
                          className="shad-input"
                          {...field}
                        />
                      </FormControl>
                    </div>

                    <FormMessage className="shad-form-message" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <div className="shad-form-item">
                      <FormLabel className="shad-form-label">
                        Description
                      </FormLabel>

                      <FormControl>
                        <Textarea
                          placeholder="Enter your description"
                          className="shad-input"
                          {...field}
                        />
                      </FormControl>
                    </div>

                    <FormMessage className="shad-form-message" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="form-submit-button"
                disabled={loading}
              >
                Create
                {loading && (
                  <Image
                    src="/assets/icons/loader.svg"
                    alt="loader"
                    width={24}
                    height={24}
                    className="ml-2 animate-spin"
                  />
                )}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default DataTable;
