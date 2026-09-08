import React, { useEffect, useState } from "react";
import { env } from "~/env";
import { MenuItem } from "./menu-item";
import type { MenuItem as MenuItemType } from "./menu.types";
export function DishGrid() {
  const [menu, setMenu] = useState<Array<MenuItemType>>([]);
  useEffect(() => {
    const getMenuItems = async () => {
      const url = new URL("/api/menu", env.apiUrl);
      const res = await fetch(url.toString(), {
        credentials: "include"
      });

      const data = await res.json();
      setMenu(data.menu);
    };
    getMenuItems();
  }, []);
  return (
    <div className="grid grid-cols-1 grid-rows-none gap-8 md:grid-cols-2">
      {menu.map((menuItem) => (
        <MenuItem key={menuItem.slug} menuItem={menuItem} />
      ))}
    </div>
  );
}
