import { supabase } from '../config/supabase';

enum ContractStatus {
    minted = "MINTED",
    signed = "SIGNED",
    draft = "DRAFT",
    pending = "PENDING APPROVAL"
}

///Add more types as needed
type ContractType = "Contract" | "Policy" |  "Thesis" 

const getCurrentTime = () =>{
    return new Date().toISOString()
}

interface ContractInterface {
    title: string;
    description: string;
    status: string;
    type: ContractType;
    url?: string;
}
export const createContract = async ({ title, description, status, type }: ContractInterface, documentUrl: string) => {
    const { data: contract, error } = await supabase.from("documents").insert([{
        title,
        description,
        status: status as keyof typeof ContractStatus,
        type,
        url: documentUrl,
        last_activity: getCurrentTime() //will be updated on every operation performed
    }]).select();
    if (error) throw error
    return contract
}

export const updateContract = async (id:string, data: Partial<ContractInterface>) => {
    const { data: updatedContract, error } = await supabase
    .from("contracts")
    .update({
      ...data,
      last_activity: getCurrentTime(),
    })
    .eq("id", id);

  if (error) throw error;
  return updatedContract;
}

export const deleteContract = async (id: string) => {
    const { error } = await supabase.
    from('documents')
    .delete()
    .eq("id", id);
    if (error) throw error;
}

export const getContract = async (id: string) => {
    const { data: contract, error} = await supabase
    .from('documents')
    .select()
    .eq("id", id);
    if(error) throw error;
    return contract
}

///Pending user relations
/*
export const allContract = async (id: string) => {}
*/