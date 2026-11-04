import { MemoryRouter } from "react-router";
import { CartProvider, AuthProvider } from "~/providers";
import CartRoute from "./cart-route";
import type { IUser } from "~/providers/AuthProvider";
interface CartRouteComponentProps {
  initialUser?: IUser | null;
}
// TODO: NEED TO MOCK ICartService
export const CartRouteComponent = ({
  initialUser = null
}: CartRouteComponentProps) => {
  return (
    <MemoryRouter>
      <AuthProvider initialUser={initialUser}>
        <CartProvider>
          <CartRoute />
        </CartProvider>
      </AuthProvider>
    </MemoryRouter>
  );
};
