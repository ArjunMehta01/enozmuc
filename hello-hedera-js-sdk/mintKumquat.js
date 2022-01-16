// QUATS = [
//     "Hog Ridah",
//     "Mashallah Sister Dixie",
//     "Sorry Martha no one wants you in their bloodline",
//     "Jesus Died For These Quads",
//     "If You Like it then you should've put a ring on it",
//     "Top of tha morning",
//     "Get Kummed On",
//     "i'm a lolicon",
//     "Friction makes things more spicy",
//     "AMOGUS",
//     "Loyal to Alabama",
//     "Oppresion leads to good music",
//     "A MAN HAS FALLEN INTO THE RIVER IN LEGO CITY",
//     "I'm feelin' it now Mr.Krabs"
// ];



CID = [
    "QmNPCiNA3Dsu3K5FxDPMG5Q3fZRwVTg14EXA92uqEeSRXn",
    "QmZ4dgAgt8owvnULxnKxNe8YqpavtVCXmc1Lt2XajFpJs9",
    "QmPzY5GxevjyfMUF5vEAjtyRoigzWp47MiKAtLBduLMC1T",
    "Qmd3kGgSrAwwSrhesYcY7K54f3qD7MDo38r7Po2dChtQx5",
    "QmWgkKz3ozgqtnvbCLeh7EaR1H8u5Sshx3ZJzxkcrT3jbw",
];

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
// , 

module.exports = async function mintKumquat(tokenId, treasuryId, treasuryKey, client, supplyKey) {


    console.log("Inside minter");
    let mintTx = await new TokenMintTransaction()
			.setTokenId(tokenId)
			.setMetadata([Buffer.from(CID[0])])
			.freezeWith(client);
    console.log("passing mint")
    let mintTxSign = await mintTx.sign(supplyKey);
    console.log("tx sign pass")
    let mintTxSubmit = await mintTxSign.execute(client);
    console.log(" tx submut pass")
    // let mintRx = await mintTxSubmit.getReceipt(client);

    console.log("First coin minted!");
    // console.log(mintRx.status);



    return mintTx;
}
