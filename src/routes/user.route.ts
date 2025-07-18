import { Router } from "express";
import { createUserController } from "../controllers/user.controller";

export const router = Router()


router.post("/register", createUserController)
export default router