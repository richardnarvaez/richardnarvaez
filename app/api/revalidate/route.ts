import { revalidateTag } from "next/cache"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  revalidateTag("collection")
  return NextResponse.json({ revalidated: true })
}
