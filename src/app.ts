// 3RD PARTY MODULES
import express from 'express'
import bodyParser from 'body-parser'

// PROJECT MODULES
import todosRoutes from './routes/todos'

const app = express()

app.use(bodyParser.json())

app.use(todosRoutes)

app.listen(process.env.PORT || 3000, () =>
  console.log(`Listening on http://localhost:${process.env.PORT || 3000}`)
)
