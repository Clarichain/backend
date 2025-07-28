import { Request, Response } from "express"
import * as contractService from "../services/contract.service"

export const uploadContract = async (req: Request, res: Response) => {
    try{
        const documentUrl = req.file.path
        if(!documentUrl){
            res.status(401).json({"error":"Invalid document"})
            throw new Error("missing url")
        }
        const contract = await contractService.createContract(req.body, documentUrl)
        res.status(200).json(contract)
    }catch(err){
        res.status(500).json({"error":"error creating contract"})
    }
}