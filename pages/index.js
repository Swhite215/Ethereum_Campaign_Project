import React from "react";
import campaignFactory from "../ethereum/campaignFactory";
import web3 from "../ethereum/web3";
import { Card, Button } from "semantic-ui-react";
import Layout from "../components/Layout";
import { Link } from "../routes";

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
                description: (
                    <Link route={`/campaigns/${campaign}`}>
                        <a>View Campaign</a>
                    </Link>
                ),
                fluid: true
            };
        });

        return <Card.Group items={items} />;
    }

    componentDidMount() {
        window.addEventListener("load", async () => {
            if (window.ethereum) {
                try {
                    await window.ethereum.enable();
                } catch (e) {
                    //User denied account access
                }
            }
        });
    }

    render() {
        return (
            <Layout>
                <h3>Active Campaigns</h3>
                <Link route="/campaigns/new">
                    <a>
                        {" "}
                        <Button
                            floated="right"
                            content="Create a Campaign"
                            icon="add circle"
                            primary
                        />
                    </a>
                </Link>
                {this.renderCampaigns()}
            </Layout>
        );
    }
}

export default CampaignIndex;
