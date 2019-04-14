import React, { Component } from "react";
import web3 from "../../../ethereum/web3";
import { Form, Button, Message, Input } from "semantic-ui-react";
import campaignInstance from "../../../ethereum/campaign";
import { Link, Router } from "../../../routes";
import Layout from "../../../components/Layout";

class RequestNew extends Component {
    static async getInitialProps(props) {
        const { address } = props.query;
        return { address };
    }

    constructor(props) {
        super(props);

        this.state = {
            value: "",
            description: "",
            recipient: "",
            errorMessage: "",
            loading: false
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    async onSubmit(e) {
        e.preventDefault();

        this.setState({ loading: true });

        const { description, value, recipient } = this.state;

        try {
            let accounts = await web3.eth.getAccounts();

            const campaign = campaignInstance(this.props.address);

            await campaign.methods
                .createRequest(
                    description,
                    web3.utils.toWei(value, "ether"),
                    recipient
                )
                .send({ from: accounts[0] });

            Router.pushRoute(`/campaigns/${this.props.address}/requests`);
        } catch (e) {
            this.setState({ errorMessage: e.message });
        }

        this.setState({
            loading: false,
            description: "",
            value: "",
            recipient: ""
        });
    }

    render() {
        return (
            <Layout>
                <Link route={`/campaigns/${this.props.address}/requests`}>
                    <a>Back</a>
                </Link>
                <Form
                    onSubmit={this.onSubmit}
                    error={!!this.state.errorMessage}
                >
                    <h3>Create a Spending Request</h3>
                    <Form.Field>
                        <label>Description</label>
                        <Input
                            name="description"
                            value={this.state.description}
                            onChange={this.onChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Value in Ether</label>
                        <Input
                            name="value"
                            value={this.state.value}
                            onChange={this.onChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Recipient</label>
                        <Input
                            name="recipient"
                            value={this.state.recipient}
                            onChange={this.onChange}
                        />
                    </Form.Field>
                    <Button loading={this.state.loading} primary>
                        Add Request
                    </Button>
                    <Message
                        error
                        header="Oops!"
                        content={this.state.errorMessage}
                    />
                </Form>
            </Layout>
        );
    }
}

export default RequestNew;
