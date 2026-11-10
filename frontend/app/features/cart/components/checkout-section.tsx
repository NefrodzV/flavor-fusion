import React from "react";
import { NavLink } from "react-router";
import { Link } from "~/components/link";
import { Button } from "~/components/ui";
export function CheckoutSection({
  totalCents,
  userIsAuthenticated
}: {
  totalCents: number;
  userIsAuthenticated: boolean;
}) {
  console.log(userIsAuthenticated);
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

      {userIsAuthenticated ? (
        <Button
          data-testid="checkout-action"
          css={"w-full font-semibold mbs-4"}
        >
          Proceed to checkout
        </Button>
      ) : (
        <NavLink
          data-testid="login-link"
          to={"/login"}
          className={
            "p-[.5rem] bg-purple-500 rounded-sm hover:bg-purple-400 cursor-pointer text-white font-bold active:scale-95"
          }
        />
      )}
      {/* Maybe add icons for payments
                  google pay appple pay, etc
              */}
    </section>
  );
}
