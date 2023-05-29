import { POST } from "../auth/[...nextauth]/route";
import { getUserByEmail } from "@/service/user";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(POST);

  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }

  const data = await getUserByEmail(user.email);

  return NextResponse.json(data);
}
