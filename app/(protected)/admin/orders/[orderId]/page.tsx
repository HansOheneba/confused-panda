"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
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

interface OrderItem {
  door_id: string;
  door_name: string;
  orientation: string;
  quantity: number;
  unit_price: string;
}

interface OrderDetail {
  id: string;
  created_at: string;
  customer_name: string;
  email: string;
  is_confirmed: number;
  items: OrderItem[];
  location: string;
  notes: string;
  phone_number: string;
  total_price: string;
}

export default function OrderDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { orderId } = params as { orderId: string };
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) return;
    const fetchOrder = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/orders/${orderId}`
        );
        const data = await res.json();
        setOrder(data);
      } catch (err) {
        setOrder(null);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Button
        variant="ghost"
        className="mb-6 text-sm font-medium"
        onClick={() => router.back()}
      >
        ← Back to Orders
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
      ) : order ? (
        <div className="space-y-8">
          {/* Order Info */}
          <div className="bg-white shadow rounded-xl p-6 border">
            <h1 className="text-2xl font-bold mb-4">Order Summary</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <div className="text-muted-foreground">Order ID</div>
                <div className="font-mono text-xs">{order.id}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Date</div>
                <div>
                  {new Date(order.created_at).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">Client</div>
                <div>{order.customer_name}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Email</div>
                <div>{order.email}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Phone</div>
                <div>{order.phone_number}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Location</div>
                <div>{order.location}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Status</div>
                <div>
                  {order.is_confirmed ? (
                    <span className="text-green-600 font-semibold">
                      Completed
                    </span>
                  ) : (
                    <span className="text-yellow-600 font-semibold">
                      Pending
                    </span>
                  )}
                </div>
              </div>
              {order.notes && (
                <div className="sm:col-span-2">
                  <div className="text-muted-foreground">Notes</div>
                  <div>{order.notes}</div>
                </div>
              )}
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white shadow rounded-xl p-6 border">
            <h2 className="text-lg font-bold mb-4">Items Ordered</h2>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Door</TableHead>
                    <TableHead>Orientation</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Unit Price</TableHead>
                    <TableHead>Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.items.map((item, idx) => (
                    <TableRow key={item.door_id + idx}>
                      <TableCell>{item.door_name}</TableCell>
                      <TableCell>{item.orientation}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>
                        GHS {Number(item.unit_price).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        GHS{" "}
                        {(Number(item.unit_price) * item.quantity).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="flex justify-end mt-6 text-lg font-semibold">
              Total: GHS {Number(order.total_price).toFixed(2)}
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-4">
            {!order.is_confirmed && (
              <Button
                className=""
                onClick={async () => {
                  try {
                    const res = await fetch(
                      `${process.env.NEXT_PUBLIC_API_URL}/orders/complete/${order.id}`,
                      { method: "POST" }
                    );
                    if (res.ok) {
                      setOrder({ ...order, is_confirmed: 1 });
                    } else {
                      alert("Failed to mark as completed");
                    }
                  } catch (err) {
                    alert("Error confirming order");
                  }
                }}
              >
                Mark as Completed
              </Button>
            )}

            <Button
              variant="destructive"
              disabled={!!order.is_confirmed}
              title={
                order.is_confirmed
                  ? "Completed orders cannot be deleted"
                  : undefined
              }
              onClick={async () => {
                if (order.is_confirmed) return;
                if (confirm("Are you sure you want to delete this order?")) {
                  try {
                    const res = await fetch(
                      `${process.env.NEXT_PUBLIC_API_URL}/orders/${order.id}`,
                      { method: "DELETE" }
                    );
                    if (res.ok) {
                      router.back();
                    } else {
                      alert("Failed to delete order");
                    }
                  } catch (err) {
                    alert("Error deleting order");
                  }
                }
              }}
            >
              Delete Order
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-red-800 font-medium">Order not found.</div>
      )}
    </div>
  );
}
