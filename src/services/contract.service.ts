import { supabase } from '../config/supabase';

enum ContractStatus {
    minted = "MINTED",
    signed = "SIGNED",
    draft = "DRAFT",
    pending = "PENDING APPROVAL"
}

///Add more types as needed
type ContractType = "Contract" | "Policy" |  "Thesis" 


interface ContractInterface {
    title: string;
    description: string;
    status: ContractStatus;
    type: ContractType;
}
export const createContract = async ({ title, description, status, type }: ContractInterface, documentUrl: string) => {
    const now =  new Date().toISOString();
    const { data: contract, error } = await supabase.from("contracts").insert([{
        title,
        description,
        status,
        type,
        url: documentUrl,
        last_activity: now //will be updated on every operation performed
    }]);
    if (error) throw error;
    return contract
}

export const updateContract = async (id:string, data: Partial<ContractInterface>) => {
    const now = new Date().toISOString();
    const { data: updatedContract, error } = await supabase
    .from("contracts")
    .update({
      ...data,
      last_activity: now,
    })
    .eq("id", id);

  if (error) throw error;
  return updatedContract;
}