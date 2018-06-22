import React from 'react';
import LoginForm from './LoginForm';

export default class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: this.props.session.accessToken ? true: false
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.session.accessToken) {
            console.log('updating');
            this.setState({ loggedIn: this.props.session.accessToken ? true : false })
        }
    }

    render() {
        if (this.state.loggedIn) {
            return (
                <div>{this.props.children}</div>
            );
        }
        else {
            return <LoginForm authUrl={this.props.authUrl}/>
        }
    }
}