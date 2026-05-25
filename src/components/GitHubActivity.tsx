"use client";

import { useEffect, useState } from "react";

const USERNAME = "ipwnds";

const LEVEL_COLORS = [
  "rgba(255,255,255,0.05)",
  "rgba(139,92,246,0.22)",
  "rgba(139,92,246,0.45)",
  "rgba(139,92,246,0.68)",
  "#8b5cf6",
];

interface Day {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface PushCommit {
  message: string;
  distinct: boolean;
}

interface GitHubEvent {
  type: string;
  repo: { name: string };
  payload: { commits?: PushCommit[] };
  created_at: string;
}

function groupByWeek(days: Day[]): (Day | null)[][] {
  if (!days.length) return [];
  const startDay = new Date(days[0].date + "T00:00:00").getDay();
  const weeks: (Day | null)[][] = [];
  let week: (Day | null)[] = Array(startDay).fill(null);
  for (const d of days) {
    week.push(d);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length > 0) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }
  return weeks;
}

function getMonthLabels(weeks: (Day | null)[][]): { label: string; index: number }[] {
  const labels: { label: string; index: number }[] = [];
  let last = -1;
  weeks.forEach((week, wi) => {
    const first = week.find((d) => d !== null);
    if (!first) return;
    const m = new Date(first.date + "T00:00:00").getMonth();
    if (m !== last) {
      labels.push({
        label: new Date(first.date + "T00:00:00").toLocaleString("en-US", { month: "short" }),
        index: wi,
      });
      last = m;
    }
  });
  return labels;
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d ago`;
  return `${Math.floor(d / 30)}mo ago`;
}

const CELL = 11;
const GAP = 2;

export function GitHubActivity() {
  const [weeks, setWeeks] = useState<(Day | null)[][]>([]);
  const [total, setTotal] = useState<number | null>(null);
  const [events, setEvents] = useState<GitHubEvent[]>([]);
  const [state, setState] = useState<"loading" | "done" | "error">("loading");

  useEffect(() => {
    Promise.all([
      fetch(`https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`).then((r) =>
        r.json()
      ),
      fetch(`https://api.github.com/users/${USERNAME}/events/public`).then((r) => r.json()),
    ])
      .then(([contrib, evts]) => {
        setWeeks(groupByWeek(contrib.contributions ?? []));
        setTotal(contrib.total?.lastYear ?? null);
        setEvents(
          (evts as GitHubEvent[]).filter((e) => e.type === "PushEvent").slice(0, 6)
        );
        setState("done");
      })
      .catch(() => setState("error"));
  }, []);

  if (state === "loading") {
    return (
      <div
        style={{
          fontSize: "11px",
          fontFamily: "monospace",
          color: "rgba(255,255,255,0.18)",
        }}
      >
        Loading activity...
      </div>
    );
  }

  if (state === "error") {
    return (
      <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.2)" }}>
        Could not load GitHub activity.
      </div>
    );
  }

  const monthLabels = getMonthLabels(weeks);

  return (
    <div>
      {/* Header row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: "12px",
          flexWrap: "wrap",
          gap: "6px",
        }}
      >
        <a
          href={`https://github.com/${USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: "12px",
            color: "#8b5cf6",
            textDecoration: "none",
            fontFamily: "ui-monospace, Menlo, monospace",
            opacity: 0.9,
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.9")
          }
        >
          @{USERNAME}
        </a>
        {total !== null && (
          <span
            style={{
              fontSize: "11px",
              color: "rgba(255,255,255,0.25)",
              fontFamily: "ui-monospace, Menlo, monospace",
            }}
          >
            {total.toLocaleString()} contributions in the last year
          </span>
        )}
      </div>

      {/* Calendar */}
      <div style={{ overflowX: "auto", paddingBottom: "6px" }}>
        {/* Month labels */}
        <div
          style={{
            position: "relative",
            height: "16px",
            marginBottom: "4px",
            minWidth: weeks.length * (CELL + GAP),
          }}
        >
          {monthLabels.map((m) => (
            <span
              key={m.index + m.label}
              style={{
                position: "absolute",
                left: m.index * (CELL + GAP),
                fontSize: "9px",
                color: "rgba(255,255,255,0.28)",
                fontFamily: "var(--font-pixel), monospace",
                whiteSpace: "nowrap",
                letterSpacing: "0.05em",
              }}
            >
              {m.label}
            </span>
          ))}
        </div>

        {/* Week columns */}
        <div style={{ display: "flex", gap: `${GAP}px` }}>
          {weeks.map((week, wi) => (
            <div
              key={wi}
              style={{ display: "flex", flexDirection: "column", gap: `${GAP}px` }}
            >
              {week.map((day, di) => (
                <div
                  key={di}
                  title={
                    day
                      ? `${day.date} · ${day.count} contribution${day.count !== 1 ? "s" : ""}`
                      : ""
                  }
                  style={{
                    width: CELL,
                    height: CELL,
                    borderRadius: "2px",
                    background: day ? LEVEL_COLORS[day.level] : "transparent",
                    transition: "background 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (day && day.level > 0)
                      (e.currentTarget as HTMLDivElement).style.background =
                        "#a78bfa";
                  }}
                  onMouseLeave={(e) => {
                    if (day)
                      (e.currentTarget as HTMLDivElement).style.background =
                        LEVEL_COLORS[day.level];
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Recent pushes */}
      {events.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <p
            style={{
              fontSize: "9px",
              color: "rgba(255,255,255,0.2)",
              fontFamily: "var(--font-pixel), monospace",
              letterSpacing: "0.14em",
              marginBottom: "10px",
            }}
          >
            RECENT
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
            {events.map((event, i) => {
              const msg =
                event.payload.commits
                  ?.filter((c) => c.distinct)
                  .at(0)
                  ?.message.split("\n")[0] ?? "";
              if (!msg) return null;
              const repo = event.repo.name.split("/").pop() ?? event.repo.name;
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "10px",
                    minWidth: 0,
                  }}
                >
                  <span
                    style={{
                      fontSize: "10px",
                      color: "rgba(139,92,246,0.8)",
                      fontFamily: "ui-monospace, Menlo, monospace",
                      flexShrink: 0,
                      maxWidth: "120px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {repo}
                  </span>
                  <span
                    style={{
                      fontSize: "12px",
                      color: "rgba(255,255,255,0.48)",
                      fontFamily: "ui-monospace, Menlo, monospace",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      flex: 1,
                      minWidth: 0,
                    }}
                  >
                    {msg}
                  </span>
                  <span
                    style={{
                      fontSize: "10px",
                      color: "rgba(255,255,255,0.18)",
                      fontFamily: "ui-monospace, Menlo, monospace",
                      flexShrink: 0,
                    }}
                  >
                    {timeAgo(event.created_at)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
