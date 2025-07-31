import { Request, Response } from "express";
import * as contractService from "../services/contract.service";
import { PostgrestError } from "@supabase/supabase-js";


//creates the contract record on supabase
export const uploadContractController = async (req: Request, res: Response) => {
    try{
        if(!req.file){
            res.status(401).json({"error":"Missing document"})
            throw new Error("missing document")
        }

        if(!req.user || !req.supabase){
            res.status(400).json({"error":"Undefined user context"})
            return
        }

        const supabase = req.supabase
        const documentUrl = req.file.path
        const contract = await contractService.createContract(supabase, req.body, documentUrl)
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

//
export const getContractController = async (req: Request, res:Response) => {
    try{
        const id = req.params.id

         if(!req.user || !req.supabase){
            res.status(400).json({"error":"Undefined user context"})
            return
        }

        const supabase = req.supabase
        const contract = await contractService.getContract(supabase, id)
        res.status(200).json(contract)
    } catch(err){
        if(err instanceof PostgrestError){
            res.status(400).json({"error":"Could not find contract record"})
            return
        }
        res.status(500).json({"error":"Error retrieving contract"})
    }
}

export const updateContractController = async (req: Request, res: Response) => {
    try{
        const id = req.params.id;
        if(!req.user || !req.supabase){
            res.status(400).json({"error":"Undefined user context"})
            return
        }

        const supabase = req.supabase
        const contract = await contractService.updateContract(supabase, id, req.body)
        res.status(200).json(contract)
    }catch(err: unknown){
        if(err instanceof PostgrestError){
            res.status(400).json({"error":"Could not find contract record"})
            return
        }
        res.status(500).json({"error":"Error updating contract"})
    }
}

export const deleteContractController = async (req: Request, res:Response) => {
    try{
        const id = req.params.id
        if(!req.user || !req.supabase){
            res.status(400).json({"error":"Undefined user context"})
            return
        }

        const supabase = req.supabase
        await contractService.deleteContract(supabase, id)
        res.status(200).json({"message":"Contract deleted successfully"})
    } catch(err){
        if(err instanceof PostgrestError){
            res.status(400).json({"error":"Could not find contract record"})
            return
        }
        res.status(500).json({"error":"Error deleting contract"})
    }
}