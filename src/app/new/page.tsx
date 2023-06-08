import NewPost from "@/components/NewPost";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function NewPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    redirect("/auth/signin");
  }

  return (
    <>
      <NewPost user={user} />
    </>
  );
}
