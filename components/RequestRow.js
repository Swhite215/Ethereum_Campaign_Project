import React, { Component } from "react";
import { Table, Button } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import campaignInstance from "../ethereum/campaign";
import { Router } from "../routes";

class RequestRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            approveLoading: false
        };

        this.onApprove = this.onApprove.bind(this);
        this.onFinalize = this.onFinalize.bind(this);
    }

    async onApprove() {
        try {
            this.setState({ approveLoading: true });
            const accounts = await web3.eth.getAccounts();

            let campaign = campaignInstance(this.props.address);

            await campaign.methods
                .approveRequest(this.props.id)
                .send({ from: accounts[0] });
        } catch (e) {
            console.log(e);
        }

        this.setState({ approveLoading: false });

        Router.replaceRoute(`/campaigns/${this.props.address}/requests`);
    }

    async onFinalize() {
        try {
            this.setState({ finalizeLoading: true });
            const accounts = await web3.eth.getAccounts();

            let campaign = campaignInstance(this.props.address);

            await campaign.methods
                .finalizeRequest(this.props.id)
                .send({ from: accounts[0] });
        } catch (e) {
            console.log(e);
        }

        this.setState({ finalizeLoading: false });

        Router.replaceRoute(`/campaigns/${this.props.address}/requests`);
    }

    render() {
        const { Row, Cell } = Table;
        const {
            id,
            description,
            value,
            recipient,
            complete,
            approvalCount
        } = this.props.request;
        const { approversCount } = this.props;
        const readyToFinalize = approvalCount > approversCount / 2;

        return (
            <React.Fragment>
                <Row disabled={complete} positive={readyToFinalize}>
                    <Cell>{id}</Cell>
                    <Cell>{description}</Cell>
                    <Cell>{web3.utils.fromWei(value, "ether")}</Cell>
                    <Cell>{recipient}</Cell>
                    <Cell>
                        {approvalCount}/{approversCount}
                    </Cell>
                    <Cell>
                        {complete ? null : (
                            <Button
                                color="green"
                                basic
                                loading={this.state.approveLoading}
                                onClick={this.onApprove}
                            >
                                Approve
                            </Button>
                        )}
                    </Cell>
                    <Cell>
                        {complete ? null : (
                            <Button
                                color="teal"
                                basic
                                loading={this.state.finalizeLoading}
                                onClick={this.onFinalize}
                            >
                                Finalize
                            </Button>
                        )}
                    </Cell>
                </Row>
            </React.Fragment>
        );
    }
}

export default RequestRow;
