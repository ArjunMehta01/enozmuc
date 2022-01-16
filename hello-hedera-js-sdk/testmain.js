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
// , treasuryId, treasuryKey, 
    console.log("about to mint first kumquat");
    let mintTx = await mintKumquat((await mockTokenID).token, treasuryId, treasuryKey,  (await mockTokenID).client, (await mockTokenID).supplyKey);


    console.log("association")
    let associateTx = await new AccountUpdateTransaction()
		.setAccountId((await testDummy).accountId)
		.setMaxAutomaticTokenAssociations(100)
		.freezeWith(client)
		.sign((await testDummy).privateKey);
	let associateTxSubmit = await associateTx.execute(client);
	let associateRx = await associateTxSubmit.getReceipt(client);
	console.log(`New User NFT Auto-Association: ${associateRx.status} \n`);

    console.log("Trying to transfer coin to user");
    await treasury2U((await testDummy).accountId, treasuryId, treasuryKey, client, (await mockTokenID).token);



}

main();