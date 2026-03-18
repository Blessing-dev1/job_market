interface Env {
  ADZUNA_APP_ID: string
  ADZUNA_APP_KEY: string
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.ADZUNA_APP_ID || !env.ADZUNA_APP_KEY) {
    return Response.json(
      { error: "Missing Adzuna credentials in environment variables." },
      { status: 500 }
    )
  }

  const url = new URL(request.url)
  const what = (url.searchParams.get("what") || "data analyst").trim()
  const where = (url.searchParams.get("where") || "").trim()
  const page = url.searchParams.get("page") || "1"

  const params = new URLSearchParams({
    app_id: env.ADZUNA_APP_ID,
    app_key: env.ADZUNA_APP_KEY,
    what,
    "content-type": "application/json",
    results_per_page: "20",
    sort_by: "date",
  })

  if (where && where.toLowerCase() !== "all" && where.toLowerCase() !== "us") {
    params.set("where", where)
  }

  const apiUrl = `https://api.adzuna.com/v1/api/jobs/us/search/${page}?${params.toString()}`
  const res = await fetch(apiUrl)

  if (!res.ok) {
    const text = await res.text()
    return Response.json(
      { error: "Adzuna request failed", status: res.status, details: text },
      { status: 502 }
    )
  }

  const data = await res.json<any>()

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

  return Response.json({
    count: jobs.length,
    jobs,
  })
}