interface Env {
  ADZUNA_APP_ID: string
  ADZUNA_APP_KEY: string
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const url = new URL(request.url)
  const what = url.searchParams.get("what") ?? "data analyst"

  const apiUrl =
    `https://api.adzuna.com/v1/api/jobs/us/geodata` +
    `?app_id=${env.ADZUNA_APP_ID}` +
    `&app_key=${env.ADZUNA_APP_KEY}` +
    `&what=${encodeURIComponent(what)}` +
    `&content-type=application/json`

  const res = await fetch(apiUrl)
  const data = await res.json()

  return Response.json({ markets: data.results ?? [] })
}