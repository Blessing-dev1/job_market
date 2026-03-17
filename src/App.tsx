import React, { useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  BadgeDollarSign,
  Briefcase,
  Compass,
  Search,
  Sparkles,
  Target,
  TrendingUp,
  UserRound,
  Wrench,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

const marketTrend = [
  { month: "Jan", postings: 18240, salary: 112, interviews: 41 },
  { month: "Feb", postings: 19060, salary: 113, interviews: 42 },
  { month: "Mar", postings: 19890, salary: 114, interviews: 43 },
  { month: "Apr", postings: 20410, salary: 115, interviews: 43 },
  { month: "May", postings: 21230, salary: 116, interviews: 44 },
  { month: "Jun", postings: 21910, salary: 117, interviews: 45 },
  { month: "Jul", postings: 22640, salary: 118, interviews: 46 },
  { month: "Aug", postings: 23120, salary: 119, interviews: 47 },
  { month: "Sep", postings: 23880, salary: 121, interviews: 48 },
  { month: "Oct", postings: 24440, salary: 122, interviews: 49 },
  { month: "Nov", postings: 25120, salary: 124, interviews: 50 },
  { month: "Dec", postings: 25980, salary: 126, interviews: 52 },
];

const roleOutlook = [
  { role: "Data Analyst", openings: 9400, salary: 108, competition: 61 },
  { role: "BI Analyst", openings: 6200, salary: 102, competition: 54 },
  { role: "Product Analyst", openings: 5100, salary: 121, competition: 58 },
  { role: "Data Scientist", openings: 7800, salary: 144, competition: 68 },
  { role: "ML Engineer", openings: 4700, salary: 162, competition: 64 },
  { role: "Analytics Engineer", openings: 4300, salary: 136, competition: 49 },
];

const topMarkets = [
  { market: "Seattle", demand: 92, pay: 89, competition: 61, remote: 53 },
  { market: "Austin", demand: 87, pay: 78, competition: 52, remote: 41 },
  { market: "New York", demand: 90, pay: 94, competition: 73, remote: 45 },
  { market: "Chicago", demand: 74, pay: 71, competition: 46, remote: 37 },
  { market: "Atlanta", demand: 76, pay: 69, competition: 44, remote: 35 },
  { market: "Denver", demand: 81, pay: 75, competition: 48, remote: 43 },
];

const skillGap = [
  { skill: "SQL", yourScore: 86, marketDemand: 93 },
  { skill: "Python", yourScore: 74, marketDemand: 90 },
  { skill: "Experimentation", yourScore: 61, marketDemand: 78 },
  { skill: "Dashboarding", yourScore: 79, marketDemand: 84 },
  { skill: "Statistics", yourScore: 67, marketDemand: 82 },
  { skill: "Stakeholder Comms", yourScore: 71, marketDemand: 80 },
];

const recommendations = [
  {
    title: "Target analytics engineer roles",
    reason: "Demand is rising, compensation is strong, and competition is lower than data science in most major markets.",
    tag: "Best fit",
  },
  {
    title: "Prioritize Seattle, Austin, and Denver",
    reason: "These markets show a strong balance of role volume, remote share, and salary upside for data-focused jobs.",
    tag: "Top markets",
  },
  {
    title: "Close your experimentation gap",
    reason: "A/B testing and causal analysis appear frequently in postings for product and growth analytics roles.",
    tag: "Skill move",
  },
];

const jobs = [
  {
    title: "Senior Product Analyst",
    company: "Northstar",
    market: "Seattle",
    level: "Senior",
    salary: "$134k–$156k",
    fit: 91,
    remote: "Remote",
    skills: ["SQL", "Experimentation", "Python"],
  },
  {
    title: "Analytics Engineer",
    company: "Helio",
    market: "Denver",
    level: "Mid",
    salary: "$126k–$143k",
    fit: 88,
    remote: "Hybrid",
    skills: ["dbt", "SQL", "Warehouse Modeling"],
  },
  {
    title: "Data Analyst, Growth",
    company: "Atlas",
    market: "Austin",
    level: "Mid",
    salary: "$112k–$129k",
    fit: 84,
    remote: "Remote",
    skills: ["SQL", "Tableau", "Experimentation"],
  },
  {
    title: "Business Intelligence Analyst",
    company: "Summit",
    market: "Chicago",
    level: "Entry",
    salary: "$82k–$96k",
    fit: 79,
    remote: "Hybrid",
    skills: ["Power BI", "Excel", "SQL"],
  },
  {
    title: "Data Scientist",
    company: "Forge",
    market: "New York",
    level: "Senior",
    salary: "$152k–$181k",
    fit: 73,
    remote: "On-site",
    skills: ["Python", "ML", "Statistics"],
  },
  {
    title: "Product Analyst",
    company: "Clearpath",
    market: "Atlanta",
    level: "Mid",
    salary: "$108k–$123k",
    fit: 82,
    remote: "Hybrid",
    skills: ["SQL", "Funnels", "Storytelling"],
  },
];

const sourceCards = [
  {
    title: "Job postings",
    body: "Ingest role-level demand, skill frequency, and employer trends from live job board and ATS feeds.",
  },
  {
    title: "Salary benchmarks",
    body: "Blend public compensation datasets and verified benchmarks to estimate market pay ranges by role and location.",
  },
  {
    title: "Career profile",
    body: "Map a candidate’s resume, skills, and goals against the live market to generate personalized recommendations.",
  },
];

const formatNumber = (value: number) => new Intl.NumberFormat("en-US").format(value);

function StatCard({ title, value, hint, icon: Icon }: { title: string; value: string; hint: string; icon: React.ElementType }) {
  return (
    <Card className="rounded-2xl border-0 shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500">{title}</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">{value}</p>
            <p className="mt-2 text-sm text-slate-600">{hint}</p>
          </div>
          <div className="rounded-2xl bg-slate-100 p-3">
            <Icon className="h-5 w-5 text-slate-700" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function JobMarketAnalysisWebsite() {
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("Data Analyst");
  const [market, setMarket] = useState("all");
  const [level, setLevel] = useState("all");

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesQuery =
        query.trim() === "" ||
        `${job.title} ${job.company} ${job.skills.join(" ")}`.toLowerCase().includes(query.toLowerCase());
      const matchesMarket = market === "all" || job.market === market;
      const matchesLevel = level === "all" || job.level === level;
      return matchesQuery && matchesMarket && matchesLevel;
    });
  }, [query, market, level]);

  const selectedRole = useMemo(() => roleOutlook.find((item) => item.role === role) ?? roleOutlook[0], [role]);
  const headlineStats = useMemo(() => {
    const totalOpenings = roleOutlook.reduce((sum, item) => sum + item.openings, 0);
    const avgRemote = Math.round(topMarkets.reduce((sum, item) => sum + item.remote, 0) / topMarkets.length);
    const avgFit = Math.round(filteredJobs.reduce((sum, item) => sum + item.fit, 0) / (filteredJobs.length || 1));
    return { totalOpenings, avgRemote, avgFit };
  }, [filteredJobs]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(15,23,42,0.08),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(15,23,42,0.05),_transparent_28%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-20">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <Badge className="rounded-full bg-slate-900 px-4 py-1.5 text-xs font-medium text-white hover:bg-slate-900">
              Real-time career intelligence
            </Badge>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Make your next job move with live market data, not guesswork.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Track role demand, pay ranges, hiring competition, top locations, and missing skills—then turn those signals into a smarter application strategy.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-[1fr_200px]">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search jobs, skills, or companies"
                  className="h-12 rounded-2xl border-slate-200 pl-10 shadow-sm"
                />
              </div>
              <Button className="h-12 rounded-2xl">Find best opportunities</Button>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 text-sm">
              {[
                "Best-fit roles",
                "Salary benchmarks",
                "Skill gap scoring",
                "Target market recommendations",
              ].map((item) => (
                <div key={item} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-slate-600 shadow-sm">
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          <Card className="rounded-[28px] border-0 bg-slate-950 text-white shadow-xl">
            <CardContent className="p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-300">Your market outlook</p>
                  <p className="mt-2 text-3xl font-semibold tracking-tight">Strong fit for analytics roles</p>
                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    Based on current demand, compensation, and skill overlap, your profile is most competitive in product analytics and analytics engineering.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/10 p-3">
                  <Sparkles className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-sm text-slate-300">Best-fit score</p>
                  <p className="mt-2 text-2xl font-semibold">{headlineStats.avgFit}%</p>
                </div>
                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-sm text-slate-300">Average remote share</p>
                  <p className="mt-2 text-2xl font-semibold">{headlineStats.avgRemote}%</p>
                </div>
                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-sm text-slate-300">Top market</p>
                  <p className="mt-2 text-2xl font-semibold">Seattle</p>
                </div>
                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-sm text-slate-300">Most valuable gap</p>
                  <p className="mt-2 text-2xl font-semibold">Experimentation</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard title="Openings tracked" value={formatNumber(headlineStats.totalOpenings)} hint="Across adjacent analytics paths" icon={Briefcase} />
          <StatCard title="Median pay index" value={`$${selectedRole.salary}k`} hint={`For ${selectedRole.role} roles`} icon={BadgeDollarSign} />
          <StatCard title="Competition score" value={`${selectedRole.competition}/100`} hint="Lower scores are easier markets" icon={Target} />
          <StatCard title="Role momentum" value="+14.8%" hint="Twelve-month posting growth" icon={TrendingUp} />
        </div>

        <Card className="mt-8 rounded-2xl border-0 shadow-sm">
          <CardContent className="grid gap-4 p-5 lg:grid-cols-[220px_220px_220px_1fr] lg:items-center">
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger className="h-11 rounded-2xl border-slate-200 bg-white">
                <SelectValue placeholder="Target role" />
              </SelectTrigger>
              <SelectContent>
                {roleOutlook.map((item) => (
                  <SelectItem key={item.role} value={item.role}>{item.role}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={market} onValueChange={setMarket}>
              <SelectTrigger className="h-11 rounded-2xl border-slate-200 bg-white">
                <SelectValue placeholder="Market" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All markets</SelectItem>
                {topMarkets.map((item) => (
                  <SelectItem key={item.market} value={item.market}>{item.market}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={level} onValueChange={setLevel}>
              <SelectTrigger className="h-11 rounded-2xl border-slate-200 bg-white">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All levels</SelectItem>
                <SelectItem value="Entry">Entry</SelectItem>
                <SelectItem value="Mid">Mid</SelectItem>
                <SelectItem value="Senior">Senior</SelectItem>
              </SelectContent>
            </Select>

            <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
              <span className="font-medium text-slate-900">Recommendation:</span> Focus applications on roles where your fit is above 80 and competition is below 60.
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.4fr_1fr]">
          <Card className="rounded-2xl border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Demand trend for career targets</CardTitle>
              <CardDescription>Live postings trend for high-value data and analytics pathways.</CardDescription>
            </CardHeader>
            <CardContent className="h-[360px] pr-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={marketTrend}>
                  <defs>
                    <linearGradient id="careerFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0f172a" stopOpacity={0.22} />
                      <stop offset="95%" stopColor="#0f172a" stopOpacity={0.03} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="postings" stroke="#0f172a" fill="url(#careerFill)" strokeWidth={2.5} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Your skill gap vs market</CardTitle>
              <CardDescription>Compare your current strength to what employers ask for most often.</CardDescription>
            </CardHeader>
            <CardContent className="h-[360px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={skillGap} outerRadius={110}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="skill" tick={{ fontSize: 12 }} />
                  <PolarRadiusAxis />
                  <Radar dataKey="marketDemand" stroke="#111827" fill="#111827" fillOpacity={0.12} />
                  <Radar dataKey="yourScore" stroke="#6b7280" fill="#6b7280" fillOpacity={0.22} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <Card className="rounded-2xl border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Role outlook comparison</CardTitle>
              <CardDescription>Balance openings, compensation, and competition when choosing which titles to target.</CardDescription>
            </CardHeader>
            <CardContent className="h-[340px] pr-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={roleOutlook} margin={{ left: 10, right: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="role" tickLine={false} axisLine={false} angle={-18} textAnchor="end" height={70} />
                  <YAxis tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Bar dataKey="openings" radius={[12, 12, 0, 0]} fill="#111827" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Recommended next moves</CardTitle>
              <CardDescription>Actionable suggestions generated from your profile and live market conditions.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recommendations.map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  className="rounded-2xl border border-slate-200 bg-white p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Badge variant="secondary" className="rounded-full bg-slate-100 text-slate-700 hover:bg-slate-100">{item.tag}</Badge>
                      <h3 className="mt-3 font-semibold text-slate-900">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{item.reason}</p>
                    </div>
                    <ArrowRight className="mt-1 h-4 w-4 text-slate-400" />
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_1fr]">
          <Card className="rounded-2xl border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Best markets to target</CardTitle>
              <CardDescription>Compare pay, demand, competition, and remote flexibility across markets.</CardDescription>
            </CardHeader>
            <CardContent className="h-[320px] pr-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={topMarkets}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="market" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="demand" stroke="#111827" strokeWidth={2.5} />
                  <Line type="monotone" dataKey="pay" stroke="#6b7280" strokeWidth={2.5} />
                  <Line type="monotone" dataKey="competition" stroke="#9ca3af" strokeWidth={2.5} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">How the product uses real data</CardTitle>
              <CardDescription>What powers the recommendations and career guidance layer.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {sourceCards.map((item) => (
                <div key={item.title} className="rounded-2xl bg-slate-50 p-4">
                  <p className="font-semibold text-slate-900">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.body}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6 rounded-2xl border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Best-fit opportunity list</CardTitle>
            <CardDescription>{filteredJobs.length} roles currently match your active filters and profile direction.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Role</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Market</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Salary</TableHead>
                    <TableHead>Fit score</TableHead>
                    <TableHead>Work mode</TableHead>
                    <TableHead>Skills</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredJobs.map((job) => (
                    <TableRow key={`${job.title}-${job.company}`}>
                      <TableCell className="font-medium">{job.title}</TableCell>
                      <TableCell>{job.company}</TableCell>
                      <TableCell>{job.market}</TableCell>
                      <TableCell>{job.level}</TableCell>
                      <TableCell>{job.salary}</TableCell>
                      <TableCell>
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">{job.fit}%</span>
                      </TableCell>
                      <TableCell>{job.remote}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-2">
                          {job.skills.map((skill) => (
                            <Badge key={skill} variant="secondary" className="rounded-full bg-slate-100 text-slate-700 hover:bg-slate-100">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <section className="mt-8 grid gap-6 lg:grid-cols-3">
          <Card className="rounded-2xl border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="rounded-2xl bg-slate-100 p-3 w-fit">
                <Compass className="h-5 w-5 text-slate-700" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">Career direction</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">Use labor-market signals to decide which adjacent roles give you the best upside, not just the best title.</p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="rounded-2xl bg-slate-100 p-3 w-fit">
                <Wrench className="h-5 w-5 text-slate-700" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">Skill planning</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">Focus on one or two high-leverage gaps that repeatedly appear in target postings and raise your fit score fastest.</p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="rounded-2xl bg-slate-100 p-3 w-fit">
                <UserRound className="h-5 w-5 text-slate-700" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">Application strategy</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">Prioritize markets and roles with strong demand and moderate competition before branching into more crowded pathways.</p>
            </CardContent>
          </Card>
        </section>

        <section className="mt-8">
          <Card className="rounded-[28px] border-0 bg-slate-950 text-white shadow-xl">
            <CardContent className="grid gap-8 p-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Next product step</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight">Connect live job feeds and turn this into a working career intelligence platform.</h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
                  Replace the demo dataset with live postings, salary sources, and resume parsing to deliver personalized recommendations, job matching, and application prioritization.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Button variant="secondary" className="h-12 rounded-2xl px-6 text-slate-950">
                  Connect data APIs
                </Button>
                <Button className="h-12 rounded-2xl border border-white/15 bg-white/10 px-6 text-white hover:bg-white/15">
                  View user journey
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
