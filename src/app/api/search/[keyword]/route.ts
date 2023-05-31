import { getSearchUsers } from "@/service/user";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: { keyword: string };
};

export async function GET(_: NextRequest, context: Context) {
  const data = await getSearchUsers(context.params.keyword);

  return NextResponse.json(data);
}
