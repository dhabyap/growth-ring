"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AuthNav from "./AuthNav";

export default function Home() {
  const [userCount, setUserCount] = useState(4832);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) setUserCount((c) => c + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <AuthNav />

      <div className="hero">
        <div className="hero-eyebrow">
          <span className="live-dot"></span>
          <span>1,247 users active today</span>
        </div>
        <h1>Discover active accounts.<br /><span>Grow together</span> on X.</h1>
        <p className="hero-sub">The discovery network for active X users who want real visibility, real engagement, and real growth — not random follows.</p>
        <div className="hero-actions">
          <Link href="/create" className="btn btn-primary">Create Your Profile</Link>
          <Link href="/feed" className="btn btn-outline">Browse the Feed</Link>
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
        <div className="cta-section">
          <div className="cta-box">
            <h2>Ready to get discovered?</h2>
            <p>Join thousands of active X users already growing on GrowthRing. It&apos;s free to get started.</p>
            <Link href="/create" className="btn btn-primary" style={{ padding: "12px 32px", fontSize: 15 }}>Create Your Profile</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
