"use client";
import { FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarLinks = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/doors", label: "Manage Doors" },
  { href: "/admin/users", label: "Users" },
];

const Sidebar: FC = () => {
  const pathname = usePathname();
  return (
    <aside className="w-64 bg-white shadow-md px-6 py-8">
      <h1 className="text-2xl font-bold text-airbanBlue mb-8">Airban</h1>
      <nav className="space-y-4 text-sm">
        {sidebarLinks.map((link) => {
          // Only highlight if pathname matches exactly, or for subpages, only if the link is not a prefix of another link
          let isActive = pathname === link.href;
          if (!isActive && link.href !== "/admin") {
            isActive = pathname.startsWith(link.href + "/");
          }
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`block hover:text-blue-500 ${
                isActive ? "font-bold text-airbanBlue" : ""
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
