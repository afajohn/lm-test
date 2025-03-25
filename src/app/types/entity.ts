export interface Entity {
  id: number;
  name: string;
  author: string;
  date: string;
  slug: string;
  user: {
    email: string
    name: string
  };
}
export interface UseEntityFormProps {
  editId: number, 
  entitiesData: {
    entities: Entity[];
    totalPages: number;
  }
}
export interface UseEntityTableProps {
  entitiesData: {
    entities: Entity[];
    totalPages: number;
  }
}  
export interface EntityProps {
  name: string;
  author: string;
  date: string;
  slug: string;
  message:string;
  // session: Session | null;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setAuthor: React.Dispatch<React.SetStateAction<string>>;
  setSlug: React.Dispatch<React.SetStateAction<string>>;
  // handleSlugChange: (e:React.ChangeEvent<HTMLInputElement>) => void;
  handleUpdate: (formData: FormData) => void;
  handleSubmit: (formData: FormData) => Promise<void>;
}
