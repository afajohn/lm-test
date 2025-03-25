import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";

const filePath = path.join(process.cwd(), "src/app/data/categories/latest.json");

// Read JSON file
const getEntities = () => {
  const fileData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(fileData);
};

// Write JSON file
const saveCategories = (data: object) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// GET all categories
export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const id = searchParams.get("id");
	const searchQuery = searchParams.get("search")?.toLowerCase() || "";
	const page = Number.parseInt(searchParams.get("page") || "1", 10);
	const limit = Number.parseInt(searchParams.get("limit") || "10", 10);

	const entities = getEntities(); 
  if (id) {
	  const entity = entities.find((art: { id: number }) => art.id === Number(id));
    if (!entity) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }
    return NextResponse.json({ entity });
  }
	let filteredEntities = entities;
	// GET params by sreach
	if (searchQuery) {
	  filteredEntities = entities.filter(
		(category: { title: string; slug: string}) =>
		  category.title.toLowerCase().includes(searchQuery) ||
		  category.slug.toLowerCase().includes(searchQuery) 
	  );
	}
  const totalCategorys = filteredEntities.length;
	const totalPages = Math.ceil(totalCategorys / limit);
	const paginatedEntities =
	  searchQuery !== "" ? filteredEntities : filteredEntities.slice((page - 1) * limit, page * limit);
  
  return NextResponse.json({ entities: paginatedEntities, totalPages } );
}

// POST (Create a new category)
export async function POST(req: Request) {
  const { name, author, date } = await req.json();
  const categories = getEntities();
  
  const newCategory = {
    id: categories.length + 1,
    name,
    author,
    date,
    slug: name.toLowerCase().replace(/\s+/g, "-"),
  };

  categories.push(newCategory);
  saveCategories(categories);

  return NextResponse.json(newCategory, { status: 201 });
}


