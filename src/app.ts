// 3RD PARTY MODULES
import express from 'express'
import bodyParser from 'body-parser'

// PROJECT MODULES
import todosRoutes from './routes/todos'

const app = express()

// MIDDLEWARE
app.use(bodyParser.json())

// ROUTES
app.use(todosRoutes)

const port = parseInt(process.env.PORT || '3000')

app.listen(port, () => console.log(`Listening on http://localhost:${port}`))
