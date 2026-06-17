import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";
import { prisma } from "../../../../lib/prisma";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.xUsername) {
    return NextResponse.json({ hasProfile: false, error: "Not authenticated" });
  }

  try {
    const profile = await prisma.profile.findUnique({
      where: { xUsername: session.user.xUsername },
    });

    return NextResponse.json({
      hasProfile: !!profile,
      profile: profile || null,
    });
  } catch {
    return NextResponse.json(
      { hasProfile: false, error: "DB error" },
      { status: 500 }
    );
  }
}
