import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/menu", "routes/menu.tsx"),
  route("/menu/:slug", "routes/menu-item.tsx"),
  route("/your-bag", "routes/your-bag.tsx")
] satisfies RouteConfig;
