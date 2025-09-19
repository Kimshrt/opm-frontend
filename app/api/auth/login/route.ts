import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email, password, rememberMe } = await req.json();

    // Forward login request to backend API
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, rememberMe }),
    });

    const data = await response.json();

    if (response.ok) {
      // ✅ สร้าง response object
      const res = NextResponse.json(
        { success: true, session_id: data.session_id },
        { status: 200 }
      );

      // ✅ set cookie ที่นี่เลย
      res.cookies.set('access_token', data.tokens.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: data.expiresIn.access, // วินาที
      });

      res.cookies.set('refresh_token', data.tokens.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: data.expiresIn.refresh, // วินาที
      });

      return res;
    } else {
      return NextResponse.json(
        { error: data.error || 'Invalid credentials' },
        { status: response.status }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
