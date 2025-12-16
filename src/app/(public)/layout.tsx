// src/app/(public)/layout.tsx

// Note: Using @/app/components/public/ or ../components/public/ based on your alias setup
import Navbar from "../components/public/Navbar"; 
import Footer from "../components/public/Footer";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
}