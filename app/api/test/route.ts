import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET(req: NextRequest) {
  try {
    // 🔹 หาตำแหน่งไฟล์ db.json (root ของ project)
    const filePath = path.join(process.cwd(), "db.json");
    const jsonData = await fs.readFile(filePath, "utf-8");
    const db = JSON.parse(jsonData);

    // 🔹 อ่าน query params
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    // 🔹 ใช้ accounts จาก db.json
    const search = searchParams.get("search")?.toLowerCase() || "";
    let accounts = db.accounts || [];

    if (search) {
      accounts = accounts.filter(
        (a: any) =>
          a.name.toLowerCase().includes(search) ||
          a.number.toLowerCase().includes(search) ||
          a.bank.toLowerCase().includes(search)
      );
    }

    // 🔹 pagination slice
    const start = (page - 1) * limit;
    const end = start + limit;
    const paged = accounts.slice(start, end);

    return NextResponse.json({
      data: paged,
      pagination: {
        page,
        limit,
        total: accounts.length,
        totalPages: Math.ceil(accounts.length / limit),
      },
    });
  } catch (error) {
    console.error("Error reading db.json:", error);
    return NextResponse.json(
      { error: "Failed to read db.json", details: String(error) },
      { status: 500 }
    );
  }
}
