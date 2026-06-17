"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AuthNav from "../AuthNav";

const niches = ["All", "Web3", "AI", "SaaS", "Marketing", "Design", "Creator", "General"];

interface Profile {
  id: string;
  xUsername: string;
  displayName: string;
  bio: string | null;
  avatarUrl: string | null;
  niche: string;
  country: string;
  lookingFor: string[];
  lastActive: string;
  createdAt: string;
}

export default function FeedPage() {
  const [activeNiche, setActiveNiche] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/profiles")
      .then(res => res.json())
      .then(data => {
        setProfiles(data.profiles || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = activeNiche === "All"
    ? profiles
    : profiles.filter(p => p.niche === activeNiche);

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    return 0;
  });

  return (
    <div className="min-h-screen">
      <AuthNav />

      <div className="container">
        <div className="section-pad">
          <h1 style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.8, marginBottom: 4 }}>Discovery Feed</h1>
          <p style={{ fontSize: 14, color: "var(--text2)", marginBottom: 24 }}>Browse active users looking to grow on X.</p>

          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {niches.map(n => (
                <button
                  key={n}
                  className={`btn btn-sm ${activeNiche === n ? "btn-primary" : "btn-ghost"}`}
                  onClick={() => setActiveNiche(n)}
                >
                  {n}
                </button>
              ))}
            </div>
            <select
              style={{ marginLeft: "auto", width: "auto" }}
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
            >
              <option value="newest">Newest</option>
              <option value="most-followers">Most Followers</option>
              <option value="most-viewed">Most Viewed</option>
            </select>
          </div>

          {loading ? (
            <p style={{ textAlign: "center", color: "var(--text3)", padding: 40 }}>Loading...</p>
          ) : sorted.length === 0 ? (
            <div style={{ textAlign: "center", padding: 60 }}>
              <p style={{ color: "var(--text3)", fontSize: 16, marginBottom: 16 }}>No profiles found.</p>
              <Link href="/create" className="btn btn-primary">Create the first profile!</Link>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
              {sorted.map((p, i) => (
                <Link href={`/profile/${p.xUsername}`} key={p.id} style={{ textDecoration: "none", color: "inherit" }}>
                  <div className="user-card">
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                      <div className="avatar">{p.displayName[0].toUpperCase()}</div>
                      <div>
                        <div style={{ fontWeight: 700 }}>{p.displayName}</div>
                        <div className="handle">@{p.xUsername}</div>
                      </div>
                      <span className="status-badge badge-green" style={{ marginLeft: "auto" }}>
                        <span className="status-dot dot-green" />Active
                      </span>
                    </div>
                    {p.bio && <p style={{ fontSize: 13, color: "var(--text2)", marginBottom: 10 }}>{p.bio}</p>}
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      <span className="niche-tag">{p.niche}</span>
                      {p.country && <span className="niche-tag">🌍 {p.country}</span>}
                    </div>
                    <div style={{ display: "flex", gap: 12, marginTop: 12, paddingTop: 12, borderTop: "1px solid var(--border)" }}>
                      <div className="stat-row"><span className="rank-badge">#{i + 1}</span></div>
                      <div className="stat-row"><strong>{p.lookingFor.length}</strong> looking for</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
