"use client";

import { extractImageSrc, fetchBlogs } from "@/_lib/blogUtils";
import type { Blog } from "@/app/types/article";
import Image from "next/image";
import { useEffect, useState } from "react";

interface BlogData {
  category_name: string;
  image: string;
}

const MobileLayout = () => {
  const [isBlogPage, setIsBlogPage] = useState(false);
  const [latestBlogData, setLatestBlogData] = useState<BlogData[]>([]);

  useEffect(() => {
    setIsBlogPage(window.location.pathname === "/blog");
  }, []);

  useEffect(() => {
    fetchBlogs("all", 1).then(({ articles }) => {
      const uniqueCategories: string[] = articles
        .filter((blog: Blog) => blog.category_name) // Remove undefined/null categories
        .map((blog: Blog) => blog.category_name.trim()) // Now it's safe to trim
        .filter(
          (value: string, index: number, self: string[]) =>
            value !== "" && self.indexOf(value) === index
        );

      console.log(uniqueCategories);

      const latestBlogData: BlogData[] = uniqueCategories.map((category) => {
        const latestBlog: Blog | undefined = articles
          .filter((blog: Blog) => blog.category_name === category)
          .sort(
            (a: Blog, b: Blog) =>
              new Date(b.created_at.value).getTime() -
              new Date(a.created_at.value).getTime()
          )[0];

        return {
          category_name: category,
          image:
            extractImageSrc(latestBlog?.content_body ?? "") ||
            "/default-image.jpg",
        };
      });
      setLatestBlogData(latestBlogData);
    });
  }, []);

  if (!isBlogPage) return null;

  return (
    <div className="grid grid-cols-1 sm:hidden p-4">
      {latestBlogData.map(({ category_name, image }) => (
        <a key={category_name} href={`/blog/${category_name}`}>
          <div>
            <Image
              width={630}
              height={0}
              src={image}
              alt={category_name}
              className="pb-2"
            />
          </div>
          {category_name}
        </a>
      ))}
    </div>
  );
};

export default MobileLayout;
