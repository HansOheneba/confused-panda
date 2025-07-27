import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { UserButton } from "@clerk/nextjs";

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
    <div>
      <UserButton />
      <p>Signed in as {email}</p>
      {children}
    </div>
  );
}
