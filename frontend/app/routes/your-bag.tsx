import React from "react";
import { MainLayout } from "../components/layout/main-layout";
import { Image } from "~/components/image";
import { Minus, Plus, ShoppingBag, Trash } from "lucide-react";
import { Button } from "~/components/button";
import { CartList } from "~/components/cart_list/cart-list";

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
          <CartList
            items={[
              {
                menuItemId: 1,
                name: "Chicken & Rice Bowl",
                price: 1000,
                quantity: 1,
                image: "/chicken-rice-plate-small.png"
              }
            ]}
          />
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
