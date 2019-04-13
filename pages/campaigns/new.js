import React, { Component } from "react";
import Layout from "../../components/Layout";
import { Form, Button, Input, Message } from "semantic-ui-react";
import factoryContract from "../../ethereum/campaignFactory";
import web3 from "../../ethereum/web3";

export class CampaignNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            minimumContribution: "",
            errorMessage: ""
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({
            minimumContribution: e.target.value
        });
    }

    async onSubmit(e) {
        e.preventDefault();

        try {
            await window.ethereum.enable();

            const accounts = await web3.eth.getAccounts();

            console.log(accounts);

            await factoryContract.methods
                .createCampaign(this.state.minimumContribution)
                .send({ from: accounts[0] });
        } catch (e) {
            console.log(e);
            this.setState({
                errorMessage: e.message
            });
        }
    }

    render() {
        return (
            <Layout>
                <h3>New Campaign</h3>
                <Form onSubmit={this.onSubmit}>
                    <Form.Field>
                        <label>Minimum Contribution</label>
                        <Input
                            value={this.state.minimumContribution}
                            label="wei"
                            type="text"
                            labelPosition="right"
                            onChange={this.onChange}
                        />
                    </Form.Field>
                    <Button primary>Create</Button>
                </Form>
            </Layout>
        );
    }
}

export default CampaignNew;
