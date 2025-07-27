import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Sidebar from "@/components/admin/Sidebar";

interface AdminLayoutProps {
  children: ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  // This is a server component, so we can't use hooks directly. We'll pass the pathname to a client component for the sidebar.
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
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="flex justify-between items-center px-6 py-4 border-b bg-white shadow-sm">
          <div className="text-sm text-gray-600">
            Signed in as <span className="font-semibold">{user.fullName}</span>
          </div>
          <div className="flex gap-2 items-center">
            <Link
              href="/home"
              className="text-sm text-airbanBlue hover:underline"
            >
              View Website
            </Link>
            <UserButton />
          </div>
        </header>

        {/* Page Content */}
        <section className="flex-1 p-6">{children}</section>
      </main>
    </div>
  );
}
