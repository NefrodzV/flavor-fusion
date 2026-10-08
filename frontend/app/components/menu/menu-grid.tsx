import React, { useEffect, useState } from "react";
import { env } from "~/env";
import { MenuItem } from "./menu-item";
import type { MenuItem as MenuItemType } from "./menu.types";
import { Translate } from "../transitions/translate";
import { MenuGridSkeleton } from "./menu-grid-skeleton";
import { getMenuItems } from "~/services/menu-service";

export function MenuGrid() {
  const [menu, setMenu] = useState<Array<MenuItemType>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    async function loadMenu() {
      try {
        setIsLoading(true);
        const data = await getMenuItems();
        console.log(data);
        setMenu(data);
      } catch (error) {
        console.log("Error loading menu:" + error);
      } finally {
        setIsLoading(false);
      }
    }

    loadMenu();
  }, []);

  if (isLoading) return <MenuGridSkeleton />;

  return (
    <section className="flex flex-col items-center">
      <h1 className=" text-xl font-bold md:text-xl lg:text-3xl text-center mb-2">
        Menu
      </h1>
      <div className="max-w-5xl relative h-full w-full grid grid-cols-1 grid-rows-none gap-8 md:grid-cols-2">
        {menu.map((menuItem) => (
          <Translate key={menuItem.slug} start="top" out="top" show={true}>
            <MenuItem menuItem={menuItem} />
          </Translate>
        ))}
      </div>
    </section>
  );
}
