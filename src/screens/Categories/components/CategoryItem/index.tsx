import { Category } from "@/models";
import { DeleteCategoryDialog } from "../DeleteCategory";
import { EditCategory } from "../EditCategory";

interface CategoryItemProps {
  category: Category;
}

export const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <div className="max-w-sm col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 rounded-lg overflow-hidden shadow-lg">
      <img className="w-full h-40 object-contain" src={category.image?.toString()} alt="category name" />
      <div className="px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="font-bold text-xl mb-2">{category.name}</div>
          <div className="flex items-center gap-3">
            <DeleteCategoryDialog category={category} />
            <EditCategory category={category} />
          </div>
        </div>
        <p className="text-base mt-2">
          الترتيب: {category.order}
        </p>
      </div>
    </div>
  );
};
