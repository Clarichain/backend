import { Request, Response } from "express";
import * as contractService from "../services/contract.service";
import { PostgrestError } from "@supabase/supabase-js";

export const uploadContract = async (req: Request, res: Response) => {
    try{
        if(!req.file){
            res.status(401).json({"error":"Missing document"})
            throw new Error("missing document")
        }

        const documentUrl = req.file.path
        const contract = await contractService.createContract(req.body, documentUrl)
        res.status(200).json(contract)
    }catch(err){
		if(err instanceof PostgrestError){
			console.log("supabase error", err.message)
			res.status(500).json({"error":"error creating contract"})
		}else{
			console.log("non supabase error",err)
			res.status(500).json({"error":"error creating contract"})
		}
    }
}