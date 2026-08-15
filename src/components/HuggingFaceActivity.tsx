"use client";

import { useEffect, useState } from "react";

const USERNAME = "iPwnds";
const ACCENT = "#a78bfa";

interface Repo {
  id: string;
  kind: "model" | "dataset";
  downloads: number;
  likes: number;
}

interface HFModelDataset {
  id: string;
  downloads?: number;
  likes?: number;
}

export function HuggingFaceActivity() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [state, setState] = useState<"loading" | "done" | "error">("loading");

  useEffect(() => {
    const load = async () => {
      const [models, datasets]: [HFModelDataset[], HFModelDataset[]] = await Promise.all([
        fetch(`https://huggingface.co/api/models?author=${USERNAME}`).then((r) => r.json()),
        fetch(`https://huggingface.co/api/datasets?author=${USERNAME}`).then((r) => r.json()),
      ]);

      const combined: Repo[] = [
        ...(Array.isArray(models) ? models : []).map((m) => ({
          id: m.id, kind: "model" as const, downloads: m.downloads ?? 0, likes: m.likes ?? 0,
        })),
        ...(Array.isArray(datasets) ? datasets : []).map((d) => ({
          id: d.id, kind: "dataset" as const, downloads: d.downloads ?? 0, likes: d.likes ?? 0,
        })),
      ].sort((a, b) => b.downloads - a.downloads);

      setRepos(combined);
      setState("done");
    };

    load().catch(() => setState("error"));
  }, []);

  if (state === "loading") {
    return (
      <div style={{ fontSize: "11px", fontFamily: "monospace", color: "rgba(255,255,255,0.18)" }}>
        Loading activity...
      </div>
    );
  }

  if (state === "error") {
    return (
      <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.2)" }}>
        Could not load Hugging Face activity.
      </div>
    );
  }

  const totalDownloads = repos.reduce((n, r) => n + r.downloads, 0);

  return (
    <div>
      {/* Header row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: "16px",
          flexWrap: "wrap",
          gap: "6px",
        }}
      >
        <a
          href={`https://huggingface.co/${USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: "12px",
            color: ACCENT,
            textDecoration: "none",
            fontFamily: "ui-monospace, Menlo, monospace",
            opacity: 0.9,
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.9")}
        >
          @{USERNAME}
        </a>
        <span
          style={{
            fontSize: "11px",
            color: "rgba(255,255,255,0.25)",
            fontFamily: "ui-monospace, Menlo, monospace",
          }}
        >
          {repos.length} repo{repos.length !== 1 ? "s" : ""} · {totalDownloads.toLocaleString()} downloads
        </span>
      </div>

      {/* Repo list */}
      {repos.length === 0 ? (
        <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.2)" }}>No public repos yet.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "13px" }}>
          {repos.slice(0, 6).map((repo) => (
            <div key={repo.id} style={{ display: "flex", alignItems: "baseline", gap: "12px", minWidth: 0 }}>
              <span
                style={{
                  fontSize: "8px",
                  fontFamily: "var(--font-pixel), monospace",
                  color: repo.kind === "model" ? ACCENT : "rgba(56,189,248,0.85)",
                  border: `1px solid ${repo.kind === "model" ? ACCENT : "#38bdf8"}44`,
                  borderRadius: "3px",
                  padding: "2px 5px 1px",
                  flexShrink: 0,
                  textTransform: "uppercase",
                }}
              >
                {repo.kind}
              </span>
              <a
                href={`https://huggingface.co/${repo.kind === "dataset" ? "datasets/" : ""}${repo.id}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.55)",
                  textDecoration: "none",
                  fontFamily: "ui-monospace, Menlo, monospace",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  flex: 1,
                  minWidth: 0,
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.85)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.55)")}
              >
                {repo.id.split("/").pop()}
              </a>
              <span
                style={{
                  fontSize: "10px",
                  color: "rgba(255,255,255,0.18)",
                  fontFamily: "ui-monospace, Menlo, monospace",
                  flexShrink: 0,
                }}
              >
                {repo.downloads.toLocaleString()}↓
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
