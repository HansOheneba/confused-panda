"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CartesianGrid,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const BLUE_SHADES = [
  "#1E3A8A", // dark blue
  "#2563EB", // blue-600
  "#3B82F6", // blue-500
  "#60A5FA", // blue-400
  "#93C5FD", // blue-300
];

interface Door {
  id: string;
  image_url: string;
  name: string;
  price: string;
  type: string;
}

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

export default function AdminPage() {
  const [doors, setDoors] = useState<Door[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [doorsRes, ordersRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/doors`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`),
        ]);
        const doorsData = await doorsRes.json();
        const ordersData = await ordersRes.json();
        setDoors(Array.isArray(doorsData) ? doorsData : doorsData.doors || []);
        setOrders(
          Array.isArray(ordersData) ? ordersData : ordersData.orders || []
        );
      } catch (err) {
        setDoors([]);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalDoors = doors.length;
  const totalOrders = orders.length;
  const completedOrders = orders.filter((o) => o.is_confirmed).length;
  const pendingOrders = totalOrders - completedOrders;
  const totalRevenue = orders.reduce(
    (sum, o) => sum + Number(o.total_price),
    0
  );

  const COLORS = ["#6366f1", "#10b981", "#f59e42", "#f43f5e", "#3b82f6"];

  const doorTypeCounts: Record<string, number> = {};
  doors.forEach((d) => {
    doorTypeCounts[d.type] = (doorTypeCounts[d.type] || 0) + 1;
  });

  const doorTypeChartData = Object.entries(doorTypeCounts).map(
    ([type, count]) => ({
      name: type,
      value: count,
    })
  );

  const orderStatusChartData = [
    { name: "Completed", value: completedOrders },
    { name: "Pending", value: pendingOrders },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-5">
            <CardHeader>
              <CardTitle>Total Doors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalDoors}</div>
            </CardContent>
          </Card>
          <Card className="p-5">
            <CardHeader>
              <CardTitle>Total Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalOrders}</div>
            </CardContent>
          </Card>
          <Card className="p-5">
            <CardHeader>
              <CardTitle>Completed Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedOrders}</div>
            </CardContent>
          </Card>
          <Card className="p-5">
            <CardHeader>
              <CardTitle>Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                GHS {totalRevenue.toFixed(2)}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-5">
          <CardHeader>
            <CardTitle>Door Types Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-64 w-full" />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={doorTypeChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value">
                    {doorTypeChartData.map((_, index) => (
                      <Cell
                        key={`bar-cell-${index}`}
                        fill={BLUE_SHADES[index % BLUE_SHADES.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card className="p-5">
          <CardHeader>
            <CardTitle>Order Status</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-64 w-full" />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={orderStatusChartData} layout="vertical">
                  <XAxis type="number" allowDecimals={false} hide />
                  <YAxis type="category" dataKey="name" width={100} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#10b981" barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
