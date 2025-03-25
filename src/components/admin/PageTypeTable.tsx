"use client";
import { useRouter } from "next/navigation";
import { Pagination } from "./AfaPagination";
import { Button } from "@/components/ui/button";
import { useEntityTable } from "@/hooks/useEntity";
import { Pencil, Trash2 } from "lucide-react";
import { DialogFooter, DialogHeader } from "../ui/dialog";
import type { Entity, UseEntityTableProps } from "@/app/types/entity";
import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";
import { Suspense } from "react";
import TimePosted from "./shared/timePosted";


export default function PageTypeTable({entitiesData }: UseEntityTableProps) {
  const router = useRouter();
  const { 
    handleDeleteClick, deleteEntityId,
    closeDeleteModal, confirmDelete
    } = useEntityTable("page-types");
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold">Page Type</h2>
        </div>
        <Button onClick={() =>router.push("/afa-admin/page-types/page-type-form?id=new-page-type")} className="bg-green-500">+ Add Page Type</Button>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <TooltipProvider>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entitiesData.entities.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10">
                    <h2 className="text-lg font-semibold">No Categories Available</h2>
                    <p className="text-gray-500">Add a new category to see it here.</p>
                    <Button onClick={()=>'openAddPage'} className="mt-4">Create New Category</Button>
                  </TableCell>
                </TableRow>
              ) : (
                entitiesData.entities.map((pageType: Entity) => (
                  <TableRow key={pageType.id}>
                    <TableCell>{pageType.name}</TableCell>
                    <TableCell>{pageType.slug}</TableCell>
                    <TableCell>{pageType.author}</TableCell>
                    <TableCell><TimePosted dateString={pageType.date}/></TableCell>
                      <TableCell className="flex gap-3">
                        <Tooltip>
                          <TooltipTrigger asChild>
                              <Button 
                                  type="button" 
                                  className="text-gray-500 hover:text-gray-700"  
                                  onClick={() => router.push(`/afa-admin/page-types/page-type-form?id=${pageType.id}`)}><Pencil /></Button>
                          </TooltipTrigger>
                          <TooltipContent>Edit Article</TooltipContent>
                          </Tooltip>
                          {/* <Tooltip>
                              <TooltipTrigger asChild>
                              <Button type="button" className="text-purple-500 hover:text-purple-700" onClick={() => {}}> <RefreshCcw /> </Button>
                              </TooltipTrigger>
                              <TooltipContent>Sync to BigQuery</TooltipContent>
                          </Tooltip> */}
                          <Tooltip>
                              <TooltipTrigger asChild>
                                  <Button type="button" className="text-red-500 hover:text-red-700" 
                                  onClick={(e) => { e.stopPropagation(); handleDeleteClick(pageType.id ?? `${pageType.id}`); }}><Trash2 /> </Button>
                              </TooltipTrigger>
                              <TooltipContent>Delete Article</TooltipContent>
                          </Tooltip>
                      </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TooltipProvider>
      </Suspense>
      <Pagination totalPages={entitiesData?.totalPages ?? 0} />
      {deleteEntityId && (
          <Dialog open={true} onOpenChange={closeDeleteModal}>
            <DialogContent className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
              onInteractOutside={closeDeleteModal} >
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                  <DialogHeader>
                      <DialogTitle className="text-xl font-bold">Confirm Deletion</DialogTitle>
                  </DialogHeader>
                  <p className="text-center text-gray-700">Are you sure you want to delete this article?</p>
                  <DialogFooter className="flex justify-center gap-4 mt-4">
                    <Button variant="outline" onClick={closeDeleteModal}>
                      Cancel
                    </Button>
                    <Button className="bg-red-500 text-white" onClick={confirmDelete}>
                      Confirm Delete
                    </Button>
                  </DialogFooter>
                </div>
            </DialogContent>
          </Dialog>
        )}
    </div>
  );
}
