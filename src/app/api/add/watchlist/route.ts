import { watchLaterPost } from "@/types/watch-later";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { id, userId, title, type, platform, link }: watchLaterPost =
      await request.json();

    console.log(id, userId, title, type, platform, link);

    const res =
      await sql`INSERT INTO watchlist_item (tmdb_id, title, type,user_id, platform, link) values (${id}, ${title}, ${type},  ${userId}, ${platform}, ${link})`;

    return NextResponse.json({ message: "added" });
  } catch (err) {
    return NextResponse.json({ err });
  }
}
