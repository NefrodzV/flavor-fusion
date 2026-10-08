import React from "react";
import { MainLayout } from "../components/layout/main-layout";
import { Image } from "~/components/image";

export default function YourBagRoute() {
  return (
    <MainLayout css="h-full flex justify-center">
      <div className="max-w-5xl text-3xl font-bold mb-6 h-full w-full">
        {/* Add bag icon */}
        <h1>Your bag</h1>

        <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-2">
          <section className="w-full flex flex-col gap-3 col-span-2">
            <article className="overflow-hidden w-full min-h-[150px] grid grid-cols-3 shadow-sm rounded-sm">
              <Image
                css={"block h-full object-cover"}
                src="/chicken-rice-plate-small.jpg"
              />
              <div className="col-span-2">Content</div>
            </article>
            <article className="shadow-sm w-full min-h-[150px] grid grid-cols-3 rounded-sm">
              <Image css={"block h-full"} src="/chicken-rice-plate-small.jpg" />
              <div className="col-span-2">Content</div>
            </article>
          </section>
          <aside>
            <h2>Checkout</h2>
          </aside>
        </div>
      </div>
    </MainLayout>
  );
}
