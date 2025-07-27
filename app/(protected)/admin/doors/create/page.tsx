"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function CreateDoorPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [stock, setStock] = useState("");
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [subImages, setSubImages] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const router = useRouter();

  const uploadImageToImgBB = async (image: File) => {
    setStatus("Uploading images...");
    const formData = new FormData();
    formData.append("image", image);
    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    return data.data.url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("Uploading main image...");
    try {
      let imageUrl = "";
      let subImageUrls: string[] = [];

      if (mainImage) {
        imageUrl = await uploadImageToImgBB(mainImage);
      }

      if (subImages) {
        setStatus("Uploading sub images...");
        const uploads = Array.from(subImages).map((file) =>
          uploadImageToImgBB(file)
        );
        subImageUrls = await Promise.all(uploads);
      }

      setStatus("Creating door...");
      const payload = {
        name,
        description,
        price: parseFloat(price),
        type,
        stock: parseInt(stock),
        image_url: imageUrl,
        sub_images: subImageUrls,
      };

      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/doors`, payload);
      setStatus("Door created! Redirecting...");
      router.push("/admin/doors");
    } catch (err) {
      setStatus("Failed to create door. Please try again.");
      console.error("Failed to create door:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Create New Door</h2>
      {status && (
        <div className="mb-4 text-blue-600 animate-pulse">{status}</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Name</Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div>
          <Label>Description</Label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div>
          <Label>Price (GHS)</Label>
          <Input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div>
          <Label>Type</Label>
          <Select value={type} onValueChange={setType} disabled={loading}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select door type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Single">Single</SelectItem>
              <SelectItem value="Single Wide">Single Wide (4ft)</SelectItem>
              <SelectItem value="Double">Double</SelectItem>
              <SelectItem value="One and Half">One and Half</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Stock</Label>
          <Input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div>
          <Label>Main Image</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setMainImage(e.target.files?.[0] ?? null)}
            required
            disabled={loading}
          />
        </div>
        <div>
          <Label>Sub Images</Label>
          <Input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setSubImages(e.target.files)}
            disabled={loading}
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Door"}
        </Button>
      </form>
    </div>
  );
}
