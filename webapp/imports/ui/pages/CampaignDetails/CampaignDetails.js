import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Grid, Row, Col, FormGroup, FormControl, ControlLabel,HelpBlock, Button, InputGroup } from 'react-bootstrap';
import Campaign from '../../../api/ethereum/campaign';
import web3 from '../../../api/ethereum/web3';
import factory from "../../../api/ethereum/factory";

class CampaignDetails extends Component {

   state = {
   }

    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }

    async componentDidMount() {
        const address = this.props.match.params.address;
        const campaign = Campaign(address);

        const summary = await campaign.methods.getSummary().call();

        const details = {
            address: address,
            minimumContribution: summary[0],
            balance: summary[1],
            requestsCount: summary[2],
            approversCount: summary[3],
            manager: summary[4]
        };

        await this.setStateAsync(details)
    }


    renderCards() {
        if (this.state.address) {
            const {
                balance,
                manager,
                minimumContribution,
                requestsCount,
                approversCount
            } = this.state;

            return (
                <section className="module">
                    <Grid>
                        <Row>
                            <Col>
                                <h2 className="module-subtitle font-alt">Address of Manager : {manager} </h2>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h2 className="module-subtitle font-alt">Minimum Contribution (wei) : {minimumContribution} </h2>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h2 className="module-subtitle font-alt">Number of Requests : {requestsCount} </h2>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h2 className="module-subtitle font-alt">Number of Approvers : {approversCount} </h2>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h2 className="module-subtitle font-alt">Campaign Balance (ether) : {web3.utils.fromWei(balance, 'ether')} </h2>
                            </Col>
                        </Row>
                    </Grid>
                </section>
            )
        }

    }

    render() {
        return (
            <div>
                <div className="main page-center">
                    <section className="module">
                        <div className="container">
                            <div>
                                <p className="module-subtitle">View Campaign and request for expenses.</p>
                            </div>
                            <div className="row">
                                <div className="col-sm-8 col-sm-offset-2">
                                    <h2 className="module-title font-alt mb-0">Campaign Details</h2>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-2 col-sm-offset-8">
                                    <Link className="btn btn-success pull-right" to="/">Back</Link>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="module">
                        <div className="container">
                            <div className="row multi-columns-row">
                                <Link to={`/campaign-details/${this.state.address}/request`}>Request to Spend</Link>
                            </div>
                            <div className="row multi-columns-row">
                                <div className="col-sm-8">
                                    {this.renderCards()}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

export default CampaignDetails;
