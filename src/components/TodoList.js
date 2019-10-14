import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchTodos, toggleTodo, deleteTodo} from '../reducers/Todo'

export const TodoItem = ({id, name, isComplete, toggleTodo,deleteTodo}) => (
    <li>
        <span>
            <button className='delete-item' onClick={() => deleteTodo(id)}>X</button>
        </span>
        <input type = "checkbox" checked={isComplete} 
        onChange={() => toggleTodo(id)}/> {name}
    </li>
)

class TodoList extends Component {
    componentDidMount() {
        this.props.fetchTodos()
    }

    render(){
        return (
        <ul>
            {this.props.todos.map(todo => 
            <TodoItem 
            key={todo.id}  
            toggleTodo={this.props.toggleTodo}
            deleteTodo={this.props.deleteTodo}
            {...todo}></TodoItem>)}
        </ul>
        )
    }
}
    


export default connect(
    (state) => ({todos: state.todo.todos}),
    {fetchTodos, toggleTodo, deleteTodo}
)(TodoList)