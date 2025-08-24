"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/matches", label: "Matches" },
  { href: "/teams", label: "Teams" },
  { href: "/leaders", label: "Leaders" },
  { href: "/notables", label: "Notables" },
  { href: "/recaps", label: "Recaps" },
];

export function Navbar() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 backdrop-blur bg-background/70">
      <nav className="mx-auto max-w-6xl px-4 h-12 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">KOTR</Link>
        <ul className="hidden md:flex items-center gap-3">
          {links.map(l => {
            const active = pathname === l.href || (l.href !== "/" && pathname?.startsWith(l.href));
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`px-2 py-1 rounded ${active ? "bg-white/10" : "hover:bg-white/5"}`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}


