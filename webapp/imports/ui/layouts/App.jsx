import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';


import Header from './Header';
import Footer from './Footer';

import Home from './../pages/home/Home';
import CampaignNew from "../pages/CampaignNew/CampaignNew";
import CampaignDetails from '../pages/CampaignDetails/CampaignDetails';
import ViewRequests from '../pages/ViewRequests/ViewRequests';
import NewRequests from '../pages/NewRequest/NewRequest';

import './app.css';

const App = props => (
    <Router>
            <div className="App">
                <Grid>
                    <Row>
                        <Col md={8} mdOffset={2}>
                            <Switch>
                                <Route exact path="/" component={Home}/>
                                <Route exact path="/new-campaign" component={CampaignNew}/>
                                <Route exact path="/campaign-details/:address" component={CampaignDetails}/>
                                <Route exact path="/campaign-details/:address/request" component={ViewRequests}/>
                                <Route exact path="/campaign-details/:address/request/new" component={NewRequests}/>
                            </Switch>
                        </Col>
                    </Row>
                </Grid>
                <Footer />
            </div>
    </Router>
);

export default  App;