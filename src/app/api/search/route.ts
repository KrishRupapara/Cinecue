import { getSearchItem } from "@/utils/api-requests";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return Response.json({ message: "No query" });
  }

  try {
    const res = await getSearchItem(true, query!);

    return Response.json({ data: res });
  } catch (err) {
    return Response.json({ error: err });
  }
}
