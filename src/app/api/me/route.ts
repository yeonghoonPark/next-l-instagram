import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getUserByEmail } from "@/service/user";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }

  const data = await getUserByEmail(user.email);

  return NextResponse.json(data);
}
