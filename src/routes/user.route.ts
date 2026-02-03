import { Router } from "express";

import { deleteUser, getUser, updateUser } from "../controller/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.use(authMiddleware)

router.get("/", getUser);
router.patch("/", updateUser);
router.delete("/", deleteUser);

export default router;
