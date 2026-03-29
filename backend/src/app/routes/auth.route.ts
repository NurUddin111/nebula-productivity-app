import { Request, Response, Router } from "express";
import { login, logout, signup } from "../controllers/auth.controller";
import { protectRoute } from "../../middleware/auth.middleware";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.get("/check", protectRoute, (req: Request, res: Response) =>
  res.status(200).json(req.user),
);

export const AuthRoutes = router;
