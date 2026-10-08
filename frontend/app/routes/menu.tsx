import React from "react";
import { MainLayout } from "~/components/layout/main-layout";
import { MenuGrid } from "~/components/menu/menu-grid";
export default function Menu() {
  return (
    <MainLayout css="h-full">
      <MenuGrid />
    </MainLayout>
  );
}
