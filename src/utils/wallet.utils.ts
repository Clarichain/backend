import {
  Bip32PrivateKey,
  BaseAddress,
  NetworkInfo,
  Credential
} from '@emurgo/cardano-serialization-lib-nodejs';
import * as bip39 from 'bip39';
import { generatePrivateKey, LucidEvolution } from "@lucid-evolution/lucid";
// Replace with your own database model or setup
// You need to define and connect your own WalletModel to store the wallet data in a database
// import WalletModel from '../models/Wallet';


export async function generateCardanoWallet(lucid: LucidEvolution):Promise<{
  address: string;
  privateKey: any;
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