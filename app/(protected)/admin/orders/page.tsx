"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Order {
  id: string;
  created_at: string;
  customer_name: string;
  email: string;
  is_confirmed: number;
  location: string;
  phone_number: string;
  total_price: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`);
        const data = await res.json();
        if (Array.isArray(data)) {
          setOrders(data);
        } else if (Array.isArray(data.orders)) {
          setOrders(data.orders);
        } else {
          setOrders([]);
        }
      } catch (err) {
        console.error("Failed to fetch orders", err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = orders.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">All Orders</h1>
        <div className="text-sm text-gray-500">
          {orders.length} total orders
        </div>
      </div>

      <div className="bg-white rounded-lg border p-5">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Price (GHS)</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: itemsPerPage }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="h-4 w-[120px] bg-gray-200" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[100px] bg-gray-200" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[140px] bg-gray-200" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[100px] bg-gray-200" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[160px] bg-gray-200" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[80px] bg-gray-200" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[80px] bg-gray-200" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-9 w-[80px] ml-auto bg-gray-200" />
                  </TableCell>
                </TableRow>
              ))
            ) : currentOrders.length > 0 ? (
              currentOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="whitespace-nowrap">
                    <div className="flex flex-col leading-tight">
                      <span className="text-sm font-medium text-gray-800">
                        {new Date(order.created_at).toLocaleDateString(
                          undefined,
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(order.created_at).toLocaleTimeString(
                          undefined,
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>{order.customer_name}</TableCell>
                  <TableCell>{order.email}</TableCell>
                  <TableCell>{order.phone_number}</TableCell>
                  <TableCell>{order.location}</TableCell>
                  <TableCell>{Number(order.total_price).toFixed(2)}</TableCell>
                  <TableCell>
                    {order.is_confirmed ? (
                      <span className="text-green-600 font-medium">
                        Completed
                      </span>
                    ) : (
                      <span className="text-yellow-600 font-medium">
                        Pending
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      onClick={() => router.push(`/admin/orders/${order.id}`)}
                    >
                      View Order
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center py-8 text-gray-500"
                >
                  No orders found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="border-t px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing {startIndex + 1} to {Math.min(endIndex, orders.length)}{" "}
                of {orders.length} results
              </div>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() =>
                        currentPage > 1 && goToPage(currentPage - 1)
                      }
                      className={
                        currentPage <= 1
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => goToPage(page)}
                          isActive={currentPage === page}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  )}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        currentPage < totalPages && goToPage(currentPage + 1)
                      }
                      className={
                        currentPage >= totalPages
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
