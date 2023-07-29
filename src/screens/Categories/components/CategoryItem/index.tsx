import { Category } from "@/models";
import { Trash2 } from "lucide-react";

interface CategoryItemProps {
  category: Category;
  onDelete: () => void;
}

export const CategoryItem = ({ category, onDelete }: CategoryItemProps) => {
  return (
    <div
      key={category.id}
      className="group bg-white rounded-lg shadow-sm p-4 col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3"
    >
      <div className="flex justify-between items-center group">
        <h2 className="text-lg font-bold">القسم: {category.name}</h2>
        <Trash2 onClick={onDelete} className="text-red-500 cursor-pointer" />
      </div>
    </div>
  );
};
