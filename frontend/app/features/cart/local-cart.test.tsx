import { render, screen, waitFor, within } from "@testing-library/react";
import { expect, test } from "vitest";
import { CartProvider, AuthProvider } from "~/providers";
import CartRoute from "./cart-route";
import { MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";

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
  const checkoutSection = screen.queryByTestId("checkout-section");
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
          slug: "chicken-rice-bowl",
          price_cents: 1000,
          images: ["/chicken-rice-plate-small.png"]
        },
        quantity: 1
      }
    ])
  );

  render(<CartRouteComponent />);
  const cartItemName = await screen.findByText("Chicken & Rice Bowl");
  const checkoutSection = await screen.findByTestId("checkout-section");
  expect(cartItemName).toBeInTheDocument();
  expect(checkoutSection).toBeInTheDocument();
});

test("Quantity increases when plus button is pressed", async () => {
  const user = userEvent.setup();
  localStorage.setItem(
    "flavor_fusion_cart",
    JSON.stringify([
      {
        menuItem: {
          id: 1,
          name: "Chicken & Rice Bowl",
          slug: "chicken-rice-bowl",
          price_cents: 1000,
          images: ["/chicken-rice-plate-small.png"]
        },
        quantity: 1
      },
      {
        menuItem: {
          id: 2,
          name: "Sushi Serenade",
          slug: "sushi-serenade",
          price_cents: 1200,
          images: ["/sushi-serenade-small.png"]
        },
        quantity: 3
      }
    ])
  );
  render(<CartRouteComponent />);
  const firstItem = await screen.findByTestId("chicken-rice-bowl");

  const firstItemIncrement = await within(firstItem).findByTestId(
    "chicken-rice-bowl-increment"
  );

  const firstItemQuantity = await within(firstItem).findByTestId(
    "chicken-rice-bowl-quantity"
  );

  const secondItem = await screen.findByTestId("sushi-serenade");

  const secondItemQuantity = await within(secondItem).findByTestId(
    "sushi-serenade-quantity"
  );

  await user.click(firstItemIncrement);

  expect(firstItemQuantity).toHaveTextContent("2");
  expect(secondItemQuantity).toHaveTextContent("3");
});

test("Quantity decreases when the minus button is pressed", async () => {
  const user = userEvent.setup();
  localStorage.setItem(
    "flavor_fusion_cart",
    JSON.stringify([
      {
        menuItem: {
          id: 1,
          name: "Chicken & Rice Bowl",
          slug: "chicken-rice-bowl",
          price_cents: 1000,
          images: ["/chicken-rice-plate-small.png"]
        },
        quantity: 1
      },
      {
        menuItem: {
          id: 2,
          name: "Sushi Serenade",
          slug: "sushi-serenade",
          price_cents: 1200,
          images: ["/sushi-serenade-small.png"]
        },
        quantity: 3
      }
    ])
  );
  render(<CartRouteComponent />);
  const firstItem = await screen.findByTestId("chicken-rice-bowl");

  const firstItemIncrement = await within(firstItem).findByTestId(
    "chicken-rice-bowl-increment"
  );

  const firstItemQuantity = await within(firstItem).findByTestId(
    "chicken-rice-bowl-quantity"
  );

  const secondItem = await screen.findByTestId("sushi-serenade");

  const secondItemDecrement = await within(secondItem).findByTestId(
    "sushi-serenade-decrement"
  );
  const secondItemQuantity = await within(secondItem).findByTestId(
    "sushi-serenade-quantity"
  );

  await user.click(secondItemDecrement);

  expect(secondItemQuantity).toHaveTextContent("2");
  expect(firstItemQuantity).toHaveTextContent("1");
});

test("Item is delete successfully", async () => {
  const user = userEvent.setup();
  localStorage.setItem(
    "flavor_fusion_cart",
    JSON.stringify([
      {
        menuItem: {
          id: 1,
          name: "Chicken & Rice Bowl",
          slug: "chicken-rice-bowl",
          price_cents: 1000,
          images: ["/chicken-rice-plate-small.png"]
        },
        quantity: 1
      },
      {
        menuItem: {
          id: 2,
          name: "Sushi Serenade",
          slug: "sushi-serenade",
          price_cents: 1200,
          images: ["/sushi-serenade-small.png"]
        },
        quantity: 3
      }
    ])
  );
  render(<CartRouteComponent />);
  const firstItem = await screen.findByTestId("chicken-rice-bowl");
  const deleteButton = await within(firstItem).findByTestId(
    "chicken-rice-bowl-delete"
  );

  await user.click(deleteButton);
  await waitFor(() =>
    expect(screen.queryByTestId("chicken-rice-bowl")).not.toBeInTheDocument()
  );
  expect(await screen.findByTestId("sushi-serenade")).toBeInTheDocument();
});
