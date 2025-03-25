"use client"
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileLayout from "./MobileLayout";


export const sidebarNavlinks = [
    { name: "Dating", href: "/dating" },
    { name: "Success Stories", href: "/success-stories" },
    { name: "Culture", href: "/culture" },
    { name: "Psychology", href: "/psychology" },
    { name: "Travel", href: "/travel" },
    { name: "Realities", href: "/realities" },
];

const LeftSidebar = () => {
    const pathname = usePathname();
    const isBlogPage = pathname.startsWith("/blog")

    if(!isBlogPage) return null;
    
    return (
        <>
        <MobileLayout />
        <section className="custom-scrollbar background-light900_dark200 light-border sticky left-0 top-0 h-screen flex flex-col justify-between border-r pt-6 p-6 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]">
            <h1 className="font-medium whitespace-nowrap text-2xl">Article Categories</h1>
            <ul className="flex flex-1 flex-col gap-6 pt-6">
                {sidebarNavlinks.map(({ name, href }) => {
                    const isActive = pathname === `/blog${href}`;
                    return (
                        <li key={name}>
                            <Link
                                href={`/blog/${href}`}
                                className={`${isActive
                                        ? "bg-[#ededed] font-bold rounded-md"
                                        : "text-gray-600 hover:text-gray-900"
                                    } transition-colors duration-200 inline-block w-full py-2 px-4`}
                            >
                                {name}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </section>
        </>
    );
};
export default LeftSidebar;