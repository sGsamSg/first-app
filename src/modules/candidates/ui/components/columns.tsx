"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"

// This type matches the candidate schema from the database
export type Candidate = {
  id: string
  userId: string
  firstName: string
  lastName: string
  email: string
  phone: string | null
  title: string
  experience: number
  location: string
  status: string
  skills: string | null
  appliedAt: string
  createdAt: string
  updatedAt: string
}

interface ColumnsProps {
  onEdit?: (candidate: Candidate) => void;
  onDelete?: (candidate: Candidate) => void;
  isDeleting?: (candidateId: string) => boolean;
}

export const createColumns = ({ onEdit, onDelete, isDeleting }: ColumnsProps = {}): ColumnDef<Candidate>[] => [
  {
    accessorKey: "firstName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const candidate = row.original
      
      return (
        <div>
          <div className="font-medium">
            {candidate.firstName} {candidate.lastName}
          </div>
          <div className="text-sm text-muted-foreground">
            {candidate.email}
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="font-medium">{row.getValue("title")}</div>,
  },
  {
    accessorKey: "experience",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Experience
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("experience")} years</div>,
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => <div>{row.getValue("location")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      
      return (
        <Badge 
          variant={
            status === "active" ? "default" :
            status === "placed" ? "secondary" :
            "outline"
          }
        >
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "appliedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Applied
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const appliedAt = row.getValue("appliedAt") as string
      return <div>{new Date(appliedAt).toLocaleDateString()}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const candidate = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(candidate.id)}
            >
              Copy candidate ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View profile</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit?.(candidate)}>
              Edit candidate
            </DropdownMenuItem>
            <DropdownMenuItem>Schedule interview</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-red-600"
              onClick={() => onDelete?.(candidate)}
              disabled={isDeleting?.(candidate.id)}
            >
              {isDeleting?.(candidate.id) ? "Deleting..." : "Delete candidate"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

// Keep the original columns export for backward compatibility
export const columns = createColumns();