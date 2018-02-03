import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {Row, Col, Grid, Button } from 'react-bootstrap';
import factory from '../../../api/ethereum/factory';


export default class Home extends Component {
    state = {}

    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }
    async componentDidMount() {
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        await this.setStateAsync({campaigns})
    }

    renderCampaigns() {
        if (this.state.campaigns) {
            const items = this.state.campaigns.map(address => {
                const path = `/campaign-details/${address}`;
                return (
                            <Row>
                                 <h4 className="menu-title font-alt">{address} <Link className="btn btn-success pull-right" to={path}>Details</Link></h4>
                            </Row>
                )
            });
            return (
                <section className="module">
                    <Grid>
                    {items}
                    </Grid>
                </section>
            )
        }
    }

    render() {
        return (
            <div className="main page-center">
                <section className="module">
                    <div className="container">
                        <div>
                            <p className="module-subtitle">Creates a campaign where investors will have to approve each expense before Campaign Manager can get access to the funds to be managed</p>
                        </div>
                        <div className="row">
                            <div className="col-sm-8 col-sm-offset-2">
                                <h2 className="module-title font-alt mb-0">Live Campaigns</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-2 col-sm-offset-8">
                                <Link className="btn btn-success pull-right" to="/new-campaign">Create New Campaign</Link>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="module">
                    <div className="container">
                        <div className="row multi-columns-row">
                            <div className="col-sm-8">
                                {this.renderCampaigns()}
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        );
    }
}