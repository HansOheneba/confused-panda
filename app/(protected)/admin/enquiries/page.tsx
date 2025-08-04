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

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">All Enquiries</h1>
      </div>

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
          {loading
            ? Array.from({ length: 5 }).map((_, index) => (
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
            : enquiries.map((enquiry) => (
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
              ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default EnquiriesPage;
