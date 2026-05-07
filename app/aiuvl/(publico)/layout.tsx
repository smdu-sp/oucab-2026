import HeaderAiuvl from "./_components/header";
import FooterAiuvl from "./_components/footer";

export default function AiuvlPublicoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <HeaderAiuvl />
      <main className="container mx-auto py-4 flex-1">
        {children}
      </main>
      <FooterAiuvl />
    </div>
  );
}
