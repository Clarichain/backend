import { Router } from "express";
import upload from "../middlewares/upload";
import { verifySupabaseAuthorization } from "../middlewares/auth.middleware";
import { deleteContractController, getContractController, updateContractController, uploadContractController } from "../controllers/contract.controller"

const router = Router()

router.post(
    "/upload",
    verifySupabaseAuthorization,
    upload.single("document"),
    uploadContractController,
)

router.get(
    "/get/:id",
    verifySupabaseAuthorization,
    getContractController,
)

//expect user id in headers. Middleware for auth guard
router.get(
    "/get/all",
    verifySupabaseAuthorization,
    getContractController,
)

//Implement smart logic for updating document url
router.put(
    "/update/:id",
    verifySupabaseAuthorization,
    upload.single('document'),
    (req, res, next) => {
        if (req.file){
            (req as any).body.url = req.file.path
        }
        next()
    },
    updateContractController    
)

router.delete(
    "/delete/:id",
    verifySupabaseAuthorization,
    deleteContractController
)

export default router
