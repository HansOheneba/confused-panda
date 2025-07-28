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
import Image from "next/image";
import { Plus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Door {
  id: string;
  image_url: string;
  name: string;
  price: string;
  type: string;
}

export default function DoorsPage() {
  const [doors, setDoors] = useState<Door[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchDoors = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/doors`);
        const data = await res.json();
        // Defensive: ensure data is always an array
        if (Array.isArray(data)) {
          setDoors(data);
        } else if (Array.isArray(data.doors)) {
          setDoors(data.doors);
        } else {
          setDoors([]);
        }
      } catch (err) {
        console.error("Failed to fetch doors", err);
        setDoors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDoors();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">All Doors</h1>
        <Button onClick={() => router.push("/admin/doors/create")}>
          <Plus className="" />
          Add Door
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Price (GHS)</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading
            ? // Skeleton loading state
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="w-[60px] h-[60px] rounded bg-gray-200" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[120px] bg-gray-200" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[80px] bg-gray-200" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[60px] bg-gray-200" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-9 w-[60px] ml-auto bg-gray-200" />
                  </TableCell>
                </TableRow>
              ))
            : // Actual data
              doors.map((door) => (
                <TableRow key={door.id}>
                  <TableCell>
                    {door.image_url && door.image_url.trim() !== "" ? (
                      <Image
                        src={door.image_url}
                        alt={door.name}
                        width={60}
                        height={60}
                        className="rounded object-cover"
                      />
                    ) : (
                      <div className="w-[60px] h-[60px] bg-gray-200 flex items-center justify-center rounded text-xs text-gray-500">
                        No Image
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{door.name}</TableCell>
                  <TableCell>{door.type}</TableCell>
                  <TableCell>{Number(door.price).toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      onClick={() =>
                        router.push(`/admin/doors/${door.id}/edit`)
                      }
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
}
