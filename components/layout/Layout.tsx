import BottomNav from "../BottomNav";
import TopNav from "../TopNav";
import Breadcrumbs from "../Breadcrumbs";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav />
      <main className="md:pt-20 pb-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 md:pt-0">
          <Breadcrumbs />
          {children}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
