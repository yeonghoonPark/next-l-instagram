import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { getFollowingPostsOf } from "@/service/post";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function GET() {
  const session = await getServerSession(authOptions);

  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }

  const data = await getFollowingPostsOf(user.username);

  return NextResponse.json(data);
}
