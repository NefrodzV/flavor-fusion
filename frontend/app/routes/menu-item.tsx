import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import type {
  MenuItemResponse,
  MenuItem,
  MenuImage
} from "~/components/menu/menu.types";
import { env } from "../env";
import { Image } from "~/components/image";
import { MainLayout } from "~/components/layout/main-layout";
import { Button } from "~/components/button";
export default function MenuItemPage() {
  const [menuItem, setMenuItem] = useState<MenuItem | null>(null);
  const params = useParams();

  useEffect(() => {
    async function getMenuItem() {
      const res = await fetch(`${env.apiUrl}/api/menu/${params.slug}`);
      const data: MenuItemResponse = await res.json();
      setMenuItem(data.menuItem);
    }
    getMenuItem();
  }, [params.slug]);

  const formattedImagesBySize = menuItem?.images.reduce<{
    small?: MenuImage;
    large?: MenuImage;
  }>((acc, image) => {
    if (image.width < 700) {
      acc["small"] = image;
    } else {
      acc["large"] = image;
    }
    return acc;
  }, {});
  if (!menuItem) return <>Is Loading</>;

  return (
    <MainLayout>
      <h1 className="pbe-[.5rem] text-xl font-medium">{menuItem.name}</h1>
      <Image
        src={`${env.apiUrl}/api/${formattedImagesBySize?.small?.storage_key}/${formattedImagesBySize?.small?.name}`}
        srcSet={`${env.apiUrl}/api/${formattedImagesBySize?.small?.storage_key}/${formattedImagesBySize?.small?.name} 650w,
              ${env.apiUrl}/api/${formattedImagesBySize?.large?.storage_key}/${formattedImagesBySize?.large?.name} 1920w`}
        sizes="(max-width: 600px) 650px,
               1920px"
        css="rounded-sm aspect-3/2 object-cover"
      />
      <p className="py-[.5rem] text-base pt-small">{menuItem.description}</p>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-lg font-semibold text-gray-900">
          ${(menuItem.price_cents / 100).toFixed(2)}
        </span>
        <Button>Add to Order</Button>
      </div>
    </MainLayout>
  );
}
