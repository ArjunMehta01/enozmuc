const { Client, PrivateKey, AccountCreateTransaction, AccountBalanceQuery, Hbar, TransferTransaction} = require("@hashgraph/sdk");
require("dotenv").config();

module.exports = async function addUser() {

    //Grab your Hedera testnet account ID and private key from your .env file
    const myAccountId = process.env.MY_ACCOUNT_ID;
    const myPrivateKey = process.env.MY_PRIVATE_KEY;

    // If we weren't able to grab it, we should throw a new error
    if (myAccountId == null ||
        myPrivateKey == null ) {
        throw new Error("Environment variables myAccountId and myPrivateKey must be present");
    }

    // Create our connection to the Hedera network
    // The Hedera JS SDK makes this really easy!
    const client = Client.forTestnet();

    client.setOperator(myAccountId, myPrivateKey);

    //Create new keys
    const newAccountPrivateKey = await PrivateKey.generate(); 
    const newAccountPublicKey = newAccountPrivateKey.publicKey;

    //Create a new account with 1,000 tinybar starting balance
    const newAccountTransactionResponse = await new AccountCreateTransaction()
        .setKey(newAccountPublicKey)
        .setInitialBalance(Hbar.fromTinybars(100))
        .execute(client);

    // Get the new account ID
    const getReceipt = await newAccountTransactionResponse.getReceipt(client);
    const newAccountId = getReceipt.accountId;

    // console.log("The new account ID is: " +newAccountId);

    // //Verify the account balance
    // const accountBalance = await new AccountBalanceQuery()
    //     .setAccountId(newAccountId)
    //     .execute(client);

    // console.log("The new account balance is: " +accountBalance.hbars.toTinybars() +" tinybar.");

    // //Create the transfer transaction
    // const sendHbar = await new TransferTransaction()
    //     .addHbarTransfer(myAccountId, Hbar.fromTinybars(-10))
    //     .addHbarTransfer(newAccountId, Hbar.fromTinybars(10))
    //     .execute(client);

    // //Verify the transaction reached consensus
    // const transactionReceipt = await sendHbar.getReceipt(client);
    // console.log("The transfer transaction from my account to the new account was: " + transactionReceipt.status.toString());
    
    // //Request the cost of the query
    // const queryCost = await new AccountBalanceQuery()
    //  .setAccountId(newAccountId)
    //  .getCost(client);

    // console.log("The cost of query is: " +queryCost);

    // //Check the new account's balance
    // const getNewBalance = await new AccountBalanceQuery()
    //     .setAccountId(newAccountId)
    //     .execute(client);

    // const getOldBalance = await new AccountBalanceQuery().setAccountId(myAccountId).execute(client)

    // console.log("The account balance after the transfer is: " +getNewBalance.hbars.toTinybars() +" tinybar.")
    // console.log("OG account balance " + getOldBalance)
    
    console.log("gabagool");
    console.log("cum", newAccountPrivateKey, newAccountPublicKey, newAccountId);

    let tokensOwned = [];
    return {privateKey: newAccountPrivateKey, publicKey: newAccountPublicKey, accountId: newAccountId, tokens: tokensOwned};
}


// exports.addUser = addUser;