import { render, screen } from "@testing-library/react";
import { test } from "vitest";
import { CartList } from "~/components/cart_list/cart-list";
import { AllTheProviders } from "../utils/test-utils";

test("Test cart list is empty", () => {
  render(
    <AllTheProviders>
      <CartList />
    </AllTheProviders>
  );
});
