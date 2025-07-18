import { getBalance, getLucid, handleError, selectWalletFromPrivateKey, selectWalletFromSeedPhrase } from "../helpers";

export async function testController(req: any, res: any): Promise<void> {
    try {
        // Simulate some processing
        const lucid = await getLucid();
        const secretPhrase = selectWalletFromSeedPhrase(lucid, "health gap pioneer frost orbit fatal wreck turkey push foot response rabbit pencil capable slush survey ecology double depart guard affair crush neutral salon");

        const result = { message: secretPhrase, address: await lucid.wallet().address(), balance: await getBalance(lucid) };
        res.status(200).json(result);
    } catch (error: any) {
        handleError(error, res);
    }
}