export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "application/json",
    }

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders })
    }

    if (url.pathname === "/health") {
      return new Response(JSON.stringify({ ok: true }), { headers: corsHeaders })
    }

    if (url.pathname === "/jobs") {
      if (!env.ADZUNA_APP_ID || !env.ADZUNA_APP_KEY) {
        return new Response(
          JSON.stringify({ error: "Missing Adzuna secrets" }),
          { status: 500, headers: corsHeaders }
        )
      }

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

      const adzunaUrl = `https://api.adzuna.com/v1/api/jobs/us/search/${page}?${params.toString()}`
      const res = await fetch(adzunaUrl, {
        headers: { Accept: "application/json" },
      })

      if (!res.ok) {
        const text = await res.text()
        return new Response(
          JSON.stringify({ error: "Adzuna failed", status: res.status, details: text }),
          { status: 502, headers: corsHeaders }
        )
      }

      const data = await res.json()

      const jobs = (data.results || []).map((job) => ({
        id: job.id,
        title: job.title,
        company: job.company?.display_name || "Unknown",
        location: job.location?.display_name || "",
        salaryMin: job.salary_min ?? null,
        salaryMax: job.salary_max ?? null,
        redirectUrl: job.redirect_url,
        description: job.description || "",
      }))

      return new Response(JSON.stringify({ count: jobs.length, jobs }), {
        headers: corsHeaders,
      })
    }

    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
      headers: corsHeaders,
    })
  },
}