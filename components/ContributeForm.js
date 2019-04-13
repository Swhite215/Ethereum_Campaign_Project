import React, { Component } from "react";
import { Form, Input, Message, Button } from "semantic-ui-react";

class ContributeForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false
        };
    }
    render() {
        return (
            <Form>
                <Form.Field>
                    <label>Amount to Contribute</label>
                    <Input label="ether" labelPosition="right" />
                </Form.Field>
                <Button primary>Contribute!</Button>
            </Form>
        );
    }
}

export default ContributeForm;
