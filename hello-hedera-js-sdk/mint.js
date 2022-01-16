QUATS = [
    "Hog Ridah",
    "Mashallah Sister Dixie",
    "Sorry Martha no one wants you in their bloodline",
    "Jesus Died For These Quads"
]

async function main() {

    mintTx = await new TokenMintTransaction()
			.setTokenId(tokenId)
			.setMetadata([Buffer.from(QUATS)])
			.freezeWith(client);
    let mintTxSign = await mintTx.sign(supplyKey);
    let mintTxSubmit = await mintTxSign.execute(client);
    let mintRx = await mintTxSubmit.getReceipt(client);
    return mintRx;
}