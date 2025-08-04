"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

interface PropertyEnquiry {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  selected_property: string;
  message: string;
  resolved: string;
  submitted_at: string;
}

const PropertyEnquiryDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const propertyId = params.propertyId as string;

  const [enquiry, setEnquiry] = useState<PropertyEnquiry | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchEnquiry = async () => {
      if (!propertyId) return;
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/property`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch property enquiries");
        }
        const data = await response.json();
        const foundEnquiry = data.find(
          (enq: PropertyEnquiry) => enq.id === propertyId
        );

        if (!foundEnquiry) {
          throw new Error("Property enquiry not found");
        }

        setEnquiry(foundEnquiry);
      } catch (err) {
        console.error("Error fetching property enquiry:", err);
        setEnquiry(null);
      } finally {
        setLoading(false);
      }
    };

    fetchEnquiry();
  }, [propertyId]);

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
        `${process.env.NEXT_PUBLIC_API_URL}/property/${propertyId}/${endpoint}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to ${endpoint} property enquiry`);
      }

      const newStatus = isCurrentlyResolved ? "no" : "yes";
      setEnquiry((prev) => (prev ? { ...prev, resolved: newStatus } : null));

      // Show success toast with undo option
      toast(
        isCurrentlyResolved 
          ? "Enquiry marked as pending" 
          : "Enquiry marked as resolved",
        {
          description: `Property enquiry for ${enquiry.first_name} ${enquiry.last_name}`,
          action: {
            label: "Undo",
            onClick: async () => {
              try {
                const undoEndpoint = isCurrentlyResolved ? "resolve" : "unresolve";
                const undoResponse = await fetch(
                  `${process.env.NEXT_PUBLIC_API_URL}/property/${propertyId}/${undoEndpoint}`,
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

      // Navigate back to properties list after a short delay
      setTimeout(() => {
        router.push("/admin/properties");
      }, 2000);

    } catch (err) {
      console.error("Error updating property enquiry status:", err);
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
        ← Back to Property Enquiries
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
            <h1 className="text-2xl font-bold mb-4">
              Property Enquiry Details
            </h1>
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
                <div className="text-muted-foreground">
                  Property of Interest
                </div>
                <div className="font-medium text-blue-700">
                  {enquiry.selected_property}
                </div>
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

          {/* Message */}
          <div className="bg-white shadow rounded-xl p-6 border">
            <h2 className="text-lg font-bold mb-4">Message</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-800 whitespace-pre-wrap">
                {enquiry.message || "No message provided."}
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
        <div className="text-red-800 font-medium">
          Property enquiry not found.
        </div>
      )}
    </div>
  );
};

export default PropertyEnquiryDetailPage;
