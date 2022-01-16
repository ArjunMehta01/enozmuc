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
    NftId,
    TokenNftInfoQuery,
} = require("@hashgraph/sdk");

module.exports = async function getTokenQuat(tokenID, tokenSerialNum, client) {

    console.log("inside get quat");
    let nftID = new NftId(tokenID, tokenSerialNum);
    const nftInfo = await new TokenNftInfoQuery()
     .setNftId(nftID)
     .execute(client);
    console.log("parsing JSON");
    let metadataStr = JSON.parse(nftInfo.toString()).metadata;

    var str = '';
    for (var i = 0; i < ascii.length; i+=2) {
        str += String.fromCharCode(parseInt(metadataStr.substr(i, 2), 16));
    }
    return str;
}