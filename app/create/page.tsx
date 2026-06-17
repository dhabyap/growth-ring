"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthNav from "../AuthNav";

const lookingForOptions = ["Mutuals", "Engagement", "Collaboration", "Networking", "Followers"];
const nicheOptions = ["Web3", "AI", "SaaS", "Marketing", "Design", "Creator", "General"];

export default function CreateProfilePage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    xUsername: "",
    displayName: "",
    bio: "",
    niche: "",
    country: "",
    lookingFor: [] as string[],
  });

  // Pre-fill from URL params (from auth callback)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const xU = params.get("xUsername");
    const dN = params.get("displayName");
    if (xU || dN) {
      setForm(prev => ({
        ...prev,
        xUsername: xU || prev.xUsername,
        displayName: dN || prev.displayName,
      }));
    }
  }, []);

  const toggleLookingFor = (item: string) => {
    setForm(prev => ({
      ...prev,
      lookingFor: prev.lookingFor.includes(item)
        ? prev.lookingFor.filter(i => i !== item)
        : [...prev.lookingFor, item],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/profiles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          xUsername: form.xUsername.replace("@", ""),
          displayName: form.displayName,
          bio: form.bio,
          niche: form.niche,
          country: form.country,
          lookingFor: form.lookingFor,
        }),
      });

      const data = await res.json();
      if (data.success) {
        router.push("/profile/" + data.profile.xUsername);
      } else {
        alert("Error: " + data.error);
      }
    } catch (err) {
      alert("Failed to create profile");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <AuthNav />

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

          <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: "12px 0", fontSize: 15 }} disabled={submitting}>
            {submitting ? "Creating..." : "Create Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}
