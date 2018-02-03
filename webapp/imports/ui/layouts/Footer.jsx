import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {Row, Col, Grid } from 'react-bootstrap';

class Footer extends Component {
    render(){
        return (
            <section className="p-b-55 p-t-75 xs-p-b-20 bg-master-darker ">
                <div className="container">
                    <div className="row">
                        <Grid>
                            <Row className="show-grid">
                                Footer 2018
                            </Row>
                        </Grid>
                    </div>
                </div>
            </section>
        );
    }
}

export default withRouter(Footer);

