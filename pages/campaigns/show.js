import React, { Component } from "react";
import Layout from "../../components/Layout";
import campaignInstance from "../../ethereum/campaign";

class CampaignShow extends Component {
    static async getInitialProps(props) {
        let campaign = campaignInstance(props.query.address);
        let summary = await campaign.methods.getSummary().call();

        //Translate summary values to usable props
        return {
            minimumContribution: summary[0],
            balance: summary[1],
            requestsCount: summary[2],
            approversCount: summary[3],
            manager: summary[4]
        };
    }

    render() {
        return (
            <Layout>
                <h3>Campaign Shows</h3>
            </Layout>
        );
    }
}

export default CampaignShow;
