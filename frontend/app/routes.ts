import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/menu", "routes/menu.tsx")
] satisfies RouteConfig;
