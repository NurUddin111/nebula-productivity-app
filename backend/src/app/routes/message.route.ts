import { Router } from "express";
import {
  getAllContacts,
  getChatPartners,
  getMessagesByUserId,
  sendMessage,
} from "../controllers/message.controller";
import { protectRoute } from "../../middleware/auth.middleware";

const router = Router();

router.use(protectRoute);
router.get("/contacts", getAllContacts);
router.get("/chats", getChatPartners);
router.get("/:id", getMessagesByUserId);
router.post("/send/:id", sendMessage);

export const MessageRoutes = router;
