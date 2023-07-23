import { Sidebar } from "@/components";

export const HomeScreen = () => {
  return (
    <div className="border-t">
      <div className="h-screen">
        <div className="grid lg:grid-cols-5 h-full">
          <Sidebar className="hidden lg:block" />
          <div className="col-span-3 lg:col-span-4 lg:border-l">
            <h1>Hello</h1>
          </div>
        </div>
      </div>
    </div>
  );
};
