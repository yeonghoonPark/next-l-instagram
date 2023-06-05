import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { addBookmark, deleteBookmark } from "@/service/user";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }

  const { id, bookmark } = await req.json();

  if (!id || bookmark === undefined) {
    return new Response("Bad Request", { status: 400 });
  }

  let request = bookmark ? addBookmark : deleteBookmark;

  return request(user.id, id)
    .then((res) => NextResponse.json(res))
    .catch((err) => new Response(JSON.stringify(err), { status: 500 }));
}
