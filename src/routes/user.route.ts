import { Router } from "express";

import { deleteUser, getUser, updateUser } from "../controller/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.use();

router.get("/", authMiddleware, getUser);
router.patch("/", authMiddleware, updateUser);
router.delete("/", authMiddleware, deleteUser);

export default router;
