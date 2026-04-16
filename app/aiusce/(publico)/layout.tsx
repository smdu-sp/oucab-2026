import Header from "./_components/header";
import Footer from "./_components/footer";

export default function AiuscePublicoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="container mx-auto py-4 flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
