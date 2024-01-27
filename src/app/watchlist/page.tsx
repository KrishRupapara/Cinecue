import { getWatchList } from "@/utils/api-requests";
import {
  LoginLink,
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { inter } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Link as LinkIcon } from "lucide-react";
import Link from "next/link";

export default async function page() {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user) {
    return (
      <section className="w-screen h-screen flex flex-col gap-2 items-center justify-center">
        <h1 className="text-3xl">
          Please{" "}
          <LoginLink className="text-primary hover:underline">login</LoginLink>{" "}
          to create the watchlist!
        </h1>
      </section>
    );
  }

  const watchlist = await getWatchList(user.id);

  if (watchlist.length === 0) {
    return (
      <section
        className={cn(
          "w-screen h-screen flex items-center justify-center text-3xl gap-2",
          inter.className
        )}
      >
        Add movies to your watchlist to see.
      </section>
    );
  }

  return (
    <section className="w-screen h-screen">
      <div className="w-4/5 mx-auto h-full pt-24 flex gap-5 flex-col">
        {watchlist.map((m, i) => (
          <Link
            key={i}
            href={`/${m.type}/${m.tmdb_id}`}
            className="hover:border hover:border-primary"
          >
            <div className="py-2 px-4 rounded-lg shadow-sm shadow-slate-700 ">
              <div className="text-3xl hover:text-primary">
                <Link href={`/movie/${m.tmdb_id}`}>
                  <h1>{m.title}</h1>
                </Link>
              </div>
              <p>Platform: {m.platform}</p>
              {m.link && (
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1">
                    Link <LinkIcon className="w-4 h-4" />:
                  </span>{" "}
                  <Link
                    href={m.link}
                    className="hover:underline text-primary text-lg"
                  >
                    {m.link}
                  </Link>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
