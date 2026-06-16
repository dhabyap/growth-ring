"use client";

import { useState } from "react";
import Link from "next/link";

const lookingForOptions = ["Mutuals", "Engagement", "Collaboration", "Networking", "Followers"];
const nicheOptions = ["Web3", "AI", "SaaS", "Marketing", "Design", "Creator", "General"];

export default function CreateProfilePage() {
  const [form, setForm] = useState({
    xUsername: "",
    displayName: "",
    bio: "",
    niche: "",
    country: "",
    lookingFor: [] as string[],
  });

  const toggleLookingFor = (item: string) => {
    setForm(prev => ({
      ...prev,
      lookingFor: prev.lookingFor.includes(item)
        ? prev.lookingFor.filter(i => i !== item)
        : [...prev.lookingFor, item],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Profile created! (Demo — database integration coming next)");
  };

  return (
    <div className="min-h-screen">
      <nav>
        <Link href="/" className="logo">
          <div className="logo-ring" />
          GrowthRing
        </Link>
        <div className="nav-actions">
          <Link href="/feed" className="btn btn-ghost btn-sm">Feed</Link>
        </div>
      </nav>

      <div className="container" style={{ maxWidth: 600, paddingTop: 40, paddingBottom: 80 }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.8, marginBottom: 4 }}>Create Your Profile</h1>
        <p style={{ fontSize: 14, color: "var(--text2)", marginBottom: 32 }}>Get discovered by active X users.</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>X Username</label>
            <input
              type="text"
              placeholder="@yourhandle"
              value={form.xUsername}
              onChange={e => setForm({ ...form, xUsername: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Display Name</label>
            <input
              type="text"
              placeholder="Your name"
              value={form.displayName}
              onChange={e => setForm({ ...form, displayName: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Bio</label>
            <textarea
              placeholder="What do you do? What are you building?"
              rows={3}
              value={form.bio}
              onChange={e => setForm({ ...form, bio: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Niche</label>
            <select value={form.niche} onChange={e => setForm({ ...form, niche: e.target.value })} required>
              <option value="">Select your niche</option>
              {nicheOptions.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>Country</label>
            <input
              type="text"
              placeholder="e.g. Indonesia"
              value={form.country}
              onChange={e => setForm({ ...form, country: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Looking For</label>
            <div className="checkbox-group">
              {lookingForOptions.map(opt => (
                <span
                  key={opt}
                  className={`checkbox-pill ${form.lookingFor.includes(opt) ? "selected" : ""}`}
                  onClick={() => toggleLookingFor(opt)}
                >
                  {form.lookingFor.includes(opt) ? "✓ " : ""}{opt}
                </span>
              ))}
            </div>
          </div>

          {/* Live Preview */}
          {(form.displayName || form.xUsername) && (
            <div style={{ marginTop: 32, marginBottom: 32 }}>
              <label style={{ marginBottom: 12 }}>Live Preview</label>
              <div className="user-card">
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <div className="avatar">{(form.displayName || "?")[0].toUpperCase()}</div>
                  <div>
                    <div style={{ fontWeight: 700 }}>{form.displayName || "Your Name"}</div>
                    <div className="handle">{form.xUsername || "@yourhandle"}</div>
                  </div>
                  <span className="status-badge badge-blue" style={{ marginLeft: "auto" }}>
                    <span className="status-dot dot-blue" />New Member
                  </span>
                </div>
                {form.bio && <p style={{ fontSize: 13, color: "var(--text2)", marginBottom: 10 }}>{form.bio}</p>}
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {form.niche && <span className="niche-tag">{form.niche}</span>}
                  {form.country && <span className="niche-tag">🌍 {form.country}</span>}
                  {form.lookingFor.map(l => <span key={l} className="checkbox-pill selected" style={{ padding: "3px 8px", fontSize: 11 }}>✓ {l}</span>)}
                </div>
              </div>
            </div>
          )}

          <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: "12px 0", fontSize: 15 }}>
            Create Profile
          </button>
        </form>
      </div>
    </div>
  );
}
