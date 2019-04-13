import React from "react";
import campaignFactory from "../ethereum/campaignFactory";
import web3 from "../ethereum/web3";

class CampaignIndex extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message: "Hello"
        };
    }

    async componentDidMount() {
        const campaigns = await campaignFactory.methods
            .getDeployedCampaigns()
            .call();

        console.log(campaigns);
    }

    render() {
        // window.addEventListener("load", async () => {
        //     if (window.ethereum) {
        //         try {
        //             await window.ethereum.enable();
        //         } catch (e) {
        //             //User denied account access
        //         }
        //     }
        // });

        return <h1>This is the root app!</h1>;
    }
}

export default CampaignIndex;
