import React from "react";
import { Image } from "../image";
import { Link } from "react-router";
import type { MenuProps, MenuImage } from "./menu.types";
const apiUrl = import.meta.env.VITE_API_URL;

export function MenuItem({ menuItem }: MenuProps) {
  let formattedImagesBySize: { small?: MenuImage; large?: MenuImage } = {};
  menuItem.images.forEach((image: MenuImage) => {
    if (image.width < 700) {
      formattedImagesBySize["small"] = image;
    } else {
      formattedImagesBySize["large"] = image;
    }
  });

  return (
    <article className="relative">
      <Image
        // css="w-full max-w-[1920px]"
        src={`${apiUrl}/api/${formattedImagesBySize["small"]?.storage_key}/${formattedImagesBySize["small"]?.name}`}
        srcSet={`${apiUrl}/api/${formattedImagesBySize["small"]?.storage_key}/${formattedImagesBySize["small"]?.name} 650w,
        ${apiUrl}/api/${formattedImagesBySize["large"]?.storage_key}/${formattedImagesBySize["large"]?.name} 1920w`}
        sizes="(max-width: 600px) 650px,
         1920px"
        css="rounded-sm aspect-3/2 object-cover"
      />
      <div className="w-full flex justify-between items-center md:text-lg">
        <h2 className="text-base md:text-lg font-bold text-gray-900 leading-tight lg:text-2xl">
          {menuItem.name}
        </h2>
        <span className="text-base md:text-lg font-bold text-gray-800  whitespace-nowrap shrink-0 lg:text-2xl">
          $ {(menuItem.price_cents / 100).toFixed(2)}
        </span>
      </div>
      <Link
        className="absolute bottom-0 top-0 left-0 right-0 pointer"
        to={{
          pathname: `/menu/${menuItem.slug}`
        }}
      />
    </article>
  );
}
