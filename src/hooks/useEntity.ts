import { handleRequest } from "@/_lib/api";
import {  useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Entity, EntityProps } from "@/app/types/entity";
import { generateSlug } from "./useCommon";


export function useEntityForm(entitiesData?: Entity, endpoint?: string) : EntityProps {
  const router = useRouter();
  const [name, setName] = useState(entitiesData?.name || "");
  const [slug, setSlug] = useState(entitiesData?.slug || "");
  const [date, setDate] = useState<string>("");
  const [message, setMessage] = useState("");
  const [isSlugEdited] = useState(!!entitiesData?.slug);
	const [author, setAuthor] = useState(entitiesData?.user.email || "");
  useEffect(() => {
    if (!isSlugEdited) setSlug(generateSlug(name));
  }, [name, isSlugEdited]);
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setDate(entitiesData?.date || today);
  }, [entitiesData]);
  const data= { name,  slug, author, date }
  const handleUpdate = async () => {
		if (!entitiesData) return;
		try {
			await handleRequest(`${process.env.NEXTAUTH_URL}/api/${endpoint}/${entitiesData.id}`, "PUT", data );
			setMessage(`${endpoint} added successfully!`);
			router.push(`${process.env.NEXTAUTH_URL}/afa-admin/${endpoint}`);
		} catch { 
			setMessage(`Failed to add ${endpoint}`);
		}
  };
	const handleSubmit = async () => {
		if (!entitiesData) return;
    try {
			await handleRequest(`${process.env.NEXTAUTH_URL}/api/${endpoint}`, "POST", data );
			setMessage(`${endpoint} added successfully!`);
			router.push(`${process.env.NEXTAUTH_URL}/afa-admin/${endpoint}`);
		} catch {
				setMessage(`Failed to add ${endpoint}`);
			}
		};

  return {
		message, handleUpdate, 
    name, setName, author, setAuthor,
    slug, setSlug, date, handleSubmit,
  };
}

export function useEntityTable(endpoint: string) {
	const router = useRouter();
	const [deleteEntityId, setDeleteEntityId] = useState<number | null>(null);
	const [dataSource, setDataSource] = useState("json");
	const [message, setMessage] = useState("");

	const handleDeleteClick = (id: number) => {
		setDeleteEntityId(id);
	};
	const closeDeleteModal = () => {
		setDeleteEntityId(null);
	};
	const confirmDelete = async () => {
		if (!deleteEntityId) return;
		try {
			await handleRequest(`${process.env.NEXTAUTH_URL}/api/${endpoint}/${deleteEntityId}`, "DELETE");
			setMessage("Article deleted successfully!");
			router.refresh();
		} catch {
			setMessage("Failed to delete article");
		} finally {
			closeDeleteModal();
		}
	};

	return {
		message,
		deleteEntityId,
		dataSource,
		setDataSource,
		confirmDelete,
		closeDeleteModal,
		handleDeleteClick,
	};
}
