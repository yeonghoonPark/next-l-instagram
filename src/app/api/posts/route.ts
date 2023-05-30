import { POST } from "../auth/[...nextauth]/route";

import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { getFollowingPostsOf } from "@/service/post";

export async function GET() {
  const session = await getServerSession(POST);

  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }

  const data = await getFollowingPostsOf(user.email);

  return NextResponse.json(data);
}
