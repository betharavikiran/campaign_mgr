import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Grid, Row, Col, FormGroup, FormControl, ControlLabel,HelpBlock, Button, InputGroup, Table } from 'react-bootstrap';
import Loader from '../../components/Loader';
import Campaign from '../../../api/ethereum/campaign';
import web3 from '../../../api/ethereum/web3';

function FieldGroup({ id, label, help, ...props }) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}

class RequestNew extends Component {
    state = {
        value: '10000',
        description: '',
        recipient: '0xd0B9c40083EE6524001Cc16426e776A6e23cCE8c',
        loading: false,
        errorMessage: ''
    };


    onSubmit = async event => {
        const {history} = this.props;

        event.preventDefault();
        const address = this.props.match.params.address;
        const campaign = Campaign(address);
        const {description, value, recipient} = this.state;

        this.setState({loading: true, errorMessage: ''});

        try {
            const accounts = await web3.eth.getAccounts();
            console.log(accounts)
            await campaign.methods
                .createRequest(description, web3.utils.toWei(value, 'ether'), recipient)
                .send({from: accounts[0]});

            history.push(`/campaign-details/${address}/request`);
        } catch (err) {
            this.setState({errorMessage: err.message});
        }

        this.setState({loading: false});
    };

    render() {
        const address = this.props.match.params.address;
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
                                <p className="module-subtitle">Submit New requests</p>
                            </div>
                            <div className="row">
                                <div className="col-sm-8 col-sm-offset-2">
                                    <h2 className="module-title font-alt mb-0">New Spending Request</h2>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-2 col-sm-offset-8">
                                    <Link className="btn btn-success pull-right"
                                          to={`/`}>Home</Link>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="module">
                        <div className="container">
                            <Grid>
                                <Row className="multi-columns-row">
                                    <Col sm={10}>
                                        <form>
                                            <FieldGroup id="description" label="Description" type="text"
                                                        value={this.state.description}
                                                        onChange={event =>
                                                            this.setState({description: event.target.value})}/>
                                            <FieldGroup id="value" label="Value in Ether" type="number"
                                                        value={this.state.value}
                                                        onChange={event =>
                                                            this.setState({value: event.target.value})}/>
                                            <FieldGroup id="recipient" label="Recipient" type="text"
                                                        value={this.state.recipient}
                                                        onChange={event =>
                                                            this.setState({recipient: event.target.value})}/>
                                            <br/>
                                            <label>Hard coded the recipient for now</label>
                                            <br/>
                                            <br/>
                                            <br/>
                                            <Button type="submit" onClick={this.onSubmit}>Create</Button>
                                        </form>
                                        {this.state.errorMessage}
                                    </Col>
                                </Row>
                            </Grid>
                        </div>
                    </section>
                </div>
            );
        }
    }
}

export default RequestNew;
