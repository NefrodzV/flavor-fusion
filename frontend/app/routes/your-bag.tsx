import React from "react";
import { MainLayout } from "../components/layout/main-layout";
import { Image } from "~/components/image";
import { Minus, Plus, ShoppingBag, Trash } from "lucide-react";
import { Button } from "~/components/button";

export default function YourBagRoute() {
  return (
    <MainLayout css="h-full flex justify-center">
      <div className="max-w-5xl  mb-6 h-full w-full">
        {/* Add bag icon */}
        <h1 className="flex gap-1 text-xl sm:text-3xl font-bold items-center">
          <ShoppingBag />
          Your bag
        </h1>

        <div className="h-full grid grid-cols-1 md:grid-cols-3 gap-2">
          <section className="w-full flex flex-col gap-3 col-span-2">
            <article className="overflow-hidden p-2 sm:p-4 grid gap-4 grid-cols-[100px_1fr] sm:grid-cols-[120px_1fr] shadow-sm rounded-sm border-1 border-solid border-purple-100">
              <Image
                css={"block h-24 sm:h-28 w-full rounded-sm object-cover"}
                src="/chicken-rice-plate-small.jpg"
              />
              <div className=" flex flex-col">
                <div className="flex justify-between gap-1">
                  <div className="">
                    <h3 className="text-base md:text-lg font-semibold ">
                      Chicken & Rice Fusion Bowl
                    </h3>
                    <p className="text-sm text-gray-500">$19.99</p>
                  </div>
                  <button className="cursor-pointer block p-1 rounded-sm border-red-300 bg-red-100/50 border-solid border-1 w-min h-min">
                    <Trash color="red" width={14} height={14} />
                  </button>
                </div>

                <div className="text-sm  flex justify-between mbs-auto mbe-0">
                  <div className="flex gap-1 ">
                    <button className="cursor-pointer border-1 border-solid border-purple-400 p-1 bg-purple-100/80 rounded-sm items-center">
                      <Minus width={14} height={14} />
                    </button>
                    <span className="text-base flex items-center"> 3 </span>
                    <button className="cursor-pointer border-1 border-solid border-purple-400 p-1 bg-purple-100/80 rounded-sm items-center">
                      <Plus width={14} height={14} />
                    </button>
                  </div>
                  <span className="text-base font-semibold"> $19.99</span>
                </div>
              </div>
            </article>

            <article className="overflow-hidden p-2 sm:p-4 grid gap-4 grid-cols-[100px_1fr] sm:grid-cols-[120px_1fr] shadow-sm rounded-sm border-1 border-solid border-purple-100">
              <Image
                css={"block h-24 sm:h-28 w-full rounded-sm object-cover"}
                src="/chicken-rice-plate-small.jpg"
              />
              <div className=" flex flex-col">
                <div className="flex justify-between gap-1">
                  <div className="">
                    <h3 className="text-base sm:text-lg font-semibold ">
                      Chicken & Rice Fusion Bowl
                    </h3>
                    <p className="text-sm text-gray-500">$19.99</p>
                  </div>
                  <button className="cursor-pointer block p-1 rounded-sm border-red-300 bg-red-100/50 border-solid border-1 w-min h-min">
                    <Trash color="red" width={14} height={14} />
                  </button>
                </div>

                <div className="text-sm  flex justify-between mbs-auto mbe-0">
                  <div className="flex gap-1 ">
                    <button className="cursor-pointer border-1 border-solid border-purple-400 p-1 bg-purple-100/80 rounded-sm items-center">
                      <Minus width={14} height={14} />
                    </button>
                    <span className="text-base flex items-center"> 3 </span>
                    <button className="cursor-pointer border-1 border-solid border-purple-400 p-1 bg-purple-100/80 rounded-sm items-center">
                      <Plus width={14} height={14} />
                    </button>
                  </div>
                  <span className="text-base font-semibold"> $19.99</span>
                </div>
              </div>
            </article>
            <article className="overflow-hidden p-2 sm:p-4 grid gap-4 grid-cols-[100px_1fr] sm:grid-cols-[120px_1fr] shadow-sm rounded-sm border-1 border-solid border-purple-100">
              <Image
                css={"block h-24 sm:h-28 w-full rounded-sm object-cover"}
                src="/chicken-rice-plate-small.jpg"
              />
              <div className=" flex flex-col">
                <div className="flex justify-between gap-1">
                  <div className="">
                    <h3 className="text-base md:text-lg font-semibold ">
                      Chicken & Rice Fusion Bowl
                    </h3>
                    <p className="text-sm text-gray-500">$19.99</p>
                  </div>
                  <button className="cursor-pointer block p-1 rounded-sm border-red-300 bg-red-100/50 border-solid border-1 w-min h-min">
                    <Trash color="red" width={14} height={14} />
                  </button>
                </div>

                <div className="text-sm  flex justify-between mbs-auto mbe-0">
                  <div className="flex gap-1 ">
                    <button className="cursor-pointer border-1 border-solid border-purple-400 p-1 bg-purple-100/80 rounded-sm items-center">
                      <Minus width={14} height={14} />
                    </button>
                    <span className="text-base flex items-center"> 3 </span>
                    <button className="cursor-pointer border-1 border-solid border-purple-400 p-1 bg-purple-100/80 rounded-sm items-center">
                      <Plus width={14} height={14} />
                    </button>
                  </div>
                  <span className="text-base font-semibold"> $19.99</span>
                </div>
              </div>
            </article>
          </section>
          <aside className="rounded-sm shadow-sm p-3 h-min border-1 border-purple-100">
            <h2 className="text-base sm:text-xl font-bold">Order Summary</h2>
            <hr className="border-t border-gray-200" />
            <div className="flex justify-between py-2">
              <span>Subtotal</span>
              <span>$ 19.99</span>
            </div>
            <hr className="border-t border-gray-200" />
            <div className="flex justify-between text-lg sm:text-xl font-bold">
              <span>Estimated Total</span>
              <span>$ 19.99</span>
            </div>
            <Button css={"w-full font-semibold mbs-4"}>
              Proceed to checkout
            </Button>

            {/* Maybe add icons for payments
                google pay appple pay, etc
            */}
          </aside>
        </div>
      </div>
    </MainLayout>
  );
}
