"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, Filter, X } from "lucide-react";
import type { Candidate } from "./columns";
import { toast } from "sonner";

interface DataTableProps {
  columns: ColumnDef<Candidate, unknown>[];
  data: Candidate[];
}

export function DataTable({ columns, data }: DataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  // Additional filter states
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [locationFilter, setLocationFilter] = React.useState<string>("all");
  const [experienceMin, setExperienceMin] = React.useState<string>("");
  const [experienceMax, setExperienceMax] = React.useState<string>("");
  const [showFilters, setShowFilters] = React.useState(false);

  // Filter the data based on our custom filters
  const filteredData = React.useMemo(() => {
    let filtered = data;

    if (statusFilter !== "all") {
      filtered = filtered.filter((c) => c.status === statusFilter);
    }

    if (locationFilter !== "all") {
      filtered = filtered.filter((c) => c.location === locationFilter);
    }

    if (experienceMin) {
      const min = Number.parseInt(experienceMin, 10);
      if (!Number.isNaN(min)) filtered = filtered.filter((c) => c.experience >= min);
    }

    if (experienceMax) {
      const max = Number.parseInt(experienceMax, 10);
      if (!Number.isNaN(max)) filtered = filtered.filter((c) => c.experience <= max);
    }

    return filtered;
  }, [data, statusFilter, locationFilter, experienceMin, experienceMax]);

  const table = useReactTable({
    data: filteredData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  // Unique options for selects
  const uniqueLocations = React.useMemo(
    () => Array.from(new Set(data.map((c) => c.location))).sort(),
    [data]
  );

  const uniqueStatuses = React.useMemo(
    () => Array.from(new Set(data.map((c) => c.status))).sort(),
    [data]
  );

  // ---- Helpers for the name/email text filter (column id: "firstName") ----
  const getFirstNameFilterValue = () => {
    const raw = table.getColumn("firstName")?.getFilterValue();
    return typeof raw === "string" ? raw : "";
  };

  const getFirstNameFilterValueTrimmed = () => getFirstNameFilterValue().trim();

  // Count any active table column filters robustly
  const tableFiltersActive = table
    .getState()
    .columnFilters.some((f) => {
      const v = f.value as unknown;
      if (typeof v === "string") return v.trim().length > 0;
      if (Array.isArray(v)) return v.length > 0;
      // counts numbers/booleans and non-null objects as active
      return v != null && v !== "";
    });

  // Final active filter count (custom + table)
  const activeFiltersCount =
    [
      statusFilter !== "all",
      locationFilter !== "all",
      experienceMin !== "",
      experienceMax !== "",
      tableFiltersActive,
    ].filter(Boolean).length;

  const clearAllFilters = () => {
    // Clear custom filter states
    setStatusFilter("all");
    setLocationFilter("all");
    setExperienceMin("");
    setExperienceMax("");

    // Clear table column filters (use undefined to fully clear)
    table.getColumn("firstName")?.setFilterValue(undefined);
    table.resetColumnFilters();

    // Reset table sorting and pagination
    table.resetSorting();
    table.setPageIndex(0);

    // Reset row selection
    setRowSelection({});

    toast.success("All filters cleared!");
  };

  // Keep input & table value in sync and normalize whitespace-only to empty
  React.useEffect(() => {
    const col = table.getColumn("firstName");
    if (!col) return;
    const current = col.getFilterValue();
    if (typeof current === "string" && current.trim() === "") {
      col.setFilterValue(undefined);
    }
  }, [table]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Filter by name or email..."
            value={getFirstNameFilterValue()}
            onChange={(e) => table.getColumn("firstName")?.setFilterValue(e.target.value)}
            className="max-w-sm"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters((s) => !s)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 text-xs">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
          {activeFiltersCount > 0 && (
            <Button
              variant="secondary"
              size="sm"
              onClick={clearAllFilters}
              className="flex items-center gap-2 hover:bg-muted"
            >
              <X className="h-4 w-4" />
              Clear All ({activeFiltersCount})
            </Button>
          )}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="mb-4 rounded-lg border bg-muted/50 p-4">
          {/* 
          <div className="mb-2 rounded bg-yellow-50 p-2 text-xs text-yellow-800">
            <strong>Debug:</strong> Count: {activeFiltersCount} | Text Filter: “
            {getFirstNameFilterValueTrimmed()}”
          </div>
          */}

          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-medium">Advanced Filters</h3>
            {activeFiltersCount > 0 && (
              <div className="text-xs text-muted-foreground">
                {activeFiltersCount} active filter{activeFiltersCount !== 1 ? "s" : ""}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Status Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  {uniqueStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Location Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All locations</SelectItem>
                  {uniqueLocations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Experience Min */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Min Experience (years)</label>
              <Input
                type="number"
                placeholder="0"
                value={experienceMin}
                onChange={(e) => setExperienceMin(e.target.value)}
                min="0"
                max="50"
              />
            </div>

            {/* Experience Max */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Max Experience (years)</label>
              <Input
                type="number"
                placeholder="50"
                value={experienceMax}
                onChange={(e) => setExperienceMax(e.target.value)}
                min="0"
                max="50"
              />
            </div>
          </div>
        </div>
      )}

      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
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
    </div>
  );
}