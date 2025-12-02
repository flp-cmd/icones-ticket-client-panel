import BottomNav from "../BottomNav";
import Navbar from "../Navbar";
import Breadcrumbs from "../Breadcrumbs";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="md:pt-20 pb-20 md:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 md:pt-0">
          <Breadcrumbs />
          {children}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
