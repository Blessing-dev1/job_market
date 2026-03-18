interface Env {
  BLS_REGISTRATION_KEY?: string
}

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const body: Record<string, unknown> = {
    seriesid: ["LNS14000000"],
    startyear: "2024",
    endyear: "2026",
  }

  if (env.BLS_REGISTRATION_KEY) {
    body.registrationkey = env.BLS_REGISTRATION_KEY
    body.catalog = true
    body.calculations = true
  }

  const res = await fetch("https://api.bls.gov/publicAPI/v2/timeseries/data/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })

  const json = await res.json() as any
  const series = json?.Results?.series?.[0]?.data ?? []

  const trend = series
    .filter((d: any) => d.period?.startsWith("M"))
    .map((d: any) => ({
      month: `${d.periodName} ${d.year}`,
      value: Number(d.value),
    }))
    .reverse()

  return Response.json({ trend })
}