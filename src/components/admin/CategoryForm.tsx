"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { Entity, UseEntityFormProps } from "@/app/types/entity";
import { useEntityForm } from "@/hooks/useEntity";


export default function CategoryForm({entitiesData, editId }: UseEntityFormProps) {
  const { 
    name, slug, 
    setName, setSlug, handleSubmit, handleUpdate
  } = useEntityForm(entitiesData as object as Entity, "categories");

  return (
    <form
      className="space-y-4 p-6 bg-white rounded-lg shadow-md" 
      action={async (formData: FormData) => {
        console.log(editId, formData, 'formData')
        if (editId) {
          await handleUpdate(formData);
        } else {
          await handleSubmit(formData);
        }
    }}>
      <h2 className="text-xl font-bold">{editId ? "Edit Category" : "Add Category"}</h2>
      <div className="space-y-2">
        <Label htmlFor="name">Category Name</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="slug">Slug</Label>
        <Input id="slug" value={slug} onChange={(e) => { setSlug(e.target.value); }} required />
      </div>
      <Button type="submit" className="w-full">{editId ? "Update" : "Save"}</Button>
    </form>
  );
}
