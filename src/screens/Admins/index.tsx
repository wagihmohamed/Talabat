import { AdminsTable, Sidebar } from "@/components";
import { adminColumns } from "@/components/ui/AdminsTable/columns";
import { adminsData } from "@/mockup/adminsData";

export const AdminsScreen = () => {
  return (
    <div className="border-t">
      <div className="h-screen">
        <Sidebar>
          <h1 className="text-2xl font-bold mb-2">المشرفين</h1>
          <p className="mb-5 text-gray-500 text-md">
            يمكنك إضافة مشرفين جدد أو حذف المشرفين الحاليين, يمكنك أيضاً تعديل
            بيانات المشرفين الحاليين.
          </p>
          <AdminsTable data={adminsData} columns={adminColumns} />
        </Sidebar>
      </div>
    </div>
  );
};
