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

    //Function is assigned to class, not instances
    static async getInitialProps() {
        const campaigns = await campaignFactory.methods
            .getDeployedCampaigns()
            .call();

        return { campaigns };
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

        return <div>{this.props.campaigns[0]}</div>;
    }
}

export default CampaignIndex;
