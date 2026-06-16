"use client";

import Link from "next/link";

export default function ProfilePage() {
  return (
    <div className="min-h-screen">
      <nav>
        <Link href="/" className="logo">
          <div className="logo-ring" />
          GrowthRing
        </Link>
        <div className="nav-actions">
          <Link href="/feed" className="btn btn-ghost btn-sm">Feed</Link>
          <Link href="/create" className="btn btn-primary btn-sm">Create Profile</Link>
        </div>
      </nav>

      <div className="container">
        <div className="profile-hero">
          <div className="profile-top">
            <div className="avatar avatar-lg">S</div>
            <div className="profile-meta">
              <h1 className="profile-name">Sarah Builds</h1>
              <span className="profile-handle">@sarahbuilds</span>
              <p className="profile-bio">Building in public. Web3 explorer & community builder. Always looking for active accounts to grow with.</p>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 14 }}>
                <span className="status-badge badge-green"><span className="status-dot dot-green" />Active Today</span>
                <span className="niche-tag">Web3</span>
                <span className="niche-tag">🇮🇩 Indonesia</span>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <a href="https://x.com/sarahbuilds" target="_blank" rel="noopener" className="btn btn-primary btn-sm">Follow on X →</a>
                <button className="btn btn-outline btn-sm">Share Profile</button>
              </div>
            </div>
          </div>
        </div>

        <div className="section-pad">
          <div className="section-header">
            <h2 className="section-title">Stats</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12 }}>
            <div className="user-card">
              <div style={{ fontSize: 24, fontWeight: 700, color: "var(--mint)", fontFamily: "var(--mono)" }}>842</div>
              <div style={{ fontSize: 12, color: "var(--text2)", marginTop: 4 }}>Followers</div>
            </div>
            <div className="user-card">
              <div style={{ fontSize: 24, fontWeight: 700, color: "var(--text)", fontFamily: "var(--mono)" }}>2,100</div>
              <div style={{ fontSize: 12, color: "var(--text2)", marginTop: 4 }}>Profile Views</div>
            </div>
            <div className="user-card">
              <div style={{ fontSize: 24, fontWeight: 700, color: "var(--text)", fontFamily: "var(--mono)" }}>#14</div>
              <div style={{ fontSize: 12, color: "var(--text2)", marginTop: 4 }}>Today&apos;s Rank</div>
            </div>
            <div className="user-card">
              <div style={{ fontSize: 24, fontWeight: 700, color: "var(--text)", fontFamily: "var(--mono)" }}>38</div>
              <div style={{ fontSize: 12, color: "var(--text2)", marginTop: 4 }}>X Clicks Out</div>
            </div>
          </div>
        </div>

        <div className="section-pad" style={{ borderTop: "1px solid var(--border)" }}>
          <div className="section-header">
            <h2 className="section-title">Looking For</h2>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <span className="checkbox-pill selected">✓ Mutuals</span>
            <span className="checkbox-pill selected">✓ Engagement</span>
            <span className="checkbox-pill selected">✓ Collaboration</span>
            <span className="checkbox-pill">Networking</span>
            <span className="checkbox-pill">Followers</span>
          </div>
        </div>

        <div className="section-pad" style={{ borderTop: "1px solid var(--border)" }}>
          <div className="section-header">
            <h2 className="section-title">Share Card</h2>
          </div>
          <div className="user-card" style={{ maxWidth: 400 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div className="avatar">S</div>
              <div>
                <div style={{ fontWeight: 700 }}>Sarah Builds</div>
                <div className="handle">@sarahbuilds</div>
              </div>
            </div>
            <div style={{ fontSize: 14, color: "var(--mint)", fontFamily: "var(--mono)", marginBottom: 8 }}>
              Ranked #14 on GrowthRing today 🚀
            </div>
            <div style={{ fontSize: 12, color: "var(--text3)" }}>growthring.app/sarahbuilds</div>
          </div>
          <button className="btn btn-outline btn-sm" style={{ marginTop: 12 }}>Copy Share Text</button>
        </div>
      </div>
    </div>
  );
}
