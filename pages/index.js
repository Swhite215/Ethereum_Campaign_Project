import React from "react";
import campaignFactory from "../ethereum/campaignFactory";
import web3 from "../ethereum/web3";
import { Card, Button } from "semantic-ui-react";
import Layout from "../components/Layout";

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

    renderCampaigns() {
        const items = this.props.campaigns.map(campaign => {
            return {
                header: campaign,
                description: <a>View Campaign</a>,
                fluid: true
            };
        });

        return <Card.Group items={items} />;
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

        return (
            <Layout>
                <link
                    rel="stylesheet"
                    href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
                />
                <h3>Active Campaigns</h3>
                <Button
                    floated="right"
                    content="Create a Campaign"
                    icon="add circle"
                    primary
                />
                {this.renderCampaigns()}
            </Layout>
        );
    }
}

export default CampaignIndex;
