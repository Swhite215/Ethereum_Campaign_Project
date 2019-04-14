import React, { Component } from "react";
import { Table, Button } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import campaignInstance from "../ethereum/campaign";

class RequestRow extends Component {
    constructor(props) {
        super(props);
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

        return (
            <React.Fragment>
                <Row>
                    <Cell>{id}</Cell>
                    <Cell>{description}</Cell>
                    <Cell>{web3.utils.fromWei(value, "ether")}</Cell>
                    <Cell>{recipient}</Cell>
                    <Cell>
                        {approvalCount}/{approversCount}
                    </Cell>
                    <Cell>
                        <Button color="green" basic>
                            Approve
                        </Button>
                    </Cell>
                    <Cell>
                        <Button>Finalize</Button>
                    </Cell>
                </Row>
            </React.Fragment>
        );
    }
}

export default RequestRow;
