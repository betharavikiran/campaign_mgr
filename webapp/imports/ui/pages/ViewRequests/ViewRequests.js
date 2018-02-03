import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Grid, Row, Col, FormGroup, FormControl, ControlLabel,HelpBlock, Button, InputGroup, Table } from 'react-bootstrap';
import Campaign from '../../../api/ethereum/campaign';
import factory from "../../../api/ethereum/factory";

class ViewRequests extends Component {
    state = {}

    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }
    async componentDidMount() {
        const address = this.props.match.params.address;

        const campaign = Campaign(address);
        const requestCount = await campaign.methods.getRequestsCount().call();
        const approversCount = await campaign.methods.approversCount().call();

        const requests = await Promise.all(
            Array(parseInt(requestCount))
                .fill()
                .map((element, index) => {
                    return campaign.methods.requests(index).call();
                })
        );

        console.log(requests);
        console.log(requestCount);
        console.log(approversCount);


        await this.setStateAsync({address, requests, requestCount, approversCount})
    }


   renderRows() {
        if( this.state.requests){
            return this.state.requests.map((request, index) => {
                return (
                    <tr>
                        <td>{index}</td>
                        <td>{request[0]}</td>
                        <td>{request[1]}</td>
                        <td>{request[2]}</td>
                        <td>{request[3]}</td>
                        <td>{request[4]}</td>
                        <td>{request[5]}</td>
                        <td>{request.complete}</td>
                    </tr>
                );
            });
        }
    }

    render() {
        const address = this.props.match.params.address;
        const path = `/campaign-details/${address}/request/new`;

        if (this.state.loading) {
            return (
                <Loader/>
            );
        } else {

            return (
                <div className="main page-center">
                    <section className="module">
                        <div className="container">
                            <div>
                                <p className="module-subtitle">List of Spending Request and Submit New requests</p>
                            </div>
                            <div className="row">
                                <div className="col-sm-8 col-sm-offset-2">
                                    <h2 className="module-title font-alt mb-0">Spending Requests</h2>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-2 col-sm-offset-8">
                                    <Link className="btn btn-success pull-right"
                                          to={path}>Submit New Spending Request</Link>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="module">
                        <div className="container">
                            <div className="row multi-columns-row">
                                <div className="col-sm-8">
                                    <Table striped bordered condensed hover>
                                        <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Description</th>
                                            <th>Amount</th>
                                            <th>Recipient</th>
                                            <th>Approval Count</th>
                                            <th>Approve</th>
                                            <th>Finalize</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.renderRows()}
                                        </tbody>
                                    </Table>;
                                    {this.state.errorMessage}
                                </div>
                            </div>
                            <div className="row multi-columns-row">
                                Found {this.state.requestCount} requests.
                            </div>
                        </div>
                    </section>
                </div>
            );
        }
    }
}

export default ViewRequests;
