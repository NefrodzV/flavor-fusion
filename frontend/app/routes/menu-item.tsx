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
import { Translate } from "~/components/transitions/translate";
import { getMenuItem } from "~/services/menu-service";
export default function MenuItemPage() {
  const [menuItem, setMenuItem] = useState<MenuItem | null>(null);
  const params = useParams();

  useEffect(() => {
    async function loadMenuItem() {
      try {
        const slug = params.slug;
        if (!slug) return;
        const menuItem = await getMenuItem(slug);
        setMenuItem(menuItem);
      } catch (error) {
        console.error("Error loading menu item:" + error);
      }
    }
    loadMenuItem();
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
    <MainLayout css="flex justify-center">
      <section className="max-w-5xl flex flex-col items-center">
        <Translate start="top" out="left" show={true}>
          <article className="grid grid-cols-1 sm:grid-cols-[320px_1fr] gap-2">
            <h1 className="text-xl sm:text-center font-medium sm:col-span-2">
              {menuItem.name}
            </h1>
            <Image
              src={`${env.apiUrl}/api/${formattedImagesBySize?.small?.storage_key}/${formattedImagesBySize?.small?.name}`}
              srcSet={`${env.apiUrl}/api/${formattedImagesBySize?.small?.storage_key}/${formattedImagesBySize?.small?.name} 650w,
              ${env.apiUrl}/api/${formattedImagesBySize?.large?.storage_key}/${formattedImagesBySize?.large?.name} 1920w`}
              sizes="(max-width: 600px) 650px,
               1920px"
              css="rounded-sm aspect-3/2 object-cover"
            />
            <div className="flex flex-col justify-between">
              <p className="text-base">{menuItem.description}</p>
              <div className="w-full mt-4 flex items-center justify-between">
                <span className="text-lg font-semibold text-gray-900">
                  ${(menuItem.price_cents / 100).toFixed(2)}
                </span>
                <Button>Add to Order</Button>
              </div>
            </div>
          </article>
        </Translate>
      </section>
    </MainLayout>
  );
}
