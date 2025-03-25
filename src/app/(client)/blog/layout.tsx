import LeftSidebar from "@/components/client/shared/LeftSidebar";

export default async function BlogLayout({children}: {children:React.ReactNode}) {
    return (
        <>
        <div className="flex flex-row ">
        <LeftSidebar/>
        {children}
        </div>
        </>
    )
}