import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { CartProvider, AuthProvider } from "~/providers";
import CartRoute from "./cart-route";
import { MemoryRouter } from "react-router";

const CartRouteComponent = () => {
  return (
    <MemoryRouter>
      <AuthProvider>
        <CartProvider>
          <CartRoute />
        </CartProvider>
      </AuthProvider>
    </MemoryRouter>
  );
};

beforeEach(() => {
  localStorage.clear();
});

test("CartList is empty and checkout section is not rendered", async () => {
  render(<CartRouteComponent />);

  const cartMessage = await screen.findByText("Your bag has no items");
  const checkoutSection = await screen.queryByTestId("checkout-section");
  expect(cartMessage).toBeInTheDocument();
  expect(checkoutSection).not.toBeInTheDocument();
});

test("CartList is not empty and checkout section is rendered", async () => {
  localStorage.setItem(
    "flavor_fusion_cart",
    JSON.stringify([
      {
        menuItem: {
          id: 1,
          name: "Chicken & Rice Bowl",
          price_cents: 1000,
          images: ["/chicken-rice-plate-small.png"]
        },
        quantity: 1
      }
    ])
  );

  render(<CartRouteComponent />);
  const cartMessage = await screen.findByText("Chicken & Rice Bowl");
  const checkoutSection = await screen.findByTestId("checkout-section");
  expect(cartMessage).toBeInTheDocument();
  expect(checkoutSection).toBeInTheDocument();
});
