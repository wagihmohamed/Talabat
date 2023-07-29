import { LoadingErrorPlaceholder, Sidebar } from "@/components";
import { useCategories } from "@/hooks";
import { CategoryItem } from "./components/CategoryItem";

export const CategoriesScreen = () => {
  const { data: categories = [], isLoading, isError } = useCategories();
  return (
    <div className="border-t">
      <div className="h-screen">
        <Sidebar>
          <h1 className="text-2xl font-bold mb-2">الأقسام</h1>
          <p className="mb-5 text-gray-500 text-md">
            يمكنك إضافة أقسام جديدة وتعديل الأقسام الموجودة وحذفها من هنا. يمكنك
            أيضًا إضافة منتجات لكل قسم.
          </p>
          <LoadingErrorPlaceholder
            isEmpty={categories.length === 0}
            emptyText={
              <h1 className="text-2xl font-bold text-center">لا يوجد أقسام</h1>
            }
            isError={isError}
            isLoading={isLoading}
          >
            <div className="grid grid-cols-12 gap-4">
              {categories.map((category) => (
                <CategoryItem
                  onDelete={() => {}}
                  category={category}
                  key={category.id}
                />
              ))}
            </div>
          </LoadingErrorPlaceholder>
        </Sidebar>
      </div>
    </div>
  );
};
