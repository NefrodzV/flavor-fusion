import React from "react";
import { MainLayout } from "../components/layout/main-layout";
import { ShoppingBag } from "lucide-react";
import { Heading, Container } from "~/components/ui";
import { CartSection, CheckoutSection } from "~/features/cart";
import type { CartItem } from "~/services";

const DUMMY_ITEMS: CartItem[] = [
  {
    menuItem: {
      id: 1,
      name: "Chicken & Rice Bowl",
      price_cents: 1000,
      images: ["/chicken-rice-plate-small.png"]
    },
    quantity: 1
  }
];
export default function YourBagRoute() {
  // TODO: Implement the cart hook here
  return (
    <MainLayout>
      <Container className="m-auto max-w-5xl mb-6 h-full w-full flex-col">
        <Heading
          as="h1"
          fontSize="large"
          className="flex gap-1 text-xl sm:text-3xl font-bold items-center"
        >
          <ShoppingBag />
          Your bag
        </Heading>

        <Container className="h-full grid grid-cols-1 md:grid-cols-3 gap-2">
          <CartSection items={DUMMY_ITEMS} />
          <CheckoutSection totalCents={1000} />
        </Container>
      </Container>
    </MainLayout>
  );
}
