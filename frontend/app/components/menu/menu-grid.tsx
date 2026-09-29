import React, { useEffect, useState } from "react";
import { env } from "~/env";
import { MenuItem } from "./menu-item";
import type { MenuItem as MenuItemType } from "./menu.types";
import { Translate } from "../transitions/Translate";
import { MenuGridSkeleton } from "./MenuGridSkeleton";
export function MenuGrid() {
  const [menu, setMenu] = useState<Array<MenuItemType>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const getMenuItems = async () => {
      const url = new URL("/api/menu", env.apiUrl);
      const res = await fetch(url.toString(), {
        credentials: "include"
      });

      const data = await res.json();
      setMenu(data.menu);
      setIsLoading(false);
    };
    getMenuItems();
  }, []);

  if (isLoading) return <MenuGridSkeleton />;

  return (
    <section>
      <h1 className="text-xl font-bold md:text-xl lg:text-3xl text-center mb-2">
        Menu
      </h1>
      <div className="relative h-full w-full grid grid-cols-1 grid-rows-none gap-8 md:grid-cols-2">
        {menu.map((menuItem) => (
          <Translate key={menuItem.slug} start="top" out="top" show={true}>
            <MenuItem menuItem={menuItem} />
          </Translate>
        ))}
      </div>
    </section>
  );
}
