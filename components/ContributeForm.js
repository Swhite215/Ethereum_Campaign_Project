import React, { Component } from "react";
import { Form, Input, Message, Button } from "semantic-ui-react";
import campaignInstance from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import { Router } from "../routes";

class ContributeForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            value: "",
            errorMessage: ""
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ value: e.target.value });
    }

    async onSubmit(e) {
        e.preventDefault();

        this.setState({
            loading: true,
            errorMessage: ""
        });

        let campaign = campaignInstance(this.props.address);

        try {
            let accounts = await web3.eth.getAccounts();

            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value, "ether")
            });

            Router.replaceRoute(`/campaigns/${this.props.address}`);
        } catch (e) {
            this.setState({
                errorMessage: e.message
            });
        }

        this.setState({
            loading: false,
            value: ""
        });
    }

    render() {
        return (
            <Form error={!!this.state.errorMessage} onSubmit={this.onSubmit}>
                <Form.Field>
                    <label>Amount to Contribute</label>
                    <Input
                        value={this.state.value}
                        label="ether"
                        labelPosition="right"
                        onChange={this.onChange}
                    />
                </Form.Field>
                <Button primary loading={this.state.loading}>
                    Contribute!
                </Button>

                <Message
                    error
                    header="Oops!"
                    content={this.state.errorMessage}
                />
            </Form>
        );
    }
}

export default ContributeForm;
