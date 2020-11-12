import React, { Component } from 'react'
import request from 'superagent';

export default class Login extends Component {
    state= {
        username: '',
        email: '',
        password: '',
        loading: false,
    }

    handleSubmit = async (e) => {
        e.preventDefault()

        this.setState({ loading: true })
        const user = await request
        .post('https://gentle-inlet-53744.herokuapp.com/auth/signin')
        .send(this.state);

        this.setState({ loading: false })

        this.props.changeTokenAndUsername(user.body.username, user.body.email, user.body.token);

        this.props.history.push('/todo');
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h2>Log in</h2>
                    <label>
                        <p className="username">Username: </p>
                        <input onChange={(e) => this.setState({ username: e.target.value })}
                        value={this.state.username} />
                    </label>
                    <label>
                        <p className="email">Email: </p>
                        <input
                        onChange={(e) => this.setState({ email: e.target.value })}
                        value={this.state.email} />
                    </label>
                    <label>
                        <p className="password">Password: </p>
                        <input
                        onChange={(e) => this.setState({ password: e.target.value })}
                        value={this.state.password} type="password" />
                    </label>
                    <br />
                    {
                        this.state.loading
                        ? 'Loading...'
                        : <button>
                            Log in!
                        </button>
                    }
                </form>
            </div>
        )
    }
}