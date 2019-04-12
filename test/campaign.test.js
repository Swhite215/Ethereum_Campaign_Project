const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const compiledCampaignFactory = require("../ethereum/build/CampaignFactory.json");
const compiledCampaign = require("../ethereum/build/Campaign.json");

const web3 = new Web3(ganache.provider());

//Variables
let accounts;
let factoryContract;
let campaignAddress;
let campaignContract;

beforeEach(async function() {
    accounts = await web3.eth.getAccounts();

    factoryContract = web3.eth
        .Contract(JSON.parse(compiledCampaignFactory.interface))
        .deploy({ data: compiledCampaignFactory.bytecode })
        .send({ from: accounts[0], gas: "1000000" });
});

describe("Campaign Factory Contract", function() {});

describe("Campaign Contract", function() {});
