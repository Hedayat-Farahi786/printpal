"use client";

import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Order, ShippingAddress } from "@prisma/client";
import StatusDropdown from "./StatusDropdown";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2Icon, CheckIcon, ClipboardIcon } from "lucide-react";
import { toast, useToast } from "@/hooks/use-toast";
import { useState } from "react";


  type OrderWithUserAndAddress = {
    id: string;
    user: {
      email: string;
    };
    shippingAddress: ShippingAddress | null;
    amount: number;
    isPaid: boolean;
    createdAt: Date;
    // Add other fields as needed
  };

let data: OrderWithUserAndAddress[] = [];

export const columns: ColumnDef<OrderWithUserAndAddress>[] = [
//   {
//     id: "select",
//     header: ({ table }) => (
//       <Checkbox
//         checked={
//           table.getIsAllPageRowsSelected() ||
//           (table.getIsSomePageRowsSelected() && "indeterminate")
//         }
//         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//         aria-label="Select all"
//       />
//     ),
//     cell: ({ row }) => (
//       <Checkbox
//         checked={row.getIsSelected()}
//         onCheckedChange={(value) => row.toggleSelected(!!value)}
//         aria-label="Select row"
//       />
//     ),
//     enableSorting: false,
//     enableHiding: false,
//   },
  {
    accessorKey: "id",
    header: () => <div className="text-left">Order Number</div>,
    cell: ({ row }) => {
      const id: string = row.getValue("id");
      const shortId = id.slice(0, 12); // Show only first 6 characters
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [copied, setCopied] = useState(false); // State to track copy action

      const handleCopy = () => {
        navigator.clipboard.writeText(id); // Copy the full id to clipboard
        setCopied(true); // Set state to show checkmark
        // toast("ID copied to clipboard!"); // Show toast notification

        // Reset the icon after 1.5 seconds
        setTimeout(() => {
          setCopied(false);
        }, 1500);
      };

      return (
        <div className="relative group text-left text-xs font-medium flex items-center">
          {/* Display partial id */}
          {shortId}...
          {/* Copy Icon, only visible on hover */}
          <button
            onClick={handleCopy}
            className="absolute right-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            {copied ? (
              <CheckCircle2Icon
                className="h-4 w-4 text-green-600 transform scale-0 transition-transform duration-500 ease-out"
                style={{ transform: copied ? "scale(1)" : "scale(0)" }}
              />
            ) : (
              <ClipboardIcon className="h-4 w-4 text-gray-600 hover:text-gray-800" />
            )}
          </button>
        </div>
      );
    },
  },
  {
    accessorKey: "user",
    header: ({ column }) => {
      console.log(column);
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Customer
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div>
        <div className="font-medium">{row.original?.shippingAddress?.name}</div>
        <div className="hidden text-sm text-muted-foreground md:inline">
          {row.original?.user?.email || "No email available"}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <StatusDropdown
        id={row.original.id}
        orderStatus={row.getValue("status")}
      />
    ),
  },
  {
    accessorKey: "createdAt",
    header: () => <div>Purchase Date</div>,
    cell: ({ row }) => (
      <div className="font-medium">
        {new Date(row.getValue("createdAt"))?.toLocaleDateString("de-DE", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true, // Use 24-hour format
        })}
      </div>
    ),
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-center">Amount</div>,
    cell: ({ row }) => (
      <div className="text-center font-medium">
        {formatPrice(row.getValue("amount"))}
      </div>
    ),
  },
  {
    accessorKey: "isPaid",
    header: () => <div className="text-left">Payment</div>,
    cell: ({ row }) => {
      return row.getValue("isPaid") ? (
        <Badge>Paid</Badge>
      ) : (
        <Badge variant="destructive">Not Paid</Badge>
      );
    },
  },
//   {
//     id: "actions",
//     enableHiding: false,
//     cell: ({ row }) => {
//       const payment = row.original;

//       return (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" className="h-8 w-8 p-0">
//               <span className="sr-only">Open menu</span>
//               <DotsHorizontalIcon className="h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuLabel>Actions</DropdownMenuLabel>
//             <DropdownMenuItem
//               onClick={() => navigator.clipboard.writeText(payment.id)}
//             >
//               Copy payment ID
//             </DropdownMenuItem>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem>View customer</DropdownMenuItem>
//             <DropdownMenuItem>View payment details</DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       );
//     },
//   },
];


export function DataTable({ orders }: { orders: OrderWithUserAndAddress[] }) {
  const toast = useToast(); // Moved inside the component
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: orders,
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

  return (
    <div className="w-full">
          <h1 className="text-4xl font-bold tracking-tight mb-5">Incoming orders</h1>
      {/* <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={
            (table.getColumn("user.email")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("user.email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div> */}
      <div className="rounded-md border bg-white p-5">
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

      <div className="flex items-center justify-between space-x-2 py-4">
        {/* Showing how many of how much on the left */}
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getRowModel().rows.length > 0
            ? `${
                table.getState().pagination.pageIndex *
                  table.getState().pagination.pageSize +
                1
              }-
          ${Math.min(
            (table.getState().pagination.pageIndex + 1) *
              table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length
          )} of ${table.getFilteredRowModel().rows.length}`
            : "0 of 0"}{" "}
          order(s) displayed.
        </div>

        {/* Pagination and items per page dropdown on the right */}
        <div className="flex items-center space-x-2">
          {/* Custom Dropdown for columns */}
          <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
          {/* Custom Dropdown for items per page */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Show {table.getState().pagination.pageSize} <ChevronDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <DropdownMenuItem
                  key={pageSize}
                  onClick={() => table.setPageSize(pageSize)}
                >
                  Show {pageSize}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Previous and Next buttons with page numbers */}
          <div className="flex items-center space-x-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>

            {/* Page Numbers */}
            {Array.from({ length: table.getPageCount() }, (_, i) => (
              <Button
                key={i}
                variant={
                  i === table.getState().pagination.pageIndex
                    ? "ghost"
                    : "outline"
                } // Highlight active page
                size="sm"
                onClick={() => table.setPageIndex(i)}
              >
                {i + 1}
              </Button>
            ))}

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
    </div>
  );
}
