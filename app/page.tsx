"use client";

import { useState, useEffect, useCallback } from "react";
import "./growthring.css";

const users = [
  { handle: "@by0x_", name: "Byx Zero", niche: "Web3", status: "green" as const, followers: "38", views: "124", country: "ID", looking: ["Mutuals", "Engagement", "Web3 Friends"] },
  { handle: "@indie_dev", name: "Indie Dev", niche: "SaaS", status: "green" as const, followers: "1.2K", views: "98", country: "US", looking: ["Collaboration", "Followers"] },
  { handle: "@designer_pro", name: "Designer Pro", niche: "Design", status: "amber" as const, followers: "540", views: "72", country: "UK", looking: ["Networking", "Engagement"] },
  { handle: "@aibuilder", name: "AI Builder", niche: "AI", status: "blue" as const, followers: "89", views: "61", country: "SG", looking: ["Mutuals", "Collaboration"] },
  { handle: "@mktg_kate", name: "Kate Mktg", niche: "Marketing", status: "green" as const, followers: "2.3K", views: "55", country: "US", looking: ["Networking"] },
  { handle: "@web3_jess", name: "Jess Web3", niche: "Web3", status: "amber" as const, followers: "210", views: "49", country: "ID", looking: ["Mutuals", "Web3 Friends"] },
  { handle: "@creatorhub", name: "Creator Hub", niche: "Creator", status: "green" as const, followers: "5.1K", views: "47", country: "PH", looking: ["Followers", "Engagement"] },
  { handle: "@dev_solo", name: "Dev Solo", niche: "SaaS", status: "blue" as const, followers: "17", views: "38", country: "IN", looking: ["Mutuals", "Collaboration"] },
  { handle: "@uxnomad", name: "UX Nomad", niche: "Design", status: "green" as const, followers: "920", views: "33", country: "NL", looking: ["Networking"] },
  { handle: "@crypto_jan", name: "Jan Crypto", niche: "Web3", status: "amber" as const, followers: "305", views: "29", country: "DE", looking: ["Mutuals"] },
  { handle: "@saas_pete", name: "Pete SaaS", niche: "SaaS", status: "green" as const, followers: "780", views: "27", country: "CA", looking: ["Followers", "Networking"] },
  { handle: "@airesearch", name: "AI Research", niche: "AI", status: "blue" as const, followers: "44", views: "24", country: "JP", looking: ["Collaboration"] },
];

type Page = "landing" | "feed" | "profile" | "create";

export default function Home() {
  const [page, setPage] = useState<Page>("landing");
  const [filter, setFilter] = useState("All");
  const [userCount, setUserCount] = useState(4832);
  const [selectedNiches, setSelectedNiches] = useState<string[]>([]);
  const [selectedLooking, setSelectedLooking] = useState<string[]>([]);
  const [inputHandle, setInputHandle] = useState("");
  const [inputName, setInputName] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) setUserCount((c) => c + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const navigate = useCallback((p: Page) => {
    setPage(p);
    window.scrollTo(0, 0);
  }, []);

  const togglePill = (item: string, type: "niche" | "looking") => {
    if (type === "niche") {
      setSelectedNiches((prev) => prev.includes(item) ? prev.filter((n) => n !== item) : [...prev, item]);
    } else {
      setSelectedLooking((prev) => prev.includes(item) ? prev.filter((n) => n !== item) : [...prev, item]);
    }
  };

  const filteredUsers = filter === "All" ? users : users.filter((u) => u.niche === filter);
  const initials = inputHandle.replace("@", "").substring(0, 2) || "?";

  const statusBadge = (status: string) => {
    const cls = status === "green" ? "badge-green" : status === "amber" ? "badge-amber" : "badge-blue";
    const dot = status === "green" ? "dot-green" : status === "amber" ? "dot-amber" : "dot-blue";
    return <span className={`status-badge ${cls}`}><span className={`status-dot ${dot}`}></span></span>;
  };

  const statusBadgeLabel = (status: string, label: string) => {
    const cls = status === "green" ? "badge-green" : status === "amber" ? "badge-amber" : "badge-blue";
    const dot = status === "green" ? "dot-green" : status === "amber" ? "dot-amber" : "dot-blue";
    return <span className={`status-badge ${cls}`}><span className={`status-dot ${dot}`}></span>{label}</span>;
  };

  return (
    <div>
      <nav>
        <div className="logo" onClick={() => navigate("landing")}>
          <div className="logo-ring"></div>
          GrowthRing
        </div>
        <div className="nav-actions">
          <button className="btn btn-ghost btn-sm" onClick={() => navigate("feed")}>Browse Feed</button>
          <button className="btn btn-primary btn-sm" onClick={() => navigate("create")}>Create Profile</button>
        </div>
      </nav>

      {/* LANDING */}
      {page === "landing" && (
        <>
          <div className="hero">
            <div className="hero-eyebrow">
              <span className="live-dot"></span>
              <span>1,247 users active today</span>
            </div>
            <h1>Discover active accounts.<br /><span>Grow together</span> on X.</h1>
            <p className="hero-sub">The discovery network for active X users who want real visibility, real engagement, and real growth — not random follows.</p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => navigate("create")}>Create Your Profile</button>
              <button className="btn btn-outline" onClick={() => navigate("feed")}>Browse the Feed</button>
            </div>
            <div className="live-stats">
              <div className="live-stat-item">
                <span className="live-stat-num">{userCount.toLocaleString()}</span>
                <span className="live-stat-label">Profiles created</span>
              </div>
              <div className="live-stat-item">
                <span className="live-stat-num">1,247</span>
                <span className="live-stat-label">Active today</span>
              </div>
              <div className="live-stat-item">
                <span className="live-stat-num">38.4K</span>
                <span className="live-stat-label">Profile views</span>
              </div>
              <div className="live-stat-item">
                <span className="live-stat-num">12.1K</span>
                <span className="live-stat-label">X clicks out</span>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="section-pad">
              <div className="section-header">
                <h2 className="section-title">Trending Growers Today</h2>
                <button className="section-link" onClick={() => navigate("feed")}>See all →</button>
              </div>
              <div className="trending-grid">
                {users.slice(0, 5).map((u, i) => (
                  <div key={u.handle} className="trending-card" onClick={() => navigate("profile")}>
                    <div className="trending-rank">
                      <span>#{i + 1} TODAY</span>
                      {statusBadgeLabel(u.status, u.status === "green" ? "Active Now" : u.status === "amber" ? "This Week" : "New Member")}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                      <div className="avatar">{u.handle.replace("@", "").substring(0, 2)}</div>
                      <div>
                        <div className="handle">{u.handle}</div>
                        <div className="niche-label">{u.niche}</div>
                      </div>
                    </div>
                    <div className="stat-row"><strong>{u.followers}</strong>&nbsp;followers · <strong>{u.views}</strong>&nbsp;views today</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="how-section">
              <div className="section-header">
                <h2 className="section-title">How it works</h2>
              </div>
              <div className="how-steps">
                {[
                  { num: "STEP 01", title: "Create your profile", desc: "Add your X handle, niche, bio, and what you're looking for. Takes under 2 minutes." },
                  { num: "STEP 02", title: "Appear in the feed", desc: "Your profile is discoverable to thousands of active users filtering by niche and activity." },
                  { num: "STEP 03", title: "Get discovered", desc: "Collect profile views, climb the daily rankings, and attract followers in your exact niche." },
                  { num: "STEP 04", title: "Share your rank", desc: "Auto-generated share cards let you post your ranking on X and loop in more users." },
                ].map((s) => (
                  <div key={s.num} className="how-step">
                    <span className="step-num">{s.num}</span>
                    <div className="step-title">{s.title}</div>
                    <p className="step-desc">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="cta-section">
              <div className="cta-box">
                <h2>Ready to get discovered?</h2>
                <p>Join thousands of active X users already growing on GrowthRing. It&apos;s free to get started.</p>
                <button className="btn btn-primary" onClick={() => navigate("create")} style={{ padding: "12px 32px", fontSize: 15 }}>Create Your Profile</button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* FEED */}
      {page === "feed" && (
        <div className="container">
          <div className="feed-header">
            <h1>Discovery Feed</h1>
            <p>{userCount.toLocaleString()} active profiles — updated in real time</p>
          </div>
          <div className="filter-bar">
            {["All", "Web3", "AI", "SaaS", "Design", "Marketing", "Creator"].map((f) => (
              <button key={f} className={`filter-chip ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>{f}</button>
            ))}
            <select className="sort-select">
              <option>Most Active</option>
              <option>Newest</option>
              <option>Fastest Growing</option>
              <option>Most Viewed</option>
            </select>
          </div>
          <div className="feed-grid">
            {filteredUsers.map((u) => (
              <div key={u.handle} className="feed-card" onClick={() => navigate("profile")}>
                <div className="feed-card-top">
                  <div style={{ display: "flex", gap: 10, alignItems: "center", flex: 1, minWidth: 0 }}>
                    <div className="avatar">{u.handle.replace("@", "").substring(0, 2)}</div>
                    <div className="feed-card-info">
                      <div className="handle">{u.handle}</div>
                      <div className="niche-label">{u.niche}</div>
                    </div>
                  </div>
                  {statusBadge(u.status)}
                </div>
                <div className="looking-tags">
                  {u.looking.map((l) => <span key={l} className="niche-tag">{l}</span>)}
                </div>
                <div className="feed-card-stats">
                  <div className="mini-stat"><strong>{u.followers}</strong><span>followers</span></div>
                  <div className="mini-stat"><strong>{u.views}</strong><span>views/day</span></div>
                  <div className="mini-stat"><strong>{u.country}</strong><span>country</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PROFILE */}
      {page === "profile" && (
        <div className="container">
          <div className="profile-hero">
            <div className="profile-top">
              <div className="avatar avatar-lg">b0</div>
              <div className="profile-meta">
                <div className="profile-name">Byx Zero</div>
                <span className="profile-handle">@by0x_</span>
                <p className="profile-bio">Building on Web3. Exploring decentralized systems, DeFi protocols, and the open internet. Always down to connect with other builders.</p>
                <div className="profile-tags">
                  <span className="niche-tag">Web3</span>
                  <span className="niche-tag">DeFi</span>
                  <span className="niche-tag">Crypto</span>
                  <span className="niche-tag">🇮🇩 Indonesia</span>
                </div>
                <div className="profile-actions">
                  <button className="btn btn-primary btn-sm">Follow on X</button>
                  <button className="btn btn-outline btn-sm">View X Profile</button>
                  {statusBadgeLabel("green", "Active Today")}
                </div>
              </div>
            </div>
            <div className="profile-stats">
              <div className="stat-box"><span className="stat-box-num">38</span><div className="stat-box-label">Followers on X</div></div>
              <div className="stat-box"><span className="stat-box-num">124</span><div className="stat-box-label">Profile views today</div></div>
              <div className="stat-box"><span className="stat-box-num">#1</span><div className="stat-box-label">Rank today</div></div>
            </div>
          </div>
          <div className="profile-section">
            <div className="section-title" style={{ fontSize: 14, fontWeight: 700, color: "var(--text2)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 4 }}>Looking For</div>
            <div className="looking-for-grid">
              {["Mutuals", "Engagement", "Web3 Friends", "Collaboration"].map((l) => (
                <div key={l} className="lf-item"><div className="lf-check"></div>{l}</div>
              ))}
            </div>
          </div>
          <div className="share-card">
            <div className="share-card-text">
              <strong>Ranked #1 on GrowthRing today.</strong>
              Share this to X to bring in more visitors.
            </div>
            <button className="btn btn-primary btn-sm">Share Ranking</button>
          </div>
          <div style={{ padding: "24px 0 40px" }}>
            <button className="btn btn-ghost btn-sm" onClick={() => navigate("feed")}>← Back to Feed</button>
          </div>
        </div>
      )}

      {/* CREATE */}
      {page === "create" && (
        <div className="container">
          <div className="create-page">
            <div className="create-header">
              <h1>Create your profile</h1>
              <p>Join the discovery network. Get found by active X users in your niche.</p>
            </div>
            <div className="progress-steps">
              <div className="progress-step done"></div>
              <div className="progress-step current"></div>
              <div className="progress-step"></div>
            </div>
            <div className="create-form">
              <div className="form-group">
                <label>X Username</label>
                <input type="text" placeholder="@yourhandle" value={inputHandle} onChange={(e) => setInputHandle(e.target.value)} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Display Name</label>
                  <input type="text" placeholder="Your name" value={inputName} onChange={(e) => setInputName(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Country</label>
                  <select>
                    <option>Indonesia</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Singapore</option>
                    <option>Malaysia</option>
                    <option>Philippines</option>
                    <option>India</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Bio</label>
                <textarea rows={3} placeholder="Tell people what you build, create, or explore..."></textarea>
              </div>
              <div className="form-group">
                <label>Your Niche</label>
                <div className="checkbox-group">
                  {["Web3", "AI", "SaaS", "Design", "Marketing", "Creator", "Developer", "Founder"].map((n) => (
                    <span key={n} className={`checkbox-pill ${selectedNiches.includes(n) ? "selected" : ""}`} onClick={() => togglePill(n, "niche")}>{n}</span>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label>Looking For</label>
                <div className="checkbox-group">
                  {["Mutuals", "Engagement", "Collaboration", "Networking", "Followers"].map((l) => (
                    <span key={l} className={`checkbox-pill ${selectedLooking.includes(l) ? "selected" : ""}`} onClick={() => togglePill(l, "looking")}>{l}</span>
                  ))}
                </div>
              </div>
              <div style={{ marginTop: 28, padding: 20, background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: "var(--radius)" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 14 }}>Preview</div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <div className="avatar">{initials}</div>
                  <div>
                    <div className="handle">{inputHandle ? (inputHandle.startsWith("@") ? inputHandle : "@" + inputHandle) : "@yourhandle"}</div>
                    <div className="niche-label">{selectedNiches.length ? selectedNiches.join(", ") : "Your niche"}</div>
                  </div>
                </div>
                {statusBadgeLabel("blue", "New Member")}
              </div>
              <div style={{ marginTop: 28, display: "flex", gap: 12 }}>
                <button className="btn btn-primary" style={{ flex: 1, justifyContent: "center", padding: 12 }} onClick={() => inputHandle && navigate("profile")}>Join GrowthRing</button>
                <button className="btn btn-ghost" onClick={() => navigate("landing")}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
