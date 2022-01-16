var addUser = require("./addUser");
const createMockNFT = require("./createMockNFT");
const mintKumquat = require("./mintKumquat");
const treasury2U =  require("./treasury2U");


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
    console.log("about to mint first kumquat");
    let mintTx = mintKumquat((await mockTokenID).token, (await mockTokenID).client, (await mockTokenID).supplyKey);
    console.log("Coin Minted");
    console.log("Trying to transfer coin to user");
    treasury2U((await testDummy).accountId, treasuryId, treasuryKey, client, (await mockTokenID).token);


}

main();