"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, SessionProvider } from "next-auth/react";

function CallbackInner() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [msg, setMsg] = useState("Checking profile...");

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
      router.push("/api/auth/signin");
      return;
    }

    if (!session?.user?.xUsername) {
      setMsg("Error: No X username found in session");
      return;
    }

    fetch("/api/auth/has-profile?xUsername=" + session.user.xUsername)
      .then(res => res.json())
      .then(data => {
        if (data.hasProfile) {
          router.push("/profile/" + data.profile.xUsername);
        } else {
          const params = new URLSearchParams({
            xUsername: "@" + session.user.xUsername,
            displayName: session.user.xDisplayName || "",
          });
          router.push("/create?" + params.toString());
        }
      })
      .catch(() => {
        setMsg("Error checking profile");
      });
  }, [status, session, router]);

  return (
    <div className="min-h-screen" style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 12 }}>
      <div className="logo-ring" />
      <p style={{ color: "var(--text2)", fontSize: 14 }}>{msg}</p>
    </div>
  );
}

export default function CallbackPage() {
  return (
    <SessionProvider>
      <CallbackInner />
    </SessionProvider>
  );
}
