interface Env {
  ONET_API_KEY: string
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const url = new URL(request.url)
  const keyword = url.searchParams.get("role") ?? "data analyst"

  const searchRes = await fetch(
    `https://services.onetcenter.org/ws/mnm/search?keyword=${encodeURIComponent(keyword)}`,
    {
      headers: {
        "X-API-Key": env.ONET_API_KEY,
        "Accept": "application/json",
      },
    }
  )

  const searchJson = await searchRes.json()
  const occupation = searchJson?.occupation?.[0]

  return Response.json({
    occupation,
    note: "Map this occupation to your own profile scores in the frontend or a profile endpoint.",
  })
}