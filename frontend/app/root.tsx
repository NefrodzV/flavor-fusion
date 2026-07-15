import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "react-router";
import { Home, BookOpen, CircleQuestionMark, UserRound } from "lucide-react";
import { Header } from "./components/header";
import type { Route } from "./+types/root";
import "./app.css";
import { Nav } from "./components/nav";

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
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>

      <body>
        <Header>
          <div className="flex items-center h-[2rem] gap-1">
            <svg
              className="h-full"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
            >
              <path d="M179.5 71.4C193.1 60.1 213.3 61.9 224.6 75.5C235.9 89.1 234.1 109.3 220.5 120.6C164.2 167.5 128 239.2 128 320C128 426 214 512 320 512C426 512 512 426 512 320C512 244.9 451.1 184 376 184C300.9 184 240 244.9 240 320C240 364.2 275.8 400 320 400C364.2 400 400 364.2 400 320C400 306.7 389.3 296 376 296C362.7 296 352 306.7 352 320C352 337.7 337.7 352 320 352C302.3 352 288 337.7 288 320C288 271.4 327.4 232 376 232C424.6 232 464 271.4 464 320C464 399.5 399.5 464 320 464C240.5 464 176 399.5 176 320C176 209.5 265.5 120 376 120C486.5 120 576 209.5 576 320C576 461.4 461.4 576 320 576C178.6 576 64 461.4 64 320C64 219.8 109 130.1 179.5 71.4z" />
            </svg>

            <span className="text-[1.5rem] font-sans">Flavor Fusion</span>
          </div>
          <Nav css="flex gap-2">
            <Nav.Item
              css="flex gap-1 items-center capitalize font-semibold text-lg text-black hover:bg-purple-400 rounded-sm p-1 cursor-pointer"
              text="home"
              icon={Home}
            />
            <Nav.Item
              css="flex gap-1 items-center capitalize font-semibold text-lg text-black hover:bg-purple-400 rounded-sm p-1 cursor-pointer"
              text="menu"
              icon={BookOpen}
            />
            <Nav.Item
              css="flex gap-1 items-center capitalize font-semibold text-lg text-black hover:bg-purple-400 rounded-sm p-1 cursor-pointer"
              text="about us"
              icon={CircleQuestionMark}
            />
          </Nav>
        </Header>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
