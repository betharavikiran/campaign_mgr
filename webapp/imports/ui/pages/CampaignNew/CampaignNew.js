
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Grid, Row, Col, FormGroup, FormControl, ControlLabel,HelpBlock, Button, InputGroup } from 'react-bootstrap';
import Loader from '../../components/Loader';
import factory from '../../../api/ethereum/factory';
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


class CampaignNew extends Component {
    state = {
        minimumContribution: 10000,
        errorMessage: '',
        loading: false
    };

    onSubmit = async event => {
        const { history } = this.props;
        event.preventDefault();
        this.setState({ loading: true, errorMessage: '' });

        try {
            const accounts = await web3.eth.getAccounts();
            await factory.methods
                .createCampaign(this.state.minimumContribution)
                .send({
                    from: accounts[0]
                });
            history.push('/');
        } catch (err) {
            this.setState({ errorMessage: err.message });
        }

        this.setState({ loading: false });
    };

    render() {

        if (this.state.loading) {
            return (
                <Loader/>
            );
        } else {
            return (
                <div className="page-center" >
                    <section className="module ">
                        <div className="container">
                            <div>
                                <p className="module-subtitle">Create a new Campaign</p>
                            </div>
                            <div className="row">
                                <div className="col-sm-8 col-sm-offset-2">
                                    <h2 className="module-title font-alt mb-0">Create a Campaign</h2>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-2 col-sm-offset-8">
                                    <Link className="btn btn-success pull-right" to="/">Campaigns</Link>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="module">
                        <div className="container">
                            <div className="row multi-columns-row">
                                <div className="col-sm-10">
                                    <form>
                                        <FieldGroup id="minmumContribution" label="Min Contribution(wei)" type="number"
                                                    value={this.state.minimumContribution} onChange={event =>
                                            this.setState({minimumContribution: event.target.value})}/>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <Button className="btn" type="submit" onClick={this.onSubmit}>Create</Button>
                                    </form>
                                    {this.state.errorMessage}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

            );
        }
    }
}

export default CampaignNew;
