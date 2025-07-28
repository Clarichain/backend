import { generatePrivateKey, LucidEvolution } from "@lucid-evolution/lucid";

export async function generateCardanoWallet(lucid: LucidEvolution):Promise<{
  address: string;
  privateKey: string;
}>{
  
  // const privateKey = accountKey.to_bech32();
  // const address = baseAddress.to_address().to_bech32();
  const privateKey = generatePrivateKey();
  lucid.selectWallet.fromPrivateKey(privateKey)
  const address = await lucid.wallet().address();

  const walletData = {
    address: address,
    privateKey: privateKey,
  };

  return walletData
}