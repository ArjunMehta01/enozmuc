const express = require("express");
const app = express();
const testmain = require("./testmainwreturn"); 

var addUser = require("./addUser");
const createMockNFT = require("./createMockNFT");
const mintKumquat = require("./mintKumquat");
const treasury2U =  require("./treasury2U");
const getTokenQuat = require('./getTokenQuat')


const PORT = process.env.PORT || 8080;


let testido;
const gaba = async function() {
  try {
    // let mockTokenID = await createMockNFT();
    // let mintTx = ["gabagool", "new"]
    // for(var i = 0; i < 2; i++) {
    // console.log("here")
    //   quat = await mintKumquat(mockTokenID.token, mockTokenID.client, mockTokenID.supplyKey);
    //   mintTx[i] = await getTokenQuat(mockTokenID.ID, i+1, client);
    //   console.log(mintTx[i]);
    // }
    let test = await testmain();
    app.get("/api", (req, res) => {
      res.json({ message: test });
    });
    
    app.listen(PORT, console.log(`Server started on port ${PORT}`));
  }
  catch {
    console.log("kill me")
  }
  
  console.log(testido)
  console.log("here")
};

gaba();
console.log("return valid");
console.log(testido);

