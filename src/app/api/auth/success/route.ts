import { db } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function GET() {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    const client = await db.connect();

    if (!user || !user.id) {
      return NextResponse.json("User not found", { status: 500 });
    }

    const User = await client.sql`SELECT * FROM users where ${user.id} = id`;

    const first_name = user.given_name!;
    const last_name = user.family_name!;
    const email = user.email!;

    console.log("User data is");
    console.log(User);

    if (User.rowCount == 0) {
      await client.sql`INSERT INTO users (id, first_name, last_name, email) VALUES (${user.id}, ${first_name}, ${last_name}, ${email})`;
    }
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }

  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/movies`);
}
