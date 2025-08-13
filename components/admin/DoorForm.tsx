"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

export interface Door {
  id?: string;
  image_url?: string;
  name: string;
  price: string;
  type: string;
  stock?: number;
  sub_images?: string[];
  description?: string;
}

interface DoorFormProps {
  initialData?: Door | null;
  loading?: boolean;
  onSubmit: (
    data: Door,
    subImagesOperations?: {
      delete: string[];
      add: string[];
    }
  ) => Promise<void>;
  onDelete?: () => Promise<void>;
  isSubmitting: boolean;
}

export function DoorForm({
  initialData,
  loading = false,
  onSubmit,
  onDelete,
  isSubmitting,
}: DoorFormProps) {
  const [door, setDoor] = useState<Door>(
    initialData || {
      name: "",
      price: "",
      type: "",
      stock: 0,
      description: "",
    }
  );
  const [mainUploading, setMainUploading] = useState(false);
  const mainFileInputRef = useRef<HTMLInputElement | null>(null);
  const [subImagesToDelete, setSubImagesToDelete] = useState<string[]>([]);
  const [newSubImages, setNewSubImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Check if this is a new door (no initialData) and no type is selected
  const isNewDoorWithoutType = !initialData && !door.type;
  const shouldDisableFields = isSubmitting || isNewDoorWithoutType;

  useEffect(() => {
    if (initialData) {
      setDoor(initialData);
      setSubImagesToDelete([]);
      setNewSubImages([]);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      if (data?.data?.url) {
        setDoor((prev) => ({ ...prev, image_url: data.data.url }));
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

    // Ensure door type is selected
    if (!door.type) {
      alert("Please select a door type before saving.");
      return;
    }

    await onSubmit(door, {
      delete: subImagesToDelete,
      add: newSubImages,
    });
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
        if (data?.data?.url) {
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

  if (loading) {
    return (
      <div className="space-y-5 max-w-xl mx-auto bg-white p-5 rounded shadow">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-8 w-32" />
        <div className="flex gap-4">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
          {onDelete && <Skeleton className="h-10 w-24" />}
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 max-w-xl mx-auto bg-white p-5 rounded shadow"
    >
      {isNewDoorWithoutType && (
        <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-4">
          <p className="text-blue-700 text-sm">
            Please select a door type first to enable all form fields.
          </p>
        </div>
      )}
      <div className="space-y-1">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          value={door.name}
          onChange={handleChange}
          required
          disabled={shouldDisableFields}
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={door.description ?? ""}
          onChange={(e) =>
            setDoor((prev) => ({ ...prev, description: e.target.value }))
          }
          required
          disabled={shouldDisableFields}
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="type">Type</Label>
        <Select
          value={door.type}
          onValueChange={(value) =>
            setDoor((prev) => ({ ...prev, type: value }))
          }
          disabled={isSubmitting}
          required
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
          disabled={shouldDisableFields}
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
            setDoor((prev) => ({ ...prev, stock: Number(e.target.value) }))
          }
          min={0}
          required
          disabled={shouldDisableFields}
        />
      </div>

      <div className="space-y-2">
        <Label>Main Image</Label>
        <div className="flex items-center gap-4">
          {door.image_url ? (
            <img
              src={door.image_url}
              alt="main"
              className="w-20 h-20 object-cover rounded border"
            />
          ) : (
            <div className="w-20 h-20 bg-gray-100 rounded border flex items-center justify-center text-gray-400">
              No image
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            ref={mainFileInputRef}
            onChange={handleMainImageChange}
            disabled={mainUploading || shouldDisableFields}
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
                <div className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={subImagesToDelete.includes(img)}
                    onChange={() => handleSubImageDeleteToggle(img)}
                    id={`delete-subimg-${idx}`}
                    disabled={shouldDisableFields}
                  />
                  <Label
                    htmlFor={`delete-subimg-${idx}`}
                    className="text-xs cursor-pointer"
                  >
                    Delete
                  </Label>
                </div>
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
          disabled={uploading || shouldDisableFields}
        />
        {uploading && <div className="text-xs text-blue-600">Uploading...</div>}
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
                  disabled={shouldDisableFields}
                >
                  ×
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" disabled={isSubmitting || !door.type}>
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => window.history.back()}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        {onDelete && (
          <Button
            type="button"
            variant="destructive"
            onClick={onDelete}
            disabled={isSubmitting}
          >
            Delete Door
          </Button>
        )}
      </div>
    </form>
  );
}
