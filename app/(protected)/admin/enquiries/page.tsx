"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Enquiry {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  enquiry_type: string;
  additional_info: string;
  resolved: string;
  submitted_at: string;
}

const EnquiriesPage = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const router = useRouter();

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/contact`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch enquiries");
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setEnquiries(data);
        } else {
          setEnquiries([]);
        }
      } catch (err) {
        console.error("Error fetching enquiries:", err);
        setEnquiries([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEnquiries();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Pagination logic
  const totalPages = Math.ceil(enquiries.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEnquiries = enquiries.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">All Enquiries</h1>
        <div className="text-sm text-gray-500">
          {enquiries.length} total enquiries
        </div>
      </div>

      <div className="bg-white rounded-lg border p-5">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Enquiry Type</TableHead>
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
                    <Skeleton className="h-4 w-[140px] bg-gray-200" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[180px] bg-gray-200" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[120px] bg-gray-200" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[100px] bg-gray-200" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[80px] bg-gray-200" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-9 w-[100px] ml-auto bg-gray-200" />
                  </TableCell>
                </TableRow>
              ))
            ) : currentEnquiries.length > 0 ? (
              currentEnquiries.map((enquiry) => (
                <TableRow key={enquiry.id}>
                  <TableCell className="whitespace-nowrap">
                    <div className="flex flex-col leading-tight">
                      <span className="text-sm font-medium text-gray-800">
                        {new Date(enquiry.submitted_at).toLocaleDateString(
                          undefined,
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(enquiry.submitted_at).toLocaleTimeString(
                          undefined,
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {enquiry.first_name} {enquiry.last_name}
                  </TableCell>
                  <TableCell>{enquiry.email}</TableCell>
                  <TableCell>{enquiry.phone}</TableCell>
                  <TableCell>
                    <span className="text-sm bg-gray-100 px-2 py-1 rounded text-gray-700">
                      {enquiry.enquiry_type}
                    </span>
                  </TableCell>
                  <TableCell>
                    {enquiry.resolved === "yes" ? (
                      <span className="text-green-600 font-medium">
                        Resolved
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
                      onClick={() =>
                        router.push(`/admin/enquiries/${enquiry.id}`)
                      }
                    >
                      View Enquiry
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-8 text-gray-500"
                >
                  No enquiries found
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
                Showing {startIndex + 1} to{" "}
                {Math.min(endIndex, enquiries.length)} of {enquiries.length}{" "}
                results
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
};

export default EnquiriesPage;
