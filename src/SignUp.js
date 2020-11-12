import React, { Component } from 'react'
import request from 'superagent';

export default class Signup extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        loading: false,
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        try {

        this.setState({ loading: true })
        const user = await request
            .post('https://gentle-inlet-53744.herokuapp.com/auth/signup')
            .send(this.state);

        this.setState({ loading: false })

        this.props.changeTokenAndUsername(user.body.username, user.body.email, user.body.token)

        this.props.history.push('/todo');

        } catch (e) {
            alert(e.response.body.error)

            this.setState({ loading: false })
        }
    }

    render() {
        return (
            <div>
                <h2 className="signup-header">Sign up</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <p className="username">Username: </p>
                        <input onChange={(e) => this.setState({ username: e.target.value })}
                        value={this.state.username} />
                    </label>
                    <label>
                        <p className="email">Email: </p>
                        <input onChange={(e) => this.setState({ email: e.target.value })}
                        value={this.state.email} />
                    </label>
                    <label>
                        <p className="password">Password: </p>
                        <input
                        onChange={(e) => this.setState({ password: e.target.value })}
                        value={this.state.password} type="password"/>
                    </label>
                    <br />
                    {
                        this.state.loading
                        ? 'Loading...'
                        : <button>
                            Sign up!
                        </button>
                    }
                </form>
            </div>
        )
    }
}