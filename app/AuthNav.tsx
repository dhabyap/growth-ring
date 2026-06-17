"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function AuthNav() {
  const { data: session, status } = useSession();
  const isAuth = status === "authenticated";

  return (
    <nav>
      <div className="container">
        <Link href="/" className="logo">
          <div className="logo-ring" />
          GrowthRing
        </Link>
        <div className="nav-actions">
          <Link href="/feed" className="btn btn-ghost btn-sm">Feed</Link>
          {isAuth ? (
            <>
              <span style={{ fontSize: 13, color: "var(--text2)", marginRight: 4 }}>
                {session?.user?.xUsername ? "@" + session.user.xUsername : ""}
              </span>
              <button
                onClick={() => signOut()}
                className="btn btn-ghost btn-sm"
                style={{ fontSize: 13 }}
              >
                Sign Out
              </button>
            </>
          ) : (
            <button
              onClick={() => signIn("twitter")}
              className="btn btn-primary btn-sm"
            >
              Sign in with X
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
