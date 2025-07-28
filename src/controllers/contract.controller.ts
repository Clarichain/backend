import { Request, Response } from "express"
import * as contractService from "../services/contract.service"

export const uploadDocument = async (req: Request, res: Response) => {
    try{
        const contract = await contractService.createContract(req.body)
        res.status(200).json(contract)
    }catch(err){
        res.status(500).json({"error":"error creating contract"})
    }
}