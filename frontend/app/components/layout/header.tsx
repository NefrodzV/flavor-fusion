import React, { useMemo } from "react";
import { MainNavigation } from "./main-navigation";
import {
  BookOpen,
  CircleQuestionMark,
  ShoppingBag,
  LogIn,
  User
} from "lucide-react";
import { MobileNavigation } from "./mobile-navigation.tsx";
import { MenuToggle } from "./menu-toggle";
import { Logo } from "./logo";
import { useAuth } from "~/providers/auth-provider";

const NAV_ITEMS = [
  { text: "menu", icon: BookOpen, link: "/menu" },
  { text: "about us", icon: CircleQuestionMark, link: "/about-us" },
  { text: "your bag", icon: ShoppingBag, link: "/your-bag" },
  { text: "Log in", icon: LogIn, link: "/login" }
];

export function Header({
  menuIsActive,
  setMenuIsActive
}: {
  menuIsActive: boolean;
  setMenuIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { isLoggedIn } = useAuth();
  const navItems = useMemo(
    () => [
      { text: "menu", icon: BookOpen, link: "/menu" },
      { text: "about us", icon: CircleQuestionMark, link: "/about-us" },
      { text: "your bag", icon: ShoppingBag, link: "/your-bag" },
      isLoggedIn
        ? { text: "profile", icon: User, link: "/user" }
        : { text: "log in", icon: LogIn, link: "/login" }
    ],
    [isLoggedIn]
  );
  return (
    <div className={`relative w-full flex justify-between items-center z-10`}>
      <header
        className={`relative z-20 p-2 flex justify-between w-full bg-purple-200 ${menuIsActive ? "border-b border-black" : ""}`}
      >
        <Logo />
        <MenuToggle
          css="md:hidden z-50"
          menuIsActive={menuIsActive}
          onClick={setMenuIsActive}
        />
        <MainNavigation items={navItems} />
      </header>
      <MobileNavigation items={navItems} isOpen={menuIsActive} />
    </div>
  );
}
