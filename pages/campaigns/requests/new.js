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
            recipient: ""
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit(e) {}

    render() {
        return (
            <Layout>
                <Form>
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
                    <Button primary>Add Request</Button>
                </Form>
            </Layout>
        );
    }
}

export default RequestNew;
