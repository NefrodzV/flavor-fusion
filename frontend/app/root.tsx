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
import { MenuToggle } from "./components/menu-toggle";

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
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery: MediaQueryList = window.matchMedia("(max-width: 768px)");

    const handleMobileChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        return;
      }
      setMenuIsOpen(false);
    };

    mediaQuery.addEventListener("change", handleMobileChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMobileChange);
    };
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>

      <body className="relative min-h-screen">
        <div className="relative bg-purple-200 w-full min-h-[50px] flex justify-between">
          <Header
            css={`flex justify-between w-full z-20 ${menuIsOpen ? "border-b border-black" : ""}`}
          >
            {/* Logo */}
            <div className="flex items-center h-[2rem] gap-1 w-full">
              <svg
                className="h-full animate-[spin_4s_linear_infinite_reverse]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
              >
                <path d="M179.5 71.4C193.1 60.1 213.3 61.9 224.6 75.5C235.9 89.1 234.1 109.3 220.5 120.6C164.2 167.5 128 239.2 128 320C128 426 214 512 320 512C426 512 512 426 512 320C512 244.9 451.1 184 376 184C300.9 184 240 244.9 240 320C240 364.2 275.8 400 320 400C364.2 400 400 364.2 400 320C400 306.7 389.3 296 376 296C362.7 296 352 306.7 352 320C352 337.7 337.7 352 320 352C302.3 352 288 337.7 288 320C288 271.4 327.4 232 376 232C424.6 232 464 271.4 464 320C464 399.5 399.5 464 320 464C240.5 464 176 399.5 176 320C176 209.5 265.5 120 376 120C486.5 120 576 209.5 576 320C576 461.4 461.4 576 320 576C178.6 576 64 461.4 64 320C64 219.8 109 130.1 179.5 71.4z" />
              </svg>
              <span className="text-[1.5rem] font-sans">Flavor Fusion</span>
            </div>

            {/* Mobile Menu Toggle */}
            <MenuToggle
              css="md:hidden z-20"
              isOpen={menuIsOpen}
              onClick={setMenuIsOpen}
            />

            {/* Desktop Navigation */}
            <Nav css="hidden md:flex gap-1">
              {NAV_ITEMS.map((item) => (
                <Nav.Item
                  key={item.link}
                  css="flex gap-1 items-center capitalize font-semibold text-lg text-black hover:bg-purple-400 rounded-sm p-1 cursor-pointer"
                  text={item.text}
                  icon={item.icon}
                  link={item.link}
                />
              ))}
            </Nav>
          </Header>

          {/* Mobile Navigation Dropdown */}
          <Nav
            css={`
              ${menuIsOpen
                ? "translate-y-0 opacity-100 pointer-events-auto"
                : "translate-y-[-100%] opacity-0 pointer-events-none"} z-10 md:hidden transition-all duration-300 p-[5%] absolute grid grid-cols-2 sm:grid-cols-3 top-[100%] left-0 right-0 bg-purple-200 gap-2
            `}
          >
            {NAV_ITEMS.map((item) => (
              <Nav.Item
                key={item.link}
                css="flex flex-col justify-center items-center min-h-[100px] capitalize font-semibold text-lg text-black hover:bg-purple-400 rounded-sm p-2 cursor-pointer border-black border"
                text={item.text}
                icon={item.icon}
                link={item.link}
              />
            ))}
          </Nav>
        </div>
        {children}
        {menuIsOpen && (
          <div
            onClick={() => setMenuIsOpen(false)}
            className="fixed inset-0 bg-black/50 z-5 md:hidden"
          />
        )}

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
