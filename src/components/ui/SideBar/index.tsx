import { cn } from "@/lib/utils";
import { SideBarItem } from "./components/sidebar-item";
import { useAuth } from "@/store";
import { Beef, Utensils, Martini } from "lucide-react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Sidebar({ className, children }: SidebarProps) {
  const { logout } = useAuth();
  return (
    <div className="grid grid-cols-5 h-full">
      <div className={cn("pb-11 bg-slate-50", className)}>
        <div className="space-y-4 py-4 flex flex-col h-full">
          <div className="flex-1">
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-sm md:text-lg font-semibold tracking-tight">
                الرئيسية
              </h2>
              <div className="space-y-1">
                <SideBarItem
                  title="كل المطاعم"
                  variant="secondary"
                  icon={<Beef className="shrink-0" />}
                />
                <SideBarItem
                  title="المطاعم المفضلة"
                  icon={<Utensils className="shrink-0" />}
                  variant="ghost"
                />
                <SideBarItem
                  title="المشروبات"
                  variant="ghost"
                  icon={<Martini className="shrink-0" />}
                />
              </div>
            </div>
            <div className="px-3 mt-4 py-2">
              <h2 className="mb-2 px-4 text-sm md:text-lg font-semibold tracking-tight">
                أخري
              </h2>
              <div className="space-y-1">
                <SideBarItem
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-2 h-5 w-5"
                    >
                      <path d="M21 15V6" />
                      <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                      <path d="M12 12H3" />
                      <path d="M16 6H3" />
                      <path d="M12 18H3" />
                    </svg>
                  }
                  title="Playlists"
                  variant="ghost"
                />
                <SideBarItem
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-2 h-5 w-5"
                    >
                      <circle cx="8" cy="18" r="4" />
                      <path d="M12 18V2l7 4" />
                    </svg>
                  }
                  title="Songs"
                  variant="ghost"
                />
                <SideBarItem
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-2 h-5 w-5"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  }
                  title="Made for You"
                  variant="ghost"
                />
                <SideBarItem
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-2 h-5 w-5"
                    >
                      <path d="m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98L16 12" />
                      <circle cx="17" cy="7" r="5" />
                    </svg>
                  }
                  title="Artists"
                  variant="ghost"
                />
                <SideBarItem
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-2 h-5 w-5"
                    >
                      <path d="m16 6 4 14" />
                      <path d="M12 6v14" />
                      <path d="M8 8v12" />
                      <path d="M4 4v16" />
                    </svg>
                  }
                  title="Albums"
                  variant="ghost"
                />
              </div>
            </div>
          </div>
          <div className="py-2 flex items-end">
            <SideBarItem
              onClick={logout}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-2 h-5 w-5"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" x2="9" y1="12" y2="12" />
                </svg>
              }
              title="تسجيل الخروج"
              variant="ghost"
            />
          </div>
        </div>
      </div>
      <div className="col-span-4 lg:border-l">{children}</div>
    </div>
  );
}
