import { Router } from "express";
import { registerserController, loginUserController } from "../controllers/auth.controller";

export const router = Router()


router.post("/register", registerserController);
router.post("/register", loginUserController);
export default router