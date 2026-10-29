import React from "react";
import { Button } from "~/components/ui";
export function CheckoutSection({ totalCents }: { totalCents: number }) {
  return (
    <section
      data-testid="checkout-section"
      className="w-full rounded-sm shadow-sm p-3 h-min border-1 border-purple-100 md:col-span-auto"
    >
      <h2 className="text-base sm:text-xl font-bold">Order Summary</h2>
      <hr className="border-t border-gray-200" />
      <div className="flex justify-between py-2">
        <span>Subtotal</span>
        <span>$ {(totalCents / 100).toFixed(2)}</span>
      </div>
      <hr className="border-t border-gray-200" />
      <div className="flex justify-between text-lg sm:text-xl font-bold">
        <span>Estimated Total</span>
        <span>$ {(totalCents / 100).toFixed(2)}</span>
      </div>
      <Button css={"w-full font-semibold mbs-4"}>Proceed to checkout</Button>

      {/* Maybe add icons for payments
                  google pay appple pay, etc
              */}
    </section>
  );
}
