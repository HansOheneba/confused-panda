"use client";
import Link from "next/link";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useRef } from "react";

interface Door {
  id: string;
  image_url: string;
  name: string;
  price: string;
  type: string;
  stock?: number;
  sub_images?: string[];
  description?: string;
}
import { Textarea } from "@/components/ui/textarea";

export default function EditDoorPage() {
  const router = useRouter();
  const params = useParams();
  const { doorId } = params as { doorId: string };
  const [door, setDoor] = useState<Door | null>(null);
  const [mainUploading, setMainUploading] = useState(false);
  const mainFileInputRef = useRef<HTMLInputElement | null>(null);
  const [subImagesToDelete, setSubImagesToDelete] = useState<string[]>([]);
  const [newSubImages, setNewSubImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleted, setDeleted] = useState(false);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!door) return;
    setDoor({ ...door, [e.target.name]: e.target.value });
  };

  const handleMainImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setMainUploading(true);
    try {
      const file = files[0];
      const formData = new FormData();
      formData.append("image", file);
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      if (data && data.data && data.data.url) {
        setDoor((prev) =>
          prev ? { ...prev, image_url: data.data.url } : prev
        );
      }
    } catch (err) {
      alert("Failed to upload main image");
    } finally {
      setMainUploading(false);
      if (mainFileInputRef.current) mainFileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!door) return;
    setSaving(true);
    setError(null);
    try {
      const payload: any = {
        name: door.name,
        price: door.price,
        type: door.type,
        image_url: door.image_url,
        stock: door.stock,
        description: door.description,
      };
      // Only include sub_images_operations if there are changes
      if (subImagesToDelete.length > 0 || newSubImages.length > 0) {
        payload.sub_images_operations = {
          delete: subImagesToDelete,
          add: newSubImages,
        };
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

  const handleSubImageDeleteToggle = (url: string) => {
    setSubImagesToDelete((prev) =>
      prev.includes(url) ? prev.filter((u) => u !== url) : [...prev, url]
    );
  };

  const handleAddNewSubImage = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      const uploadedUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append("image", file);
        const res = await fetch(
          `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await res.json();
        if (data && data.data && data.data.url) {
          uploadedUrls.push(data.data.url);
        }
      }
      setNewSubImages((prev) => [...prev, ...uploadedUrls]);
    } catch (err) {
      alert("Failed to upload image(s)");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleRemoveNewSubImage = (idx: number) => {
    setNewSubImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleDelete = async () => {
    if (!door) return;

    if (
      !confirm(
        "Are you sure you want to delete this door? This action cannot be undone."
      )
    ) {
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/doors/${doorId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to delete door");
      }

      // Navigate without triggering the data fetch
      router.replace("/admin/doors");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete door");
    } finally {
      setSaving(false);
    }
  };

  if (deleted) return null;
  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!door) return <div className="p-6">Door not found.</div>;

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
      <form
        onSubmit={handleSubmit}
        className="space-y-5 max-w-xl mx-auto bg-white p-5 rounded shadow"
      >
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            value={door.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={door.description ?? ""}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setDoor((prev) =>
                prev ? { ...prev, description: e.target.value } : prev
              )
            }
            required
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="type">Type</Label>
          <Select
            value={door.type}
            onValueChange={(value) =>
              setDoor((prev) => (prev ? { ...prev, type: value } : prev))
            }
            disabled={saving}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select door type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Single">Single</SelectItem>
              <SelectItem value="Single Wide">Single Wide</SelectItem>
              <SelectItem value="Double">Double</SelectItem>
              <SelectItem value="One and Half">One and Half</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <Label htmlFor="price">Price (GHS)</Label>
          <Input
            id="price"
            name="price"
            type="number"
            value={door.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="stock">Stock</Label>
          <Input
            id="stock"
            name="stock"
            type="number"
            value={door.stock ?? ""}
            onChange={(e) =>
              setDoor((prev) =>
                prev ? { ...prev, stock: Number(e.target.value) } : prev
              )
            }
            min={0}
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Main Image</Label>
          <div className="flex items-center gap-4">
            {door.image_url && (
              <img
                src={door.image_url}
                alt="main"
                className="w-20 h-20 object-cover rounded border"
              />
            )}
            <input
              type="file"
              accept="image/*"
              ref={mainFileInputRef}
              onChange={handleMainImageChange}
              disabled={mainUploading}
            />
            {mainUploading && (
              <div className="text-xs text-blue-600">Uploading...</div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Sub Images</Label>
          <div className="flex flex-wrap gap-4">
            {door.sub_images && door.sub_images.length > 0 ? (
              door.sub_images.map((img, idx) => (
                <div key={img} className="flex flex-col items-center">
                  <img
                    src={img}
                    alt="sub"
                    className="w-16 h-16 object-cover rounded border mb-1"
                  />
                  <input
                    type="checkbox"
                    checked={subImagesToDelete.includes(img)}
                    onChange={() => handleSubImageDeleteToggle(img)}
                    id={`delete-subimg-${idx}`}
                  />
                  <Label
                    htmlFor={`delete-subimg-${idx}`}
                    className="text-xs cursor-pointer"
                  >
                    Delete
                  </Label>
                </div>
              ))
            ) : (
              <div className="text-xs text-gray-500">No sub images</div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Add New Sub Images</Label>
          <input
            type="file"
            accept="image/*"
            multiple
            ref={fileInputRef}
            onChange={handleAddNewSubImage}
            disabled={uploading}
          />
          {uploading && (
            <div className="text-xs text-blue-600">Uploading...</div>
          )}
          {newSubImages.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {newSubImages.map((url, idx) => (
                <div key={idx} className="relative">
                  <img
                    src={url}
                    alt="new sub"
                    className="w-16 h-16 object-cover rounded border"
                  />
                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    className="absolute -top-2 -right-2 px-1 py-0.5 text-xs"
                    onClick={() => handleRemoveNewSubImage(idx)}
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-2 pt-4">
          <Button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/doors")}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={saving}
          >
            Delete Door
          </Button>
        </div>
      </form>
    </>
  );
}
