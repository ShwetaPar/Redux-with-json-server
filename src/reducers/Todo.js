import {getTodos, createTodos, updateTodos, deleteTodos} from '../lib/todoServices'
import {showMessage} from './Messages'

const initialState = {
    todos: [],
    currentTodo: ''
}

const CURRENT_UPDATE = 'CURRENT_UPDATE'
const TODO_ADD = 'TODO_ADD'
const TODOS_LOAD = 'TODOS_LOAD'
const TODO_REPLACE = 'TODO_REPLACE'
const TODO_REMOVE = 'TODO_REMOVE'

export const updateCurrent = (val) => ({type:CURRENT_UPDATE, payload: val})
export const loadTodos = (todos) => ({type:TODOS_LOAD, payload: todos})
export const addTodo = (todo) => ({type:TODO_ADD, payload:todo})
export const replaceTodo = (todo) => ({type:TODO_REPLACE, payload:todo})
export const removeTodo = (id) => ({type:TODO_REMOVE, payload:id})

export const fetchTodos = () => {
    return (dispatch) => {
        getTodos().then(todos => dispatch(loadTodos(todos)))
    }
}

export const saveTodo = (name) => {
    return(dispatch) => {
        // dispatch(showMessage)
        createTodos(name).then(res => dispatch(addTodo(res)))
    }
}

export const toggleTodo = (id) => {
    return(dispatch, getState) => {
        // dispatch(showMessage('Saving todo update'))
        const {todos} = getState().todo
        const todo = todos.find(t => t.id === id)
        const toggled = {...todo, isComplete: !todo.isComplete}
        updateTodos(toggled).then(res=> dispatch(replaceTodo(res)))
    }
}

export const deleteTodo = (id) => {
    return(dispatch) => {
        deleteTodos(id).then(() => dispatch(removeTodo(id)))
    }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case TODO_ADD:
            return {...state, todos: state.todos.concat(action.payload)}
        case CURRENT_UPDATE:
            return {...state, currentTodo:action.payload}
        case TODOS_LOAD:
            return {...state, todos: action.payload}
        case TODO_REPLACE:
            return {...state, todos: state.todos.map(t=> t.id === action.payload.id ? action.payload : t)}
        case TODO_REMOVE:
            return {...state, todos:state.todos.filter(t=> t.id !== action.payload)}
        default:
            return state
    }
}