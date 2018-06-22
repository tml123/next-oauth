import React, { Component } from 'react';
import 'isomorphic-unfetch';
import Layout from '../components/layout';

export default class Index extends Component {
    static async getInitialProps({ req, query }) {
        const { authUrl, session } = req;
        console.log('hi there');
        console.log(session.userName);
        return { authUrl, session }
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
        <Layout session={this.props.session} authUrl={this.props.authUrl}>
            <div>
                <p>Dashboard for {this.props.session.userName}!</p>
            </div>
        </Layout>
        );
    }
}