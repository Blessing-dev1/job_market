interface Env {
  ADZUNA_APP_ID: string
  ADZUNA_APP_KEY: string
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const url = new URL(request.url)
  const what = url.searchParams.get("what") ?? "data analyst"
  const where = url.searchParams.get("where") ?? "us"
  const page = url.searchParams.get("page") ?? "1"

  const apiUrl =
    `https://api.adzuna.com/v1/api/jobs/us/search/${page}` +
    `?app_id=${env.ADZUNA_APP_ID}` +
    `&app_key=${env.ADZUNA_APP_KEY}` +
    `&what=${encodeURIComponent(what)}` +
    `&where=${encodeURIComponent(where)}` +
    `&content-type=application/json`

  const res = await fetch(apiUrl)
  const data = await res.json()

  const jobs = (data.results ?? []).map((job: any) => ({
    id: job.id,
    title: job.title,
    company: job.company?.display_name ?? "Unknown",
    location: job.location?.display_name ?? "",
    salaryMin: job.salary_min ?? null,
    salaryMax: job.salary_max ?? null,
    redirectUrl: job.redirect_url,
    description: job.description ?? "",
  }))

  return Response.json({ jobs })
}