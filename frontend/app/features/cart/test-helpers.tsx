import { MemoryRouter } from "react-router";
import { CartProvider, AuthProvider } from "~/providers";
import CartRoute from "./cart-route";
import type { IUser } from "~/providers/AuthProvider";
import type { ICartService } from "~/services";
interface CartRouteComponentProps {
  initialUser?: IUser | null;
  cartServiceProp?: ICartService | null;
}

export const CartRouteComponent = ({
  initialUser = null,
  cartServiceProp = null
}: CartRouteComponentProps) => {
  console.log("Initial user in carr route component", initialUser);
  return (
    <MemoryRouter>
      <AuthProvider initialUser={initialUser}>
        <CartProvider cartServiceProp={cartServiceProp}>
          <CartRoute />
        </CartProvider>
      </AuthProvider>
    </MemoryRouter>
  );
};
