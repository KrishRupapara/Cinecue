import { getMovies } from "@/utils/api-requests";
import Image from "next/image";
import { inter } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default async function page({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) {
  const page = searchParams?.page || "1";
  const movies = await getMovies(page);

  return (
    <section className="w-screen">
      <div className="w-4/5 mx-auto pt-24 h-full space-y-6 pb-10">
        <h1 className="text-3xl">Popular movies</h1>
        <div className="flex items-center justify-center gap-7 flex-wrap">
          {movies.results.map((movie, id) => (
            <Link href={`/movie/${movie.id}`} key={id}>
              <div className="pb-4 rounded-lg h-[27rem] shadow-sm shadow-gray-500 hover:border hover:border-primary space-y-3">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  // src={"/image/wonka.webp"}
                  alt="movie_poster"
                  width={200}
                  height={330}
                  className="rounded-lg"
                />
                <div className="pl-2">
                  <h1
                    className={cn(
                      inter.className,
                      "max-w-[180px] font-semibold text-lg"
                    )}
                  >
                    {movie.title}
                  </h1>
                  <p className="text-xs text-gray-400">
                    {new Date(movie.release_date).toDateString().slice(3)}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
