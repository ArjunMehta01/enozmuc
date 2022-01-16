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

async function U2Utransaction(tokenID, quatID, sellerID, buyerID, 
                              sellerKey, buyerKey, price, client) {
    let tokenTransfer = await new TransferTransaction()
        .addNftTransfer(tokenID, quatID, sellerID, buyerID)
        .addHbarTransfer(sellerID, Hbar.fromTinybars(price))
        .addHbarTransfer(buyerID, -Hbar.fromTinybars(price))
        .freezeWith(client)
        .sign(sellerKey);
    tokenTranserSign = await tokenTransfer.sign(buyerKey);
    let tokenTransferSubmit = await tokenTransferSign.execute(client);
    let tokenTransferRx = await tokenTransferSubmit.getReceipt(client);
    console.log(`\n Kumquat transfer ${sellerID} to ${BuyerID} status: ${tokenTransferRx.status} \n`);
}