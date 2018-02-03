import React, { Component } from 'react';

export default class Loader extends Component {
    render(){
        return (<div className="main container page-center">
            <iframe src="loader.svg">
                Please waiting while transaction is being processed
            </iframe>
        </div>);
    }
}