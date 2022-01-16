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

module.exports = async function U2Utransaction(sellerID, buyerID, 
                              sellerKey, buyerKey, price, client, tokenID, tokenSerialNum) {

    console.log("association")
    let associateTx = await new AccountUpdateTransaction()
		.setAccountId(buyerId)
		.setMaxAutomaticTokenAssociations(100)
		.freezeWith(client)
		.sign(buyerKey);
	let associateTxSubmit = await associateTx.execute(client);
	let associateRx = await associateTxSubmit.getReceipt(client);
	console.log(`New User NFT Auto-Association: ${associateRx.status} \n`);

    let tokenTransfer = await new TransferTransaction()
        .addNftTransfer(tokenID, tokenSerialNum, sellerID, buyerID)
        .addHbarTransfer(sellerID, Hbar.fromTinybars(price))
        .addHbarTransfer(buyerID, -Hbar.fromTinybars(price))
        .freezeWith(client)
        .sign(sellerKey);
    tokenTranserSign = await tokenTransfer.sign(buyerKey);
    let tokenTransferSubmit = await tokenTransferSign.execute(client);
    let tokenTransferRx = await tokenTransferSubmit.getReceipt(client);
    console.log(`\n Kumquat transfer ${sellerID} to ${BuyerID} status: ${tokenTransferRx.status} \n`);
}