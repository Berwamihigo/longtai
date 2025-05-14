import Sidebar from "./components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex max-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Sidebar />
      <main className="flex-1 p-8 md:p-12 lg:p-16 bg-white/80 shadow-xl rounded-l-3xl min-h-screen overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
