import React, { useEffect } from "react";
import { env } from "~/env";
export function DishGrid() {
  useEffect(() => {
    const getMenuItems = async () => {
      const url = new URL("/api/menu", env.apiUrl);
      const res = await fetch(url.toString(), {
        credentials: "include"
      });

      console.log(await res.json());
    };
    getMenuItems();
  }, []);
  return <p>Menu Grid</p>;
}
