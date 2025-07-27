import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await currentUser();
  if (!user) {
    redirect("/home");
  }

  const approvedEmailsEnv = process.env.NEXT_PUBLIC_APPROVED_EMAILS || "";
  const approvedEmails = approvedEmailsEnv
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);
  const email = user.emailAddresses?.[0]?.emailAddress;

  if (!email || !approvedEmails.includes(email)) {
    redirect("/home");
  }

  redirect("/admin");
}
