import express from "express";

export function createApp({ menuRouter }) {
  const app = express();

  app.use("/api/menu", menuRouter);

  return app;
}
