require("dotenv").config();

// RUNS once
async function createMockNFT() {

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
    
    // Configure accounts and client, and generate needed keys
    const operatorId = AccountId.fromString(process.env.MY_ACCOUNT_ID);
    const operatorKey = PrivateKey.fromString(process.env.MY_PRIVATE_KEY);
    const treasuryId = AccountId.fromString(process.env.MY_ACCOUNT_ID);
    const treasuryKey = PrivateKey.fromString(process.env.MY_PRIVATE_KEY);
    
    const supplyKey = PrivateKey.generate();
    const adminKey = PrivateKey.generate();
    const pauseKey = PrivateKey.generate();
    const freezeKey = PrivateKey.generate();
    const wipeKey = PrivateKey.generate();

    let nftCreate = await new TokenCreateTransaction()
    .setTokenName("KUMQUAT")
    .setTokenSymbol("KUM")
    .setTokenType(TokenType.NonFungibleUnique)
    .setDecimals(0)
    .setInitialSupply(0)
    .setTreasuryAccountId(treasuryId)
    .setSupplyType(TokenSupplyType.Finite)
    // change length
    // .setMaxSupply(CID.length)
    // .setCustomFees([nftCustomFee])
    .setAdminKey(adminKey)
    .setSupplyKey(supplyKey)
    // .setPauseKey(pauseKey)
    .setFreezeKey(freezeKey)
    .setWipeKey(wipeKey)
    .freezeWith(client)
    .sign(treasuryKey);


    let nftCreateTxSign = await nftCreate.sign(adminKey);
	let nftCreateSubmit = await nftCreateTxSign.execute(client);
	let nftCreateRx = await nftCreateSubmit.getReceipt(client);
	let tokenId = nftCreateRx.tokenId;
	// console.log(`Created NFT with Token ID: ${tokenId} \n`);

    // var tokenInfo = await new TokenInfoQuery().setTokenId(tokenId).execute(client);
	// console.table(tokenInfo.customFees[0]);

    return tokenId;
}


export default createMockNFT;
