"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import AuthNav from "../../AuthNav";

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

export default function ProfilePage() {
  const params = useParams();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const username = params.xUsername as string;
    fetch("/api/profiles/" + username)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setProfile(data.profile);
        } else {
          setNotFound(true);
        }
        setLoading(false);
      })
      .catch(() => {
        setNotFound(true);
        setLoading(false);
      });
  }, [params.xUsername]);

  if (loading) {
    return (
      <div className="min-h-screen" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "var(--text3)" }}>Loading...</p>
      </div>
    );
  }

  if (notFound || !profile) {
    return (
      <div className="min-h-screen">
        <AuthNav />
        <div className="container" style={{ textAlign: "center", paddingTop: 80 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>Profile not found</h1>
          <p style={{ color: "var(--text2)", marginBottom: 24 }}>This user hasn't created a GrowthRing profile yet.</p>
          <a href="/" className="btn btn-outline">Back Home</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <AuthNav />

      <div className="container">
        <div className="profile-hero">
          <div className="profile-top">
            <div className="avatar avatar-lg">{profile.displayName[0].toUpperCase()}</div>
            <div className="profile-meta">
              <h1 className="profile-name">{profile.displayName}</h1>
              <span className="profile-handle">@{profile.xUsername}</span>
              {profile.bio && <p className="profile-bio">{profile.bio}</p>}
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 14, flexWrap: "wrap" }}>
                <span className="status-badge badge-green"><span className="status-dot dot-green" />Active Today</span>
                <span className="niche-tag">{profile.niche}</span>
                {profile.country && <span className="niche-tag">🌍 {profile.country}</span>}
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <a href={"https://x.com/" + profile.xUsername} target="_blank" rel="noopener" className="btn btn-primary btn-sm">Follow on X →</a>
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
              <div style={{ fontSize: 24, fontWeight: 700, color: "var(--mint)", fontFamily: "var(--mono)" }}>{profile.lookingFor.length}</div>
              <div style={{ fontSize: 12, color: "var(--text2)", marginTop: 4 }}>Looking For</div>
            </div>
            <div className="user-card">
              <div style={{ fontSize: 24, fontWeight: 700, fontFamily: "var(--mono)" }}>{profile.niche}</div>
              <div style={{ fontSize: 12, color: "var(--text2)", marginTop: 4 }}>Niche</div>
            </div>
            <div className="user-card">
              <div style={{ fontSize: 24, fontWeight: 700, fontFamily: "var(--mono)" }}>{profile.country || "—"}</div>
              <div style={{ fontSize: 12, color: "var(--text2)", marginTop: 4 }}>Country</div>
            </div>
          </div>
        </div>

        <div className="section-pad" style={{ borderTop: "1px solid var(--border)" }}>
          <div className="section-header">
            <h2 className="section-title">Looking For</h2>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {profile.lookingFor.map((item: string) => (
              <span key={item} className="checkbox-pill selected">✓ {item}</span>
            ))}
            {profile.lookingFor.length === 0 && <p style={{ color: "var(--text3)", fontSize: 14 }}>Not specified</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
