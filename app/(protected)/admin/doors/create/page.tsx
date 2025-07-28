"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Door } from "@/components/admin/DoorForm";
import Link from "next/link";
import { DoorForm } from "@/components/admin/DoorForm";

export default function CreateDoorPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (doorData: Door) => {
    setSaving(true);
    setError(null);
    try {
      const payload = {
        name: doorData.name,
        description: doorData.description,
        price: doorData.price,
        type: doorData.type,
        stock: doorData.stock,
        image_url: doorData.image_url,
        sub_images: doorData.sub_images || [],
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/doors`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to create door");
      router.push("/admin/doors");
    } catch (err) {
      setError("Failed to create door");
    } finally {
      setSaving(false);
    }
  };

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
          <li className="font-semibold text-gray-900">Create Door</li>
        </ol>
      </nav>
      <DoorForm onSubmit={handleSubmit} isSubmitting={saving} />
    </>
  );
}
