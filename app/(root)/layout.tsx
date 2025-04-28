import { ReactNode } from "react";
import Sidebar from "@/components/ui/Sidebar";
// import { auth } from "@/auth";

const RootLayout = async ({ children }: { children: ReactNode }) => {
  // const session = await auth();

  return (
    <div className="h-full">
      <Sidebar />

      <main className="lg:pl-72 h-full">
        <div className="xl:pr-96 h-full">
          <div className="px-4 sm:px-6 lg:px-8 lg:py-0 h-full">{children}</div>
        </div>
      </main>

      <aside className="fixed inset-y-0 right-0 hidden w-96 overflow-y-auto border-l border-gray-200 px-4 py-6 sm:px-6 lg:px-8 xl:block">
        {/* Secondary column (hidden on smaller screens) */}
        <div className="text-lg">Second sidebar</div>
      </aside>
    </div>
  );
};

export default RootLayout;
