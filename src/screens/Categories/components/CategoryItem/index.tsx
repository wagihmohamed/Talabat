import { Category } from "@/models";
import { DeleteCategoryDialog } from "../DeleteCategory";
import { handleFormateDate } from "@/lib/formatDate";

interface CategoryItemProps {
  category: Category;
}

export const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <div className="max-w-sm col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 rounded overflow-hidden shadow-lg">
      <img className="w-full max-h-96 object-fill" src={category.image} alt="category name" />
      <div className="px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="font-bold text-xl mb-2">{category.name}</div>
          <DeleteCategoryDialog category={category} />
        </div>
        <p className="text-gray-700 text-base mt-2">
          تم إنشاء القسم في: {handleFormateDate(category.createdAt)}
        </p>
      </div>
    </div>
  );
};
