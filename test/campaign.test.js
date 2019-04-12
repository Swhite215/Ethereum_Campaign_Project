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

    //Create a Factory Contract
    factoryContract = await new web3.eth.Contract(
        JSON.parse(compiledCampaignFactory.interface)
    )
        .deploy({ data: compiledCampaignFactory.bytecode })
        .send({ from: accounts[0], gas: "1000000" });

    //Create and deploy Campaign Contract using the Factory contract
    await factoryContract.methods
        .createCampaign("100")
        .send({ from: accounts[0], gas: "1000000" });

    //Find the address for the deployed Campaign Contract
    [
        campaignAddress
    ] = await factoryContract.methods
        .getDeployedCampaigns()
        .call({ from: accounts[0] });

    //Create a portal to the deployed Campaign Contract
    campaignContract = await new web3.eth.Contract(
        JSON.parse(compiledCampaign.interface),
        campaignAddress
    );
});

describe("Campaign Factory Contract", function() {
    it("deploys a campaign factory contract", function() {
        assert.ok(factoryContract.options.address);
    });
});

describe("Campaign Contract", function() {
    it("deploys a campaign contract", function() {
        assert.ok(campaignContract.options.address);
    });

    it("marks caller as the campaign manager", async function() {
        const manager = await campaignContract.methods.manager().call();
        assert.equal(manager, accounts[0]);
    });

    it("allows people to donate and become approvers", async function() {
        await campaignContract.methods
            .contribute()
            .send({ from: accounts[1], value: "1000" });
        const isApprover = await campaignContract.methods
            .approvers(accounts[1])
            .call();
        assert.ok(isApprover);
    });

    it("requires a minimum contribution", async function() {
        try {
            await campaignContract.methods
                .contribute()
                .send({ from: accounts[0], value: "1" });
            assert(false);
        } catch (e) {
            assert(e);
        }
    });

    it("allows a manager to create a payment request", async function() {
        await campaignContract.methods
            .createRequest("OEM", "1000", accounts[1])
            .send({ from: accounts[0], gas: "1000000" });

        const request = await campaignContract.methods.requests(0).call();

        assert(request);
        assert.equal("OEM", request.description);
    });
});
