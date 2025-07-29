import { Router } from "express";
import upload from "../middlewares/upload";
import { deleteContractController, getContractController, updateContractController, uploadContractController } from "../controllers/contract.controller"

const router = Router()

router.post(
    "/upload",
    upload.single("document"),
    uploadContractController,
)

router.get(
    "/get/:id",
    getContractController
)

//Implement smart logic for updating document url
router.put(
    "/update/:id",
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
    deleteContractController
)
export default router
