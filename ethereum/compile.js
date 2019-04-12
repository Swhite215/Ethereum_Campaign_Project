const fs = require("fs-extra");
const path = require("path");
const solc = require("solc");

//Find and delete the build folder
const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

//Read and compile campaign contract
const campaignPath = path.resolve(__dirname, "contracts", "campaign.sol");
const source = fs.readFileSync(campaignPath, "UTF-8");

const output = solc.compile(source, 1).contracts;

//Create build folder and provide it the compiled output
fs.ensureDirSync(buildPath);

for (let contract in output) {
    fs.outputJsonSync(
        path.resolve(buildPath, contract.replace(/:/, "") + ".json"),
        output[contract]
    );
}
