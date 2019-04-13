import React from "react";
import { Menu } from "semantic-ui-react";

export default function Header() {
    return (
        <Menu>
            <Menu.Item name="Campaign">Campaign project</Menu.Item>

            <Menu.Menu position="right">
                <Menu.Item name="campaign">Campaigns</Menu.Item>
                <Menu.Item name="addCampaign">+</Menu.Item>
            </Menu.Menu>
        </Menu>
    );
}
