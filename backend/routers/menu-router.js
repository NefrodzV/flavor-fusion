import { Router } from "express";
import { withAsyncHandler } from "../middlewares";

export const createMenuRouter = ({ menuController }) => {
  const router = Router();

  router.get("/", withAsyncHandler(menuController.getAll));

  return router;
};
