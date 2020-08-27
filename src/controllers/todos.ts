// 3RD PARTY MODULES
import { RequestHandler } from 'express'

// PROJECT TYPES & INTERFACES
import { Todo } from '../models/todo'

type RequestBody = { text: string }
type RequestParams = { todoId: string }

let todos: Todo[] = []

const getTodos: RequestHandler = (req, res, next) => {
  res.status(200).json({ todos })
}

const createTodo: RequestHandler = (req, res, next) => {
  const { text } = req.body as RequestBody

  const newTodo: Todo = {
    id: new Date().toISOString(),
    text,
  }

  todos.unshift(newTodo)

  res.status(201).json({ message: 'Todo added.', todos })
}

const updateTodo: RequestHandler = (req, res, next) => {
  const { text } = req.body as RequestBody
  const { todoId } = req.params as RequestParams
  const todoIndex = todos.findIndex((todo) => todo.id === todoId)

  if (todoIndex < 0) {
    return res.status(404).json({ message: 'No todo found with this ID.' })
  }

  todos[todoIndex] = {
    id: todos[todoIndex].id,
    text,
  }

  res.status(200).json({ message: 'Todo updated.', todos })
}

const deleteTodo: RequestHandler = (req, res, next) => {
  const { todoId } = req.params as RequestParams

  todos = todos.filter((todo) => todo.id !== todoId)

  res.status(200).json({ message: 'Todo deleted.', todos })
}

export default { getTodos, createTodo, updateTodo, deleteTodo }
