export const getTodos = () => {
    return fetch('http://localhost:8085/todos').then(res => res.json())
}

export const createTodos = (name) => {
    return fetch('http://localhost:8085/todos', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name:name, isComplete:false})
    }).then(res => res.json())
}

export const updateTodos = (todo) => {
    return fetch(`http://localhost:8085/todos/${todo.id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    }).then(res => res.json())
}

export const deleteTodos = (id) => {
    return fetch(`http://localhost:8085/todos/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
}

