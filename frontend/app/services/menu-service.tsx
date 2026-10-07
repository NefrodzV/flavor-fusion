import type {
  MenuItem,
  MenuItemsResponse,
  MenuItemResponse
} from "~/components/menu/menu.types";
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

  const data: MenuItemsResponse = await res.json();

  return data.menu;
}

export async function getMenuItem(slug: string): Promise<MenuItem> {
  const res = await fetch(`${env.apiUrl}/api/menu/${slug}`, {
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
  return data.menuItem;
}
