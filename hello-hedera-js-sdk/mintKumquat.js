QUATS = [
    "Hog Ridah",
    "Mashallah Sister Dixie",
    "Sorry Martha no one wants you in their bloodline",
    "Jesus Died For These Quads",
    "If You Like it then you should've put a ring on it",
    "Top of tha morning",
    "Get Kummed On",
    "i'm a lolicon",
    "Friction makes things more spicy",
    "AMOGUS",
    "Loyal to Alabama",
    "Oppresion leads to good music",
    "A MAN HAS FALLEN INTO THE RIVER IN LEGO CITY",
    "I'm feelin' it now Mr.Krabs"
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

module.exports = async function mintKumquat(tokenId, client, supplyKey) {

    console.log("Inside minter");
    mintTx = await new TokenMintTransaction()
			.setTokenId(tokenId)
			.setMetadata([Buffer.from(QUATS)])
			.freezeWith(client);
    let mintTxSign = await mintTx.sign(supplyKey);
    let mintTxSubmit = await mintTxSign.execute(client);
    let mintRx = await mintTxSubmit.getReceipt(client);

    console.log("First coin minted!");
    console.log(mintRx.status);

    return mintTx;
}
