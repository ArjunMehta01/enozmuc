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

const treasuryId = AccountId.fromString(process.env.MY_ACCOUNT_ID);
const treasuryKey = PrivateKey.fromString(process.env.MY_PRIVATE_KEY);
const client = Client.forTestnet().setOperator(treasuryId, treasuryKey);


async function main() {
    //Instantiates Test user.
    let tokensMinted = 0;

    let testDummy = addUser();
    console.log("Created User")
    console.log((await testDummy).accountId, (await testDummy).publicKey);
    console.log("Creating first Kumquat");
    let mockTokenID = createMockNFT();

    console.log("about to mint first kumquat");
    let mintTx = await mintKumquat((await mockTokenID).token, tokensMinted, treasuryId, treasuryKey,  (await mockTokenID).client, (await mockTokenID).supplyKey);
    tokensMinted = tokensMinted + 1;

    console.log("Trying to transfer coin to user");
    await treasury2U((await testDummy).accountId, (await testDummy).privateKey, treasuryId, treasuryKey, client, (await mockTokenID).token, 1);
    console.log("Coin transferred. checking balance for confirmation");

    userBalance = await new AccountBalanceQuery().setAccountId((await testDummy).accountId).execute(client);
    console.log(userBalance.tokens);

    console.log("get metadata of user's token");

    console.log(getTokenQuat((await mockTokenID).token), 1, client);
}


main();