import React, { Component } from "react";
import Layout from "../../components/Layout";
import { Form, Button, Input } from "semantic-ui-react";

export class CampaignNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            minimumContribution: ""
        };

        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({
            minimumContribution: e.target.value
        });
    }

    render() {
        return (
            <Layout>
                <h3>New Campaign</h3>
                <Form>
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
