import fs from "node:fs";
import  path from "node:path";
import { NextResponse } from "next/server";
import type { Category } from "@/app/types/category";

const filePath = path.join(process.cwd(), "src/app/data/categories/latest.json");

// Read JSON file
const getCategories = (): Category[] => {
  const fileData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(fileData) as Category[];
};

// Write JSON file
const saveCategories = (data: Category[]) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// GET a specific category
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const ct = await params;
  const categories = getCategories();
  const category = categories.find((c) => c.id === Number(ct.id));

  if (!category) return NextResponse.json({ message: "Not Found" }, { status: 404 });

  return NextResponse.json(category);
}

// PUT (Update a category)
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const updatedData: Partial<Category> = await req.json();
    const categories = getCategories();

    const index = categories.findIndex((c) => c.id === Number(id));
    if (index === -1) {
      return NextResponse.json({ message: "Category not found" }, { status: 404 });
    }

    // Ensure required fields exist
    if (!updatedData.name || !updatedData.author) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    categories[index] = {
      ...categories[index],
      ...updatedData,
      slug: updatedData.name.toLowerCase().replace(/\s+/g, "-"),
    };

    saveCategories(categories);

    return NextResponse.json(categories[index]);
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json({ error: "Failed to update Category" }, { status: 500 });
  }
}

// DELETE a category
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params; 
    let categories = getCategories();

    const index = categories.findIndex((c) => c.id === Number(id));
    if (index === -1) {
      return NextResponse.json({ message: "Category not found" }, { status: 404 });
    }

    categories = categories.filter((c) => c.id !== Number(id));
    saveCategories(categories);

    return NextResponse.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ error: "Failed to delete Category" }, { status: 500 });
  }
}
