import { Category } from "@/models";
import { DeleteCategoryDialog } from "../DeleteCategory";

interface CategoryItemProps {
  category: Category;
}

export const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <div
      key={category.id}
      className="group bg-white rounded-lg shadow-sm p-4 col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3"
    >
      <div className="flex justify-between items-center group">
        <h2 className="text-lg font-bold">القسم: {category.name}</h2>
        <DeleteCategoryDialog category={category} />
      </div>
    </div>
  );
};
