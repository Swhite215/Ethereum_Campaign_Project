import web3 from "./web3";
import compiledFactory from "./build/CampaignFactory";

const address = "0x7C7B0C41C4B3166c6eCE4F16239b17526bB79Dd0";

const campaignFactory = new web3.eth.Contract(
    JSON.parse(compiledFactory.interface),
    address
);

export default campaignFactory;
