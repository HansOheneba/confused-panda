"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

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

const EnquiryDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const enquiryId = params.enquiryId as string;

  const [enquiry, setEnquiry] = useState<Enquiry | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchEnquiry = async () => {
      if (!enquiryId) return;
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/contact`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch enquiries");
        }
        const data = await response.json();
        const foundEnquiry = data.find((enq: Enquiry) => enq.id === enquiryId);

        if (!foundEnquiry) {
          throw new Error("Enquiry not found");
        }

        setEnquiry(foundEnquiry);
      } catch (err) {
        console.error("Error fetching enquiry:", err);
        setEnquiry(null);
      } finally {
        setLoading(false);
      }
    };

    fetchEnquiry();
  }, [enquiryId]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const toggleStatus = async () => {
    if (!enquiry) return;

    setUpdating(true);
    const isCurrentlyResolved = enquiry.resolved === "yes";
    const endpoint = isCurrentlyResolved ? "unresolve" : "resolve";
    
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/contact/${enquiryId}/${endpoint}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to ${endpoint} enquiry`);
      }

      const newStatus = isCurrentlyResolved ? "no" : "yes";
      setEnquiry((prev) => (prev ? { ...prev, resolved: newStatus } : null));

      // Show success toast with undo option
      toast(
        isCurrentlyResolved 
          ? "Enquiry marked as pending" 
          : "Enquiry marked as resolved",
        {
          description: `Contact enquiry from ${enquiry.first_name} ${enquiry.last_name}`,
          action: {
            label: "Undo",
            onClick: async () => {
              try {
                const undoEndpoint = isCurrentlyResolved ? "resolve" : "unresolve";
                const undoResponse = await fetch(
                  `${process.env.NEXT_PUBLIC_API_URL}/contact/${enquiryId}/${undoEndpoint}`,
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                  }
                );

                if (undoResponse.ok) {
                  setEnquiry((prev) => (prev ? { ...prev, resolved: enquiry.resolved } : null));
                  toast("Status reverted successfully");
                }
              } catch (err) {
                toast("Failed to undo status change");
              }
            },
          },
        }
      );

      // Navigate back to enquiries list after a short delay
      setTimeout(() => {
        router.push("/admin/enquiries");
      }, 2000);

    } catch (err) {
      console.error("Error updating enquiry status:", err);
      toast("Failed to update enquiry status", {
        description: "Please try again later"
      });
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Button
        variant="ghost"
        className="mb-6 text-sm font-medium"
        onClick={() => router.back()}
      >
        ← Back to Enquiries
      </Button>

      {loading ? (
        <div className="space-y-3">
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-10 w-full" />
        </div>
      ) : enquiry ? (
        <div className="space-y-8">
          {/* Enquiry Info */}
          <div className="bg-white shadow rounded-xl p-6 border">
            <h1 className="text-2xl font-bold mb-4">Enquiry Details</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <div className="text-muted-foreground">Enquiry ID</div>
                <div className="font-mono text-xs">{enquiry.id}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Date Submitted</div>
                <div>{formatDate(enquiry.submitted_at)}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Name</div>
                <div>
                  {enquiry.first_name} {enquiry.last_name}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">Email</div>
                <div>{enquiry.email}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Phone</div>
                <div>{enquiry.phone}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Enquiry Type</div>
                <div>{enquiry.enquiry_type}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Status</div>
                <div>
                  {enquiry.resolved === "yes" ? (
                    <span className="text-green-600 font-semibold">
                      Resolved
                    </span>
                  ) : (
                    <span className="text-yellow-600 font-semibold">
                      Pending
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="bg-white shadow rounded-xl p-6 border">
            <h2 className="text-lg font-bold mb-4">Additional Information</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-800 whitespace-pre-wrap">
                {enquiry.additional_info ||
                  "No additional information provided."}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 mt-4">
            <Button
              onClick={toggleStatus}
              disabled={updating}
              variant={enquiry.resolved === "yes" ? "outline" : "default"}
            >
              {updating
                ? "Updating..."
                : enquiry.resolved === "yes"
                ? "Mark as Pending"
                : "Mark as Resolved"}
            </Button>

            <Button variant="outline" asChild>
              <a href={`mailto:${enquiry.email}`}>Reply via Email</a>
            </Button>

            <Button variant="outline" asChild>
              <a href={`tel:${enquiry.phone}`}>Call</a>
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-red-800 font-medium">Enquiry not found.</div>
      )}
    </div>
  );
};

export default EnquiryDetailPage;
