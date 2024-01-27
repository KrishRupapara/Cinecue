import { getShowDetails } from "@/utils/api-requests";
import Image from "next/image";
import { inter } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Bookmark, Star } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import WatchLater from "@/components/WatchLater";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function page({ params }: { params: { id: string } }) {
  const show = await getShowDetails(params.id);

  const { getUser } = getKindeServerSession();

  const user = await getUser();

  return (
    <section className="w-screen h-screen flex items-center justify-center">
      <div className="w-4/5 mx-auto flex items-center justify-center gap-10 overflow-hidden">
        <div>
          <Image
            src={`https://image.tmdb.org/t/p/original${show.poster_path}`}
            alt="movie_poster"
            width={300}
            height={550}
            className="rounded-lg min-w-[300px] aspect-[2/3] hover:border hover:border-primary"
          />
        </div>
        <div className="flex flex-col justify-around space-y-4">
          <div>
            <div className="flex items-end justify-between">
              <h1 className={cn(inter.className, "text-5xl font-semibold")}>
                {show.name}
                <span className="text-sm text-gray-400 select-none ml-2">
                  ({show.first_air_date.slice(0, 4)})
                </span>
              </h1>
              <div className="flex items-center gap-2">
                <Star className="text-primary w-8 h-8" />
                <p className="text-lg whitespace-nowrap">
                  <span className="text-5xl">
                    {Math.round(
                      (Number(show.vote_average) + Number.EPSILON) * 100
                    ) / 100}
                  </span>{" "}
                  / 10
                </p>
              </div>
            </div>
            <h1 className="italic text-primary text-sm">{show.tagline}</h1>
          </div>
          <div className="">
            <ul className="space-x-1 mb-6">
              {show.genres.map((genre, i) => (
                <li key={i} className={cn(buttonVariants(), "cursor-default")}>
                  {genre.name}
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-4 mb-3">
              <WatchLater
                title={show.name}
                id={show.id}
                type="tv"
                userId={user?.id || ""}
              />
              <Bookmark className="w-8 h-8 hover:text-primary" />
            </div>
            <h1 className={cn(inter.className, "font-semibold")}>Overview</h1>
            <h1>{show.overview}</h1>
          </div>
        </div>
      </div>
    </section>
  );
}
