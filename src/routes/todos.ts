// 3RD PARTY MODULES
import { Router } from 'express'

// PROJECT MODULES
import todosController from '../controllers/todos'

const router = Router()

router.get('/', todosController.getTodos)

router.post('/todo', todosController.createTodo)

router.put('/todo/:todoId', todosController.updateTodo)

router.delete('/todo/:todoId', todosController.deleteTodo)

export default router
