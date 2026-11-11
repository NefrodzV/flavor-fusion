import { render, screen, waitFor, within } from "@testing-library/react";
import { expect, test } from "vitest";
import { CartRouteComponent } from "./test-helpers";
import userEvent from "@testing-library/user-event";

// 1. Define internal mock state
let mockItems = [
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
];

const cartServiceMock = {
  getItems: vi.fn().mockImplementation(async () => {
    return [...mockItems];
  }),
  addItem: vi.fn(),
  updateItem: vi.fn(),
  removeItem: vi.fn()
};

test("Renders cart route for auth user", async () => {
  render(
    <CartRouteComponent
      initialUser={{ username: "John Mark" }}
      cartServiceProp={cartServiceMock}
    />
  );
  const cartItemName = await screen.findByText("Chicken & Rice Bowl");
  const checkoutSection = await screen.findByTestId("checkout-section");
  expect(cartItemName).toBeInTheDocument();
  expect(checkoutSection).toBeInTheDocument();
});

test("Update item is called increasing or decreasing", async () => {
  const user = userEvent.setup();
  render(
    <CartRouteComponent
      initialUser={{ username: "John Mark" }}
      cartServiceProp={cartServiceMock}
    />
  );
  const firstItem = await screen.findByTestId("chicken-rice-bowl");
  const firstItemIncrement = await within(firstItem).findByTestId(
    "chicken-rice-bowl-increment"
  );
  await user.click(firstItemIncrement);
  expect(cartServiceMock.updateItem).toHaveBeenCalled();
});

test("Removed is called", async () => {
  const user = userEvent.setup();
  render(
    <CartRouteComponent
      initialUser={{ username: "John Mark" }}
      cartServiceProp={cartServiceMock}
    />
  );
  const firstItem = await screen.findByTestId("chicken-rice-bowl");
  const deleteButton = await within(firstItem).findByTestId(
    "chicken-rice-bowl-delete"
  );
  await user.click(deleteButton);
  expect(cartServiceMock.removeItem).toHaveBeenCalled();
});

test("Checkout action button is rendered when user is logged in", async () => {
  render(
    <CartRouteComponent
      initialUser={{ username: "John Mark" }}
      cartServiceProp={cartServiceMock}
    />
  );
  const actionButton = await screen.findByTestId("checkout-action");
  expect(actionButton).toBeInTheDocument();
  const loginLink = screen.queryByTestId("login-link");
  expect(loginLink).not.toBeInTheDocument();
});
