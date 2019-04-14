import React, { Component } from "react";
import Layout from "../../../components/Layout";
import { Button } from "semantic-ui-react";
import { Link } from "../../../routes";
import campaignInstance from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";

class RequestIndex extends Component {
    static async getInitialProps(props) {
        const { address } = props.query;

        try {
            let accounts = await web3.eth.getAccounts();

            let campaign = campaignInstance(address);

            let requestCount = await campaign.methods.getRequestsCount().call();

            const requests = await Promise.all(
                Array(parseInt(requestCount))
                    .fill()
                    .map((element, index) => {
                        return campaign.methods.requests(index).call();
                    })
            );

            return {
                address,
                requests,
                requestCount
            };
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <Layout>
                <h3>Request List</h3>
                <Link route={`/campaigns/${this.props.address}/requests/new`}>
                    <a>
                        <Button primary>Add Request</Button>
                    </a>
                </Link>
            </Layout>
        );
    }
}

export default RequestIndex;
