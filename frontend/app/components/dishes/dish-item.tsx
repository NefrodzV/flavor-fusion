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
        src={`${apiUrl}/${formattedImagesBySize["small"]?.storage_key}/${formattedImagesBySize["small"]?.name}`}
        srcSet={`${apiUrl}/${formattedImagesBySize["small"]?.storage_key}/${formattedImagesBySize["small"]?.name} 650w,
        ${apiUrl}/${formattedImagesBySize["large"]?.storage_key}/${formattedImagesBySize["large"]?.name} 1920w`}
        sizes="(max-width: 600px) 650px,
         1920px"
      />
      <h2>{dishItem.name}</h2>
      <span>{dishItem.price_cents}</span>
    </article>
  );
}
