// lib/doors.ts

export type Door = {
  id: string;
  name: string;
  price: string;
  category: string;
  size?: string;
  description: string;
  image_url: string | null;
  created_at: string;

};

export const doors: Door[] = [
  {
    id: "40dcc4c6-b87b-4e2a-960e-3f2ffac6e035",
    name: "Classic Walnut",
    price: "750",
    category: "Single",
    description:
      "A sleek, durable interior door made from premium walnut wood. Perfect for contemporary homes.",
    image_url: "https://example.com/images/walnut-main.jpg",
    created_at: "Wed, 23 Jul 2025 15:26:51 GMT",
  },
  {
    id: "db0971e9-4053-4a09-a08e-671fbd579890",
    name: "Modern alcantara",
    price: "800",
    category: "Single",
    description: "High Quality Oak Door lorem ipsum",
    image_url: "www.example.com",
    created_at: "Wed, 23 Jul 2025 15:23:01 GMT",
  },
  {
    id: "c7c5ffd5-acb8-4c4c-905c-3ee1688d9fe3",
    name: "Antique wooden",
    price: "8000",
    category: "Single",
    description: "High Quality Old Plank Wood",
    image_url: null,
    created_at: "Wed, 23 Jul 2025 09:19:25 GMT",
  },
  {
    id: "2c9c640c-d37e-4018-b445-b0dbe4ae5e5b",
    name: "Modern Steel",
    price: "1200",
    category: "Single",
    description: "High Quality Oak Door",
    image_url: "https://i.ibb.co/bRynYndL/door2.png",
    created_at: "Wed, 23 Jul 2025 09:03:22 GMT",
  },
  {
    id: "08ce8b3c-dd67-45b1-a189-511563450d12",
    name: "Modern Steel",
    price: "1200.00",
    category: "Single",
    description: "High Quality Oak Door",
    image_url: "https://i.ibb.co/bRynYndL/door2.png",
    created_at: "Wed, 23 Jul 2025 08:01:07 GMT",
  },
];

export function getDoors() {
  return doors;
}

export function getDoorById(id: string) {
  return doors.find((door) => door.id === id);
}
