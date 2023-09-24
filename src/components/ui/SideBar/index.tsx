/* eslint-disable @typescript-eslint/no-unused-vars */
import { cn } from "@/lib/utils";
import { SideBarItem } from "./components/sidebar-item";
import { useAuth } from "@/store";
import { Beef, Utensils, User2, Bike, TreeDeciduous, Image, Cookie, SendHorizonal, Bell, Menu } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { ModeToggle } from "./components/mode-toggle";
import { useNotifications } from "@/hooks/useNotifications";
import { useMediaQuery } from '@mantine/hooks'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Sidebar({ className, children }: SidebarProps) {
  const { logout } = useAuth();
  const navigation = useNavigate();
  const location = useLocation().pathname;
  const checkPathName = (pathStartsWith: string) => {
    if (location.startsWith(pathStartsWith)) return "secondary";
    return "ghost";
  };
  const { data: notifications = {
    results: []
  } } = useNotifications();

  const isSm = useMediaQuery('(max-width: 768px)')

  const unseenNotifications = notifications.results.filter((notification) => !notification.seen);
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 h-screen">
      {isSm ? (
        <Sheet>
          <SheetTrigger dir="rtl" className="absolute top-0 left-0 mt-6 ml-4">
            <Menu className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent dir="rtl" className="w-[400px] sm:w-[540px]">
            <div className={cn("pb-11 bg-background", className)}>
              <div className="space-y-4 py-4 fixed md:w-1/6 top-0 h-screen flex flex-col w-full">
                <div className="flex-1">
                  <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-sm md:text-lg font-semibold hidden sm:block tracking-tight">
                      الرئيسية
                    </h2>
                    <div className="space-y-1">
                      <SideBarItem
                        title="كل المطاعم"
                        variant={checkPathName("/home")}
                        icon={<Beef className="shrink-0" />}
                        onClick={() => navigation("/home")}
                      />
                      <SideBarItem
                        title="الأقسام"
                        icon={<Utensils className="shrink-0" />}
                        variant={checkPathName("/categories")}
                        onClick={() => navigation("/categories")}
                      />
                      <SideBarItem
                        title="المنتجات"
                        icon={<Utensils className="shrink-0" />}
                        variant={checkPathName("/products")}
                        onClick={() => navigation("/products")}
                      />
                      <SideBarItem
                        title="الطلبات"
                        icon={<Cookie className="shrink-0" />}
                        variant={checkPathName("/orders")}
                        onClick={() => navigation("/orders")}
                      />
                      <SideBarItem
                        title="ارسال اشعار"
                        icon={<SendHorizonal className="shrink-0" />}
                        variant={checkPathName("/send-notifications")}
                        onClick={() => navigation("/send-notifications")}
                      />
                    </div>
                  </div>
                  <div className="px-3 mt-4 py-2">
                    <h2 className="mb-2 px-4 text-sm md:text-lg font-semibold tracking-tight">
                      أخري
                    </h2>
                    <div className="space-y-1">
                      <SideBarItem
                        icon={<User2 className="ml-2 h-5 w-5 shrink-0" strokeWidth={1.5} />}
                        title="المشرفين"
                        variant={checkPathName("/admins")}
                        onClick={() => navigation("/admins")}
                      />
                      <SideBarItem
                        icon={
                          <Bike className="ml-2 h-5 w-5 shrink-0" strokeWidth={1.5} />
                        }
                        title="موظفي التوصيل"
                        variant={checkPathName("/deliveries")}
                        onClick={() => navigation("/deliveries")}
                      />
                      <SideBarItem
                        title="الاشعارات"
                        icon={
                          <div className="relative">
                            <Bell className="shrink-0" />
                            {unseenNotifications.length > 0 && (
                              <div className="absolute -top-2 -right-2 bg-red-500 rounded-full h-3 w-3" />
                            )}
                          </div>
                        }
                        variant={checkPathName("/notifications")}
                        onClick={() => navigation("/notifications")}
                      />
                      <SideBarItem
                        icon={
                          <TreeDeciduous className="ml-2 h-5 w-5 shrink-0" strokeWidth={1.5} />
                        }
                        title="مناطق التوصيل"
                        variant={checkPathName("/delivery-areas")}
                        onClick={() => navigation("/delivery-areas")}
                      />
                      <SideBarItem
                        icon={
                          <Image className="ml-2 h-5 w-5 shrink-0" strokeWidth={1.5} />
                        }
                        title="سلايدر الصور"
                        variant={checkPathName("/slider")}
                        onClick={() => navigation("/slider")}
                      />
                    </div>
                  </div>
                </div>
                <div className="py-2 flex flex-col items-end">
                  <div className="w-full flex justify-start gap-2 items-center py-2 px-3">
                    <ModeToggle />
                    <p className="text-xs md:text-sm sm:block font-semibold">
                      وضع الظهور
                    </p>
                  </div>
                </div>
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
                      className="ml-2 h-5 w-5 shrink-0"
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

          </SheetContent>
        </Sheet>) : (<>
          <div className={cn("pb-11 bg-background", className)}>
            <div className="space-y-4 py-4 fixed w-1/6 top-0 h-screen flex flex-col border-l-4">
              <div className="flex-1">
                <div className="px-3 py-2">
                  <h2 className="mb-2 px-4 text-sm md:text-lg font-semibold hidden sm:block tracking-tight">
                    الرئيسية
                  </h2>
                  <div className="space-y-1">
                    <SideBarItem
                      title="كل المطاعم"
                      variant={checkPathName("/home")}
                      icon={<Beef className="shrink-0" />}
                      onClick={() => navigation("/home")}
                    />
                    <SideBarItem
                      title="الأقسام"
                      icon={<Utensils className="shrink-0" />}
                      variant={checkPathName("/categories")}
                      onClick={() => navigation("/categories")}
                    />
                    <SideBarItem
                      title="المنتجات"
                      icon={<Utensils className="shrink-0" />}
                      variant={checkPathName("/products")}
                      onClick={() => navigation("/products")}
                    />
                    <SideBarItem
                      title="الطلبات"
                      icon={<Cookie className="shrink-0" />}
                      variant={checkPathName("/orders")}
                      onClick={() => navigation("/orders")}
                    />
                    <SideBarItem
                      title="ارسال اشعار"
                      icon={<SendHorizonal className="shrink-0" />}
                      variant={checkPathName("/send-notifications")}
                      onClick={() => navigation("/send-notifications")}
                    />
                  </div>
                </div>
                <div className="px-3 mt-4 py-2">
                  <h2 className="mb-2 px-4 text-sm md:text-lg font-semibold tracking-tight">
                    أخري
                  </h2>
                  <div className="space-y-1">
                    <SideBarItem
                      icon={<User2 className="ml-2 h-5 w-5 shrink-0" strokeWidth={1.5} />}
                      title="المشرفين"
                      variant={checkPathName("/admins")}
                      onClick={() => navigation("/admins")}
                    />
                    <SideBarItem
                      icon={
                        <Bike className="ml-2 h-5 w-5 shrink-0" strokeWidth={1.5} />
                      }
                      title="موظفي التوصيل"
                      variant={checkPathName("/deliveries")}
                      onClick={() => navigation("/deliveries")}
                    />
                    <SideBarItem
                      title="الاشعارات"
                      icon={
                        <div className="relative">
                          <Bell className="shrink-0" />
                          {unseenNotifications.length > 0 && (
                            <div className="absolute -top-2 -right-2 bg-red-500 rounded-full h-3 w-3" />
                          )}
                        </div>
                      }
                      variant={checkPathName("/notifications")}
                      onClick={() => navigation("/notifications")}
                    />
                    <SideBarItem
                      icon={
                        <TreeDeciduous className="ml-2 h-5 w-5 shrink-0" strokeWidth={1.5} />
                      }
                      title="مناطق التوصيل"
                      variant={checkPathName("/delivery-areas")}
                      onClick={() => navigation("/delivery-areas")}
                    />
                    <SideBarItem
                      icon={
                        <Image className="ml-2 h-5 w-5 shrink-0" strokeWidth={1.5} />
                      }
                      title="سلايدر الصور"
                      variant={checkPathName("/slider")}
                      onClick={() => navigation("/slider")}
                    />
                  </div>
                </div>
              </div>
              <div className="py-2 flex flex-col items-end">
                <div className="w-full flex justify-start gap-2 items-center py-2 px-3">
                  <ModeToggle />
                  <p className="text-xs md:text-sm hidden sm:block font-semibold">
                    وضع الظهور
                  </p>
                </div>
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
                      className="ml-2 h-5 w-5 shrink-0"
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
        </>)}
      <div className="col-span-4 lg:border-l p-6">{children}</div>
    </div>
  );
}
