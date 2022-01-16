require("dotenv").config();


async function treasury2U(userId) {
    let tokenTransferTx = await new TransferTransaction()
    .addNftTransfer(tokenId, 2, treasuryId, aliceId)
    .freezeWith(client)
    .sign(treasuryKey);
let tokenTransferSubmit = await tokenTransferTx.execute(client);
let tokenTransferRx = await tokenTransferSubmit.getReceipt(client);
console.log(`\n NFT transfer Treasury->Alice status: ${tokenTransferRx.status} \n`);
}