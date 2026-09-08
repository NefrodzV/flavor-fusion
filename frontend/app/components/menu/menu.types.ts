export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price_cents: number;
  images: MenuImage[];
  slug: string;
}

export interface MenuProps {
  menuItem: MenuItem;
}

export interface MenuImage {
  width: number;
  height: number;
  name: string;
  storage_key: string;
}

export interface MenuItemResponse {
  menuItem: MenuItem;
}
