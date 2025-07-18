import { BLOCKFROST_API_KEY } from "../config/lucid";
import { Blockfrost, generatePrivateKey, generateSeedPhrase, Lucid, LucidEvolution, PrivateKey } from "@lucid-evolution/lucid";
import colors from "colors/safe";

const provider: {
    instance: LucidEvolution | null;
} = {
    instance: null
};

export async function getLucid() {
    try {
        if (!provider.instance) {
            provider.instance = await Lucid(
                new Blockfrost(
                    "https://cardano-preprod.blockfrost.io/api/v0",
                    BLOCKFROST_API_KEY
                ),
                "Preprod"
            )
        }

        return provider.instance;
    } catch (error: any) {
        console.error(colors.red(`Error instantiating lucid: ${error.message}`));

        throw new Error("Custom Error: Fetch Failed");
    }
}

export function selectWalletFromPrivateKey(lucid: LucidEvolution, privateKey: PrivateKey | null = null) {
    try {
        if (!privateKey) {
            privateKey = generatePrivateKey();
        }

        lucid.selectWallet.fromPrivateKey(privateKey); // Assuming you have at least one wallet

        return privateKey;
    } catch (error: any) {
        console.error(colors.red(`Error creating wallet from private key: ${error.message}`));

        throw new Error("Custom Error: Failed to create wallet");
    } 
}

export function selectWalletFromSeedPhrase(lucid: LucidEvolution, seedPhrase: string | null = null) {
    try {
        if (!seedPhrase) {
            seedPhrase = generateSeedPhrase();
        }

        lucid.selectWallet.fromSeed(seedPhrase);

        return seedPhrase;
    } catch (error: any) {
        console.error(colors.red(`Error creating wallet from seed phrase: ${error.message}`));

        throw new Error("Custom Error: Failed to create wallet");
    }
}

export async function getBalance(lucid: LucidEvolution) {
    const utxos = await lucid.wallet().getUtxos()

    utxos.forEach((utxo) => {
        const assets = utxo?.assets;
        if (!assets) return;

        console.log(assets);
    })
}

export function handleError(error: any, res: any) {
    if (error instanceof Error && error.message.startsWith("Custom Error: ")) {
        console.error(colors.red(`Error:, ${error.message}`));
        res.status(500).json({ error: error.message.replace("Custom Error: ", "")});
    } else {
        console.error("An unexpected error occurred:", error);
        res.status(500).json({ error: "An unexpected error occurred." });
    }
}