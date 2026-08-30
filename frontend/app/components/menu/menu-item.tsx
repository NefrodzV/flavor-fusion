import React from "react";
import { Image } from "../image";
const apiUrl = import.meta.env.VITE_API_URL;
interface DishItem {
  id: number;
  name: string;
  description: string;
  price_cents: number;
  images: DishImage[];
}

interface DishProps {
  dishItem: DishItem;
}

interface DishImage {
  width: number;
  height: number;
  name: string;
  storage_key: string;
}

export function DishItem({ dishItem }: DishProps) {
  let formattedImagesBySize: { small?: DishImage; large?: DishImage } = {};
  dishItem.images.forEach((image: DishImage) => {
    if (image.width < 700) {
      formattedImagesBySize["small"] = image;
    } else {
      formattedImagesBySize["large"] = image;
    }
  });

  return (
    <article>
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
          {dishItem.name}
        </h2>
        <span className="textsbase md:text-lg font-bold text-gray-800  whitespace-nowrap shrink-0 lg:text-2xl">
          $ {(dishItem.price_cents / 100).toFixed(2)}
        </span>
      </div>
    </article>
  );
}
