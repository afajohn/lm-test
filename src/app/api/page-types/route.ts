import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";

const filePath = path.join(process.cwd(), "src/app/data/page-types/latest.json");

const getEntities = () => {
  const fileData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(fileData);
};

// Write JSON file
const savePageTypes = (data: object) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// GET all page types
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
    (pageType: { title: string; slug: string}) =>
      pageType.title.toLowerCase().includes(searchQuery) ||
      pageType.slug.toLowerCase().includes(searchQuery) 
    );
  }
  const totalPageTypes = filteredEntities.length;
  const totalPages = Math.ceil(totalPageTypes / limit);
  const paginatedEntities =
    searchQuery !== "" ? filteredEntities : filteredEntities.slice((page - 1) * limit, page * limit);
  
  return NextResponse.json({ entities: paginatedEntities, totalPages } );
}


// POST (Create a new page type)
export async function POST(req: Request) {
  const { name, author, date , slug} = await req.json();
  const pageTypes = getEntities();
  
  const newPageType = {
    id: pageTypes.length + 1,
    name,
    author,
    date,
    slug,
  };

  pageTypes.push(newPageType);
  savePageTypes(pageTypes);

  return NextResponse.json(newPageType, { status: 201 });
}
