import React from "react";
import { DishGrid } from "~/components/menu/menu-grid";
export default function Menu() {
  return (
    <main className="px-[10%] py-[5%]">
      <h1 className="text-xl font-bold md:text-xl lg:text-3xl text-center mb-2">
        Menu
      </h1>
      <DishGrid />
    </main>
  );
}
