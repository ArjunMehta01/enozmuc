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

module.exports = async function U2Utransaction(price, client, tokenID, 
                              tokenSerialNum, sellerInfo, buyerInfo) {

    let sellerID = sellerInfo.accountId;
    let buyerID = buyerInfo.accountId;
    let sellerKey = selllerinfo.privateKey;
    let buyerKey = buyerInfo.privateKey;

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

    buyerInfo.tokens.push(tokenSerialNum);

    let index = sellerInfo.tokens.indexOf(tokenSerialNum);
    if (index != -1) {
        sellerInfo.tokens.splice(index, 1);
    }

}