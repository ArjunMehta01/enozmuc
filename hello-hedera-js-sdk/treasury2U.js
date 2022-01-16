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

module.exports = async function treasury2U(treasuryId, treasuryKey, client, tokenId, tokenSerialNum, userInfo, treasury) {
    console.log("Inside T2U");

    let userId = userInfo.accountId;
    let userKey = userInfo.privateKey;

    console.log("association")
    let associateTx = await new AccountUpdateTransaction()
		.setAccountId(userId)
		.setMaxAutomaticTokenAssociations(100)
		.freezeWith(client)
		.sign(userKey);
	let associateTxSubmit = await associateTx.execute(client);
	let associateRx = await associateTxSubmit.getReceipt(client);
	console.log(`New User NFT Auto-Association: ${associateRx.status} \n`);
    
    let tokenTransferTx = await new TransferTransaction()
    .addNftTransfer(tokenId, tokenSerialNum, treasuryId, userId)
    .freezeWith(client)
    .sign(treasuryKey);
    let tokenTransferSubmit = await tokenTransferTx.execute(client);
    console.log("I think? uwu")
    let tokenTransferRx = await tokenTransferSubmit.getReceipt(client);
    console.log(`\n NFT transfer Treasury->${userId} status: ${tokenTransferRx.status} \n`);

    userInfo.tokens.push(tokenSerialNum);

    let index = treasury.indexOf(tokenSerialNum);
    if (index != -1) {
        treasury.splice(index, 1);
    }

}

