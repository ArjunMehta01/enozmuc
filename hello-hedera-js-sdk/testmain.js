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

    let testDummy = addUser();
    console.log("Created User")
    console.log((await testDummy).accountId, (await testDummy).publicKey);
    console.log("Creating first Kumquat");
    let mockTokenID = createMockNFT();
    let kumquatID = (await mockTokenID).token;

    console.log("about to mint first kumquat");
    let mintTx1 = await mintKumquat(kumquatID, (await mockTokenID).client, (await mockTokenID).supplyKey);


    console.log("Trying to transfer coin to user");
    await treasury2U((await testDummy).accountId, (await testDummy).privateKey, treasuryId, treasuryKey, client, kumquatID, 1);
    console.log("Coin transferred. checking balance for confirmation");

    userBalance = await new AccountBalanceQuery().setAccountId((await testDummy).accountId).execute(client);
    console.log(userBalance.tokens);

    console.log("get metadata of user's token");

    console.log(await getTokenQuat(kumquatID, 1, client));
    // console.log(getTokenQuat((await mockTokenID).token), 1, client);
    let mintTx2 = await mintKumquat(kumquatID, (await mockTokenID).client, (await mockTokenID).supplyKey);

    console.log("get all of user's token serial numbers");

    balanceCheck = await new AccountBalanceQuery().setAccountId((await testDummy).accountId).execute(client);
    console.log(balanceCheck.toString());
}


main();