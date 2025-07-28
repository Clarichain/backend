import { Router } from "express";
import upload from "../middlewares/upload";
import { uploadContract } from "../controllers/contract.controller"

const router = Router()

router.post(
    "/upload",
    upload.single("contract"),
    uploadContract,
)

export default router
