import { POST } from "../../auth/[...nextauth]/route";

import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { getPost } from "@/service/post";

type Context = {
  params: { id: string };
};

export async function GET(request: NextRequest, context: Context) {
  const session = await getServerSession(POST);
  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }

  return getPost(context.params.id) //
    .then((data) => NextResponse.json(data));
}
