import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const accessToken = req.cookies.get("access_token")?.value;
  const refreshToken = req.cookies.get("refresh_token")?.value;

  if (!accessToken || !refreshToken) {
    return NextResponse.json({ error: "Missing tokens" }, { status: 401 });
  }

  // สร้าง cookie header ให้ backend อ่านได้
  const cookieHeader = `access_token=${accessToken}; refresh_token=${refreshToken}`;

  const response = await fetch("http://localhost:3000/api/auth/users", {
    method: "GET",
    headers: {
      cookie: cookieHeader, // ส่ง cookie ไป backend
    },
  });

  if (!response.ok) {
    return NextResponse.json({ error: "Failed to fetch user info" }, { status: response.status });
  }

  const userInfo = await response.json();
  return NextResponse.json({ user: userInfo });
}
