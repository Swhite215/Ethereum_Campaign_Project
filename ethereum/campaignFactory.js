import web3 from "./web3";
import compiledFactory from "./build/CampaignFactory";

const address = "0x36c6A6Df7DaF6e0291272212d44a740Aa77885D9";

const campaignFactory = new web3.eth.Contract(
    JSON.parse(compiledFactory.interface),
    address
);

export default campaignFactory;
