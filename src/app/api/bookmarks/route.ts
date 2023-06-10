import { addBookmark, deleteBookmark } from "@/service/user";
import { withSessionUser } from "@/util/session";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  // callback == (user) => Promise<Response>
  // return withSessionUser(callback)

  return withSessionUser(async (user) => {
    const { id, bookmark } = await req.json();

    if (!id || bookmark === undefined) {
      return new Response("Bad Request", { status: 400 });
    }

    const request = bookmark ? addBookmark : deleteBookmark;

    return request(user.id, id)
      .then((res) => NextResponse.json(res))
      .catch((err) => new Response(JSON.stringify(err), { status: 500 }));
  });
}
