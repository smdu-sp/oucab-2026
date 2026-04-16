import UserTopbar from "./_components/user-topbar";
import Header from "./_components/header";
import Footer from "./_components/footer";

export default function OucabPublicoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <UserTopbar />
      <Header />
      <main className="container mx-auto py-8 flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
