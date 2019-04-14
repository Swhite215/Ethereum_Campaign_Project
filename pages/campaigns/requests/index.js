import React, { Component } from "react";
import Layout from "../../../components/Layout";
import { Button, Table } from "semantic-ui-react";
import { Link } from "../../../routes";
import campaignInstance from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";
import RequestRow from "../../../components/RequestRow";

class RequestIndex extends Component {
    static async getInitialProps(props) {
        const { address } = props.query;

        try {
            let accounts = await web3.eth.getAccounts();

            let campaign = campaignInstance(address);

            let requestCount = await campaign.methods.getRequestsCount().call();

            let approversCount = await campaign.methods.approversCount().call();

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
                requestCount,
                approversCount
            };
        } catch (e) {
            console.log(e);
        }
    }

    renderRows() {
        return this.props.requests.map((request, index) => {
            return (
                <RequestRow
                    request={request}
                    key={index}
                    address={this.props.address}
                    id={index}
                    approversCount={this.props.approversCount}
                />
            );
        });
    }

    render() {
        const { Header, Row, HeaderCell, Body } = Table;
        return (
            <Layout>
                <h3>Request List</h3>
                <Link route={`/campaigns/${this.props.address}/requests/new`}>
                    <a>
                        <Button primary>Add Request</Button>
                    </a>
                </Link>
                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>Description</HeaderCell>
                            <HeaderCell>Amount</HeaderCell>
                            <HeaderCell>Recipient</HeaderCell>
                            <HeaderCell>Approval Count</HeaderCell>
                            <HeaderCell>Approve</HeaderCell>
                            <HeaderCell>Finalize</HeaderCell>
                        </Row>
                    </Header>
                    <Body>{this.renderRows()}</Body>
                </Table>
            </Layout>
        );
    }
}

export default RequestIndex;
