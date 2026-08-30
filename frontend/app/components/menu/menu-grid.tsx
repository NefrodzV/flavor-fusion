import React, { useEffect, useState } from "react";
import { env } from "~/env";
import { DishItem } from "./menu-item";
export function DishGrid() {
  const [dishes, setDishes] = useState([]);
  useEffect(() => {
    const getMenuItems = async () => {
      const url = new URL("/api/menu", env.apiUrl);
      const res = await fetch(url.toString(), {
        credentials: "include"
      });

      const data = await res.json();
      setDishes(data.menu);
    };
    getMenuItems();
  }, []);
  return (
    <div className="grid grid-cols-1 grid-rows-none gap-8 md:grid-cols-2">
      {dishes.map((dish) => (
        <DishItem dishItem={dish} />
      ))}
    </div>
  );
}
