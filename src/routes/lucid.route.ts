import { testController } from "../controllers/lucid.controller";
import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.send("Hello World!");
});

router.get("/test", testController);

export default router;