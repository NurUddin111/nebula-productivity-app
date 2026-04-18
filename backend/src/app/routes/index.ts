import { Router } from "express";
import { AuthRoutes } from "./auth.route";
// import { arcjetProtection } from "../../middleware/arcjet.middleware";
import { MessageRoutes } from "./message.route";

export const router = Router();

// router.use(arcjetProtection);

const apiRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/messages",
    route: MessageRoutes,
  },
];

apiRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
