import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

interface AdminLayoutProps {
  children: ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/home");
  }

  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const email = user.emailAddresses[0]?.emailAddress;

  const approvedEmailsEnv = process.env.NEXT_PUBLIC_APPROVED_EMAILS || "";
  const approvedEmails = approvedEmailsEnv
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);

  if (!email || !approvedEmails.includes(email)) {
    redirect("/home");
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md px-6 py-8">
        <h1 className="text-2xl font-bold text-blue-600 mb-8">Admin Panel</h1>
        <nav className="space-y-4 text-sm">
          <Link href="/admin" className="block hover:text-blue-500">
            Dashboard
          </Link>
          <Link href="/admin/doors" className="block hover:text-blue-500">
            Manage Doors
          </Link>
          <Link href="/admin/users" className="block hover:text-blue-500">
            Users
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="flex justify-between items-center px-6 py-4 border-b bg-white shadow-sm">
          <div className="text-sm text-gray-600">
            Signed in as <span className="font-medium">{email}</span>
          </div>
          <UserButton afterSignOutUrl="/sign-in" />
        </header>

        {/* Page Content */}
        <section className="flex-1 p-6">{children}</section>
      </main>
    </div>
  );
}