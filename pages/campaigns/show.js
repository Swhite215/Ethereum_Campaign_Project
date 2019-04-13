import React, { Component } from "react";
import Layout from "../../components/Layout";
import campaignInstance from "../../ethereum/campaign";
import { Card, Grid, Button } from "semantic-ui-react";
import ContributeForm from "../../components/ContributeForm";
import web3 from "../../ethereum/web3";
import { Link } from "../../routes";

class CampaignShow extends Component {
    constructor(props) {
        super(props);

        this.renderCards = this.renderCards.bind(this);
    }

    static async getInitialProps(props) {
        let campaign = campaignInstance(props.query.address);
        let summary = await campaign.methods.getSummary().call();

        //Translate summary values to usable props
        return {
            minimumContribution: summary[0],
            balance: summary[1],
            requestsCount: summary[2],
            approversCount: summary[3],
            manager: summary[4],
            address: props.query.address
        };
    }

    renderCards() {
        const {
            minimumContribution,
            balance,
            requestsCount,
            approversCount,
            manager
        } = this.props;

        const items = [
            {
                header: manager,
                meta: "Address of Manager",
                description:
                    "The manager who created this campaign and can create requests to withdraw money.",
                style: { overflowWrap: "break-word" }
            },
            {
                header: minimumContribution,
                meta: "Minimum Contribution in Wei",
                description:
                    "The minimum amount needed to be an approver of this campaign.",
                style: { overflowWrap: "break-word" }
            },
            {
                header: web3.utils.fromWei(balance, "ether"),
                meta: "Campaign's current balance (ether)",
                description: "The current collected money for this campaign.",
                style: { overflowWrap: "break-word" }
            },
            {
                header: requestsCount,
                meta: "Number of Requests",
                description:
                    "This is the number of requests made by this campaign.",
                style: { overflowWrap: "break-word" }
            },
            {
                header: approversCount,
                meta: "Number of Contributors",
                description:
                    "The current number of people who have contributed to this campaign.",
                style: { overflowWrap: "break-word" }
            }
        ];

        return <Card.Group items={items} />;
    }

    render() {
        return (
            <Layout>
                <h3>Campaign Shows</h3>
                <Grid>
                    <Grid.Column width={10}>
                        {this.renderCards()}

                        <Link
                            route={`/campaigns/${this.props.address}/requests}`}
                        >
                            <a>
                                <Button primary>View Requests</Button>
                            </a>
                        </Link>
                    </Grid.Column>

                    <Grid.Column width={6}>
                        <ContributeForm address={this.props.address} />
                    </Grid.Column>
                </Grid>
            </Layout>
        );
    }
}

export default CampaignShow;
