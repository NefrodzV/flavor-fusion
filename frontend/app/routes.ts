import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("features/home/home-route.tsx"),
  route("/menu", "features/menu/menu-route.tsx"),
  route("/menu/:slug", "features/menu-item/menu-item-route.tsx"),
  route("/your-bag", "features/cart/cart-route.tsx"),
  route("/login", "features/login/login-route.tsx")
] satisfies RouteConfig;
