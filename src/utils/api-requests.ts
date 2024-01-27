import { movieDetails, moviesList } from "@/types/movies";
import { searchResult } from "@/types/search";
import { showDetails, showsList } from "@/types/tv-shows";
import { db } from "@vercel/postgres";

const reqOption = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
  },
};

export async function getMovies(page: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`,
    reqOption
  );
  const movies = (await res.json()) as moviesList;
  return movies;
}

export async function getMovieDetails(id: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}`,
    reqOption
  );
  const movieDetails = (await res.json()) as movieDetails;

  return movieDetails;
}

export async function getShows(page: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/popular?language=en-US&page=${page}`,
    reqOption
  );
  const shows = (await res.json()) as showsList;
  return shows;
}

export async function getShowDetails(id: string) {
  const res = await fetch(`https://api.themoviedb.org/3/tv/${id}`, reqOption);
  const showDetails = (await res.json()) as showDetails;

  return showDetails;
}

export async function getWatchList(userID: string) {
  const client = await db.connect();

  const res =
    await client.sql`SELECT * FROM watchlist_item where user_id = ${userID}`;

  return res.rows;
}

export async function getSearchItem(adult: boolean, query: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=${adult}&language=en-US&page=1`,
    reqOption
  );

  const resDetails = (await res.json()) as searchResult;

  return resDetails;
}

export async function getSearchAPI(query: string) {
  const params = new URLSearchParams([["query", query]]).toString();

  const newUrl = new URL(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/search?${params}`
  );

  // console.log(query);

  const res = await fetch(newUrl.href, { method: "GET" }).then((val) =>
    val.json()
  );

  return res;
}
