import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const profile = await prisma.profile.create({
      data: {
        xUsername: body.xUsername,
        displayName: body.displayName,
        bio: body.bio || null,
        avatarUrl: body.avatarUrl || null,
        niche: body.niche,
        country: body.country,
        lookingFor: body.lookingFor || [],
      },
    });

    return NextResponse.json({ success: true, profile }, { status: 201 });
  } catch (error) {
    console.error("Error creating profile:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create profile" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const profiles = await prisma.profile.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, profiles });
  } catch (error) {
    console.error("Error fetching profiles:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch profiles" },
      { status: 500 }
    );
  }
}
