import React, { Component } from 'react'
import request from 'superagent';
import { deleteCompletes } from './deleteTodo.js'

export default class Todo extends Component {
    state = {
        todos: [],
        todo: '',
        completed: false,
        loading: false
    }

    componentDidMount = async () => {
        await this.fetchTodos()
    }

    fetchTodos = async () => {
        const { token } = this.props;

        await this.setState({ loading: true });
        const response = await request
        .get('https://gentle-inlet-53744.herokuapp.com/api/todo')
        .set('Authorization', token)

        await this.setState({ todos: response.body, loading: false })
    }

    handleSubmit = async (e) => {
        let { completed, todo } = this.state;
        const { token } = this.props;

        e.preventDefault();

        const newTodo = {
            todo: todo,
            completed: completed,
        };

        await this.setState({ loading: true });

        await request
        .post('https://gentle-inlet-53744.herokuapp.com/api/todo')
        .send(newTodo)
        .set('Authorization', token);

        await this.fetchTodos();

        await this.setState({ todo: '' });

    }

    handleCompletedClick = async (someId) => {
        const { token } = this.props;

        await request
        .put(`https://gentle-inlet-53744.herokuapp.com/api/todo/${someId}`)
        .set('Authorization', token);

        await this.fetchTodos();
    }

    handleClear = async (e) => {
        this.state.todos.forEach( (todo) => {
            if (todo.completed === true) {
                deleteCompletes(this.props.token, todo.id)
            }   
        })
        await this.fetchTodos();
    }

    render() {
        const {
            todo,
            loading,
            todos
        } = this.state;

        return (
            <div>
                <h3>Welcome to To-Do!</h3>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <p className="add-todo">Add To-Do: </p>
                        <input className="todo-input"
                        value={todo}
                        onChange={(e) => this.setState({ todo: e.target.value })}
                        />
                    </label>
                    <br />
                    <button>
                        Add To-Do
                    </button>
                </form>
                <div className="todos-list">
                {
                    loading
                    ? 'LOADING'
                    : todos.map(todo => <div className="todos" key={`${todo.todo}${todo.id}${Math.random()}`} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }
                    }>
                    {todo.todo}
                    <br />
                    {
                        todo.completed ? '' : <button className="completed" onClick={() => this.handleCompletedClick(todo.id)}>
                        Completed
                        </button>
                    }
                    </div>)
                }
                </div>
                <button className="clear"onClick={this.handleClear}>Clear Completes</button>
            </div>
        )
    }
}