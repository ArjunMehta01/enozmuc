require("dotenv").config();

const {
    AccountId,
    PrivateKey,
    Client,
    TokenCreateTransaction,
    TokenInfoQuery,
    TokenType,
    CustomRoyaltyFee,
    CustomFixedFee,
    Hbar,
    TokenSupplyType,
    TokenMintTransaction,
    TokenBurnTransaction,
    TransferTransaction,
    AccountBalanceQuery,
    AccountUpdateTransaction,
    TokenAssociateTransaction,
} = require("@hashgraph/sdk");

module.exports = async function treasury2U(userId, treasuryId, treasuryKey, client, tokenId) {
    console.log("Inside T2U");
    let tokenTransferTx = await new TransferTransaction()
    .addNftTransfer(tokenId, 1, treasuryId, userId)
    .freezeWith(client)
    .sign(treasuryKey);
    let tokenTransferSubmit = await tokenTransferTx.execute(client);
    console.log("I think? uwu")
    let tokenTransferRx = await tokenTransferSubmit.getReceipt(client);
    console.log(`\n NFT transfer Treasury->${userId} status: ${tokenTransferRx.status} \n`);




}

