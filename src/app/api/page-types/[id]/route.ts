
import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import type { PageType } from "@/app/types/page-type";

const filePath = path.join(process.cwd(), "src/app/data/page-types/latest.json");

// Read JSON file
const getPageTypes = (): PageType[] => {
  const fileData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(fileData) as PageType[];
};

// Write JSON file
const savePageTypes = (data: PageType[]) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// GET a specific page type
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const {id} = await params; 
  const pageTypes = getPageTypes();
  const pageType =  pageTypes.find((p) => p.id === Number(id));

  if (!pageType) return NextResponse.json({ message: "Not Found" }, { status: 404 });

  return NextResponse.json(pageType);
}

// PUT (Update a page type)
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    if (!req.body) {
      return new Response(JSON.stringify({ error: "Request body is missing" }), { status: 400 });
    }
  
    const updatedData: Partial<PageType> = await req.json();
    const pageTypes = getPageTypes();

    const index = pageTypes.findIndex((p) => p.id === Number(id));
    if (index === -1) {
      return NextResponse.json({ message: "Page Type not found" }, { status: 404 });
    }

    // Ensure required fields exist
    if (!updatedData.name || !updatedData.author ) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    pageTypes[index] = {
      ...pageTypes[index],
      ...updatedData,
      // slug: updatedData.name.toLowerCase().replace(/\s+/g, "-"),
    };

    savePageTypes(pageTypes);

    return NextResponse.json(pageTypes[index]);
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json({ error: "Failed to update Page Type" }, { status: 500 });
  }
}

// DELETE a page type
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params; 
    let pageTypes = getPageTypes();

    const index = pageTypes.findIndex((p) => p.id === Number(id));
    if (index === -1) {
      return NextResponse.json({ message: "Page Type not found" }, { status: 404 });
    }

    pageTypes = pageTypes.filter((p) => p.id !== Number(id));
    savePageTypes(pageTypes);

    return NextResponse.json({ message: "Page type deleted successfully" });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ error: "Failed to delete Page Type" }, { status: 500 });
  }
}