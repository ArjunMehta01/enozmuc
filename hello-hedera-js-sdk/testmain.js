var addUser = require("./addUser");
const createMockNFT = require("./createMockNFT");
const mintKumquat = require("./mintKumquat");
const treasury2U =  require("./treasury2U");
const getTokenQuat = require('./getTokenQuat')


// import addUser from "./addUser.js";
// import createMockNFT from "./createMockNFT.js";
// import mintKumquat from "./mintKumquat.js";
// import treasury2Us from "./treasury2U.js";

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
const U2Utransaction = require("./U2Utransaction");

const treasuryId = AccountId.fromString(process.env.MY_ACCOUNT_ID);
const treasuryKey = PrivateKey.fromString(process.env.MY_PRIVATE_KEY);
const client = Client.forTestnet().setOperator(treasuryId, treasuryKey);


async function main() {
    //Instantiates Test user.

    // Track serial nums of tokens owned by treasury
    let treasuryTokens = [];

    let testDummy = addUser();
    console.log("Created User")
    console.log((await testDummy).accountId, (await testDummy).publicKey);
    console.log("Creating Kumquat");
    let mockTokenID = createMockNFT();
    let kumquatID = (await mockTokenID).token;

    console.log("about to mint first kumquat");
    let mintTx1 = await mintKumquat(kumquatID, (await mockTokenID).client, (await mockTokenID).supplyKey, treasuryTokens);
    console.log(treasuryTokens);

    console.log("Trying to transfer coin to user");
    console.log(`user tokens before transfer ${(await testDummy).tokens}`);
    await treasury2U(treasuryId, treasuryKey, client, kumquatID, treasuryTokens[0], (await testDummy), treasuryTokens);
    console.log(`user tokens after transfer ${(await testDummy).tokens}`);

    console.log("get metadata of user's token");
    console.log(await getTokenQuat(kumquatID, 1, client));

    console.log(`treasury before mint ${treasuryTokens}`);
    let mintTx2 = await mintKumquat(kumquatID, (await mockTokenID).client, (await mockTokenID).supplyKey, treasuryTokens);
    console.log(`treasury after mint ${treasuryTokens}`);

    console.log(`user tokens before transfer ${(await testDummy).tokens}`);
    await treasury2U(treasuryId, treasuryKey, client, kumquatID, treasuryTokens[0], (await testDummy), treasuryTokens);
    console.log(`user tokens after transfer ${(await testDummy).tokens}`);

    console.log("Create another user");
    let dummy2 = addUser();

    console.log("Transfer one of user 1's token to user 2");
    await U2Utransaction(1, client, kumquatID, (await testDummy).tokens[0], await testDummy, await dummy2);

    console.log("Check User 1's tokens");
    console.log((await testDummy).tokens);

    console.log("Check user 2 tokens");
    console.log((await dummy2).tokens);
}


main();