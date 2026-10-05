import type { MenuItem, MenuItemResponse } from "~/components/menu/menu.types";
import { env } from "../env";
export async function getMenuItems(): Promise<MenuItem[]> {
  const url = new URL("/api/menu", env.apiUrl);
  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include"
  });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch menu items: ${res.status} ${res.statusText}`
    );
  }

  const data: MenuItemResponse = await res.json();

  return data.menu;
}
