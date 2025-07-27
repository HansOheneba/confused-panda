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
        setDoors(data);
      } catch (err) {
        console.error("Failed to fetch doors", err);
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

      {loading ? (
        <p>Loading...</p>
      ) : (
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
            {doors.map((door) => (
              <TableRow key={door.id}>
                <TableCell>
                  <Image
                    src={door.image_url}
                    alt={door.name}
                    width={60}
                    height={60}
                    className="rounded object-cover"
                  />
                </TableCell>
                <TableCell>{door.name}</TableCell>
                <TableCell>{door.type}</TableCell>
                <TableCell>{Number(door.price).toFixed(2)}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    onClick={() => router.push(`/admin/doors/${door.id}/edit`)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
