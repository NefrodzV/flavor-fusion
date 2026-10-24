import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "react-router";
import { BookOpen, CircleQuestionMark, ShoppingBag, LogIn } from "lucide-react";
import { Header } from "./components/header";
import type { Route } from "./+types/root";
import "./app.css";
import { Nav } from "./components/nav";
import { useState, useEffect } from "react";
import { MenuToggle } from "./components/layout/menu-toggle";
import { AuthProvider } from "./providers/AuthProvider";
import { CartProvider } from "./providers/CartProvider";

// 1. Centralized navigation configuration
const NAV_ITEMS = [
  { text: "menu", icon: BookOpen, link: "/menu" },
  { text: "about us", icon: CircleQuestionMark, link: "/about-us" },
  { text: "your bag", icon: ShoppingBag, link: "/your-bag" },
  { text: "Log in", icon: LogIn, link: "/login" }
];

export const links: Route.LinksFunction = () => [
  { rel: "icon", href: "/flavor-fusion-logo.svg" },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous"
  }
];

export function Layout({ children }: { children: React.ReactNode }) {
  //   const [isOpen, setIsOpen] = useState(false);
  //
  //   useEffect(() => {
  //     if (typeof window === "undefined") return;
  //     const mediaQuery: MediaQueryList = window.matchMedia("(max-width: 768px)");
  //
  //     const handleMobileChange = (e: MediaQueryListEvent | MediaQueryList) => {
  //       if (e.matches) {
  //         return;
  //       }
  //       setIsOpen(false);
  //     };
  //
  //     mediaQuery.addEventListener("change", handleMobileChange);
  //
  //     return () => {
  //       mediaQuery.removeEventListener("change", handleMobileChange);
  //     };
  //   }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>

      <body>
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
