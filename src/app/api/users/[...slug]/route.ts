import { getLikedPostsOf, getPostsOf, getSavedPostsOf } from "@/service/post";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: {
    slug: string[];
  };
};

export async function GET(_: NextRequest, context: Context) {
  const { slug } = context.params;

  if (!slug || !Array.isArray(slug) || slug.length < 2) {
    return new NextResponse("Bad Request", { status: 400 });
  }

  const [username, tab] = slug;

  let result = getPostsOf;
  if (tab === "saved") result = getSavedPostsOf;
  else if (tab === "liked") result = getLikedPostsOf;

  const data = await result(username);

  return NextResponse.json(data);
}
