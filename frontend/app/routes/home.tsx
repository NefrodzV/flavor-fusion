import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { Hero } from "~/components/hero";
import { Image } from "~/components/image";
import { Button } from "~/components/button";
import { Link } from "~/components/link";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Flavor Fusion" },
    { name: "description", content: "Welcome to React Router!" }
  ];
}

export default function Home() {
  return (
    <main className="px-[10%] py-[5%]">
      <Hero css="grid lg:grid-cols-[.6fr_.4fr] gap-4 grid-cols-1 ">
        <Image
          css="w-full max-w-[1920px]"
          src="/restaurant-medium.jpg"
          srcSet="/restaurant-small.jpg 650w, 
          /restaurant-medium.jpg 1920w"
          sizes="(max-width: 600px) 650px, 
         1920px"
        />
        <Hero.Content css="flex flex-col gap-2">
          <h1 className="text-2xl md:text-4xl font-semibold">
            Welcome to Flavor Fusion
          </h1>
          <p className="text-lg md:text-xl">
            Fusion Dive into a world where culinary creativity knows no bounds.
            Here, we celebrate the art of combining diverse flavors and
            ingredients from around the globe, crafting dishes that excite the
            palate and inspire the imagination. From tantalizing recipes to
            innovative cooking techniques, Flavor Fusion is your go-to
            destination for exploring the delicious intersection of tradition
            and innovation in the culinary landscape. Join us on this flavorful
            journey and discover how to transform everyday meals into
            extraordinary experiences!
          </p>
          <Link
            text="View Menu"
            to="#"
            css="bg-purple-200 hover:bg-purple-400 self-start px-[.5rem] py-[.5rem] text-xl md:text-2xl rounded-sm transition font-medium"
          />
        </Hero.Content>
      </Hero>
    </main>
  );
}
