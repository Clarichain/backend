import { Router } from "express";
import upload from "../middlewares/upload";
import {  } from "../controllers/contract.controller"

const router = Router()

router.post(
    "/upload",
    upload.single("contract")
)

export default router
