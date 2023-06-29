import "./globals.css";
import { Navbar, Footer } from "@/components";

export const metadata = {
  title: "CarHub",
  description: "Discover world class cars in the world.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={"relative"}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
