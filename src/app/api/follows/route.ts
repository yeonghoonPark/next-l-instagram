import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { follow, unfollow } from "@/service/user";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!user) {
      return new Response("Authentication Error", { status: 401 });
    }

    const { targetUserId, isFollow } = await req.json();

    if (!targetUserId || isFollow === undefined) {
      return new Response("Bad Request", { status: 400 });
    }

    let request = isFollow ? unfollow : follow;

    const result = await request(user.id, targetUserId);

    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
}
