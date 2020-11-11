import React, { Component } from 'react'
import request from 'superagent';

export default class Signup extends Component {
    state = {
        email: '',
        password: '',
        loading: false,
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        this.setState({ loading: true })
        const user = await request
            .post('https://gentle-inlet-53744.herokuapp.com/auth/signup')
            .send(this.state);

        this.setState({ loading: false })

        this.props.changeTokenAndUsername(user.body.email, user.body.token)

        this.props.history.push('/todo');
    }

    render() {
        return (
            <div>
                <h2>Sign up</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Email:
                        <input onChange={(e) => this.setState({ email: e.target.value })}
                        value={this.state.email} />
                    </label>
                    <label>
                        Password:
                        <input
                        onChange={(e) => this.setState({ password: e.target.value })}
                        value={this.state.password} type="password"/>
                    </label>
                    {
                        this.state.loading
                        ? 'Loading..'
                        : <button>
                            Sign up!
                        </button>
                    }
                </form>
            </div>
        )
    }
}