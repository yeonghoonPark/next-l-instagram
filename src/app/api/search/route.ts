import { getSearchUsers } from "@/service/user";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await getSearchUsers();

  return NextResponse.json(data);
}
