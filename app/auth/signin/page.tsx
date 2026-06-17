"use client";

import { signIn } from "next-auth/react";

export default function SignInPage() {
  return (
    <div className="min-h-screen">
      <nav>
        <div className="logo">
          <div className="logo-ring" />
          GrowthRing
        </div>
      </nav>
      <div className="container" style={{ maxWidth: 400, paddingTop: 80 }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Sign in to GrowthRing</h1>
          <p style={{ fontSize: 14, color: "var(--text2)" }}>Connect your X account to get started.</p>
        </div>
        <button
          onClick={() => signIn("twitter")}
          className="btn btn-primary"
          style={{
            width: "100%",
            justifyContent: "center",
            padding: "14px 0",
            fontSize: 15,
          }}
        >
          Sign in with X
        </button>
      </div>
    </div>
  );
}
