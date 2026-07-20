import React from "react";
import { DishGrid } from "~/components/dishes/dish-grid";
export default function Menu() {
  return (
    <main className="px-[10%] py-[5%]">
      <h1 className="text-2xl font-bold">Menu</h1>
      <p> Rendering the menu page</p>
      <DishGrid />
    </main>
  );
}
