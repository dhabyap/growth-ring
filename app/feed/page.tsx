"use client";

import { useState } from "react";

const niches = ["All", "Web3", "AI", "SaaS", "Marketing", "Design", "Creator", "General"];

const users = [
  { handle: "@sarahbuilds", name: "Sarah", niche: "Web3", status: "green", followers: 842, views: 2100, looking: ["Mutuals", "Engagement"] },
  { handle: "@aikodev", name: "Aiko", niche: "AI", status: "green", followers: 1203, views: 3400, looking: ["Collaboration"] },
  { handle: "@designdaily", name: "Rina", niche: "Design", status: "amber", followers: 567, views: 890, looking: ["Networking", "Followers"] },
  { handle: "@growthhacker", name: "Dian", niche: "Marketing", status: "green", followers: 2100, views: 5200, looking: ["Engagement", "Mutuals"] },
  { handle: "@indiemaker", name: "Bayu", niche: "SaaS", status: "blue", followers: 340, views: 420, looking: ["Collaboration", "Networking"] },
  { handle: "@cryptochad", name: "Fajar", niche: "Web3", status: "green", followers: 4500, views: 12000, looking: ["Followers", "Mutuals"] },
  { handle: "@contentqueen", name: "Maya", niche: "Creator", status: "green", followers: 3200, views: 8900, looking: ["Engagement", "Collaboration"] },
  { handle: "@techfounder", name: "Raka", niche: "SaaS", status: "amber", followers: 780, views: 1500, looking: ["Networking"] },
];

export default function FeedPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [sort, setSort] = useState("newest");

  const filtered = activeFilter === "All" ? users : users.filter(u => u.niche === activeFilter);
  const sorted = [...filtered].sort((a, b) => {
    if (sort === "followers") return b.followers - a.followers;
    if (sort === "views") return b.views - a.views;
    return 0;
  });

  return (
    <div className="min-h-screen">
      <nav>
        <div className="logo">
          <div className="logo-ring" />
          GrowthRing
        </div>
        <div className="nav-actions">
          <button className="btn btn-ghost btn-sm" onClick={() => window.location.href = "/"}>Home</button>
          <button className="btn btn-primary btn-sm" onClick={() => window.location.href = "/create"}>Create Profile</button>
        </div>
      </nav>

      <div className="container">
        <div className="feed-header">
          <h1>Discovery Feed</h1>
          <p>Browse active users looking to grow on X.</p>
        </div>

        <div className="filter-bar">
          {niches.map(n => (
            <button
              key={n}
              className={`filter-chip ${activeFilter === n ? "active" : ""}`}
              onClick={() => setActiveFilter(n)}
            >
              {n}
            </button>
          ))}
          <select className="sort-select" value={sort} onChange={e => setSort(e.target.value)}>
            <option value="newest">Newest</option>
            <option value="followers">Most Followers</option>
            <option value="views">Most Viewed</option>
          </select>
        </div>

        <div className="feed-grid">
          {sorted.map(u => (
            <div key={u.handle} className="feed-card" onClick={() => window.location.href = "/profile"}>
              <div className="feed-card-top">
                <div className="avatar">{u.name[0]}</div>
                <div className="feed-card-info" style={{ marginLeft: 12 }}>
                  <div className="handle">{u.handle}</div>
                  <div className="niche-label">{u.niche}</div>
                </div>
                <span className={`status-dot dot-${u.status}`} />
              </div>
              <div className="looking-tags">
                {u.looking.map(l => (
                  <span key={l} className="niche-tag">{l}</span>
                ))}
              </div>
              <div className="feed-card-stats">
                <div className="mini-stat">
                  <strong>{u.followers.toLocaleString()}</strong>
                  <span>Followers</span>
                </div>
                <div className="mini-stat">
                  <strong>{u.views.toLocaleString()}</strong>
                  <span>Views</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
