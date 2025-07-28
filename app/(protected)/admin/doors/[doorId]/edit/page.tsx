"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { DoorForm } from "@/components/admin/DoorForm";
import { Door } from "@/components/admin/DoorForm";

export default function EditDoorPage() {
  const router = useRouter();
  const params = useParams();
  const { doorId } = params as { doorId: string };
  const [door, setDoor] = useState<Door | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDoor = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/doors/${doorId}`
        );
        if (!res.ok) throw new Error("Failed to fetch door");
        const data = await res.json();
        setDoor(data);
      } catch (err) {
        setError("Failed to load door data");
      } finally {
        setLoading(false);
      }
    };
    if (doorId) fetchDoor();
  }, [doorId]);

  const handleSubmit = async (
    doorData: Door,
    subImagesOperations?: {
      delete: string[];
      add: string[];
    }
  ) => {
    setSaving(true);
    setError(null);
    try {
      const payload: any = {
        name: doorData.name,
        price: doorData.price,
        type: doorData.type,
        image_url: doorData.image_url,
        stock: doorData.stock,
        description: doorData.description,
      };

      if (subImagesOperations) {
        payload.sub_images_operations = subImagesOperations;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/doors/${doorId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (!res.ok) throw new Error("Failed to update door");
      router.push("/admin/doors");
    } catch (err) {
      setError("Failed to update door");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this door?")) return;

    setSaving(true);
    setError(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/doors/${doorId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!res.ok) throw new Error("Failed to delete door");
      router.push("/admin/doors");
    } catch (err) {
      setError("Failed to delete door");
    } finally {
      setSaving(false);
    }
  };

  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <>
      <nav className="px-6 py-2 text-sm text-gray-600">
        <ol className="flex items-center space-x-2">
          <li>
            <Link href="/admin" className="hover:underline text-blue-600">
              Dashboard
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/admin/doors" className="hover:underline text-blue-600">
              Doors
            </Link>
          </li>
          <li>/</li>
          <li className="font-semibold text-gray-900">Edit Door</li>
        </ol>
      </nav>
      <DoorForm
        initialData={door}
        loading={loading}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
        isSubmitting={saving}
      />
    </>
  );
}
