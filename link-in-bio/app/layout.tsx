import { Metadata } from "next";
import "./globals.css";
import NavLink from "@/components/NavbarLinks";

export const metadata: Metadata = {
  title: "Ian Langeh",
  description: "Full stack developer"
}
export default function RootLayout({ children }: {children: React.ReactNode}) {
  return (
    <html
      lang="en"
    >
      <body className="min-h-full flex flex-col">
        <nav className="flex relative text-center justify-evenly p-4 m-2 mt-5 rounded-3xl backdrop-blur-2xl bg-transparent text-amber-700">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/projects">Projects</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </nav>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
