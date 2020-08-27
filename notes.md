# TypeScript Project Checklist

## NodeJS And Express

### Initialising Project

1. `$ npm init`
2. `$ tsc --init`
3. `$ git init`
4. `$ code .gitignore`
5. `$ mkdir src`
6. `$ mkdir src/controllers`
7. `$ mkdir src/models`
8. `$ mkdir src/routes`
9. `$ npm i express body-parser`
10. `$ npm i -D @types/express @types/body-parser @types/node nodemon`
11. If environment variables are required `$ touch nodemon.json`

#### package.json

Set up `scripts` as desired:

```json
"scripts": {
  "build": "tsc",
  "watch": "tsc --watch",
  "dev": "nodemon dist/app.js",
  "start": "node dist/app.js"
},
```

#### tsconfig.json

Configure compiler options:

- Make sure to enable `"moduleResolution": "node"`
- Setup `rootDir` and `outDir`
- Change `target` if desired

```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "moduleResolution": "node",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

By default, TypeScript is set up for web apps running in the browser, and therefore it does not expect the `require` syntax that is used for modules in NodeJS. By configuring `moduleResolution`, ES6 `import` / `export` syntax can be used, and file extensions can be omitted. TypesScript will now understand import statements, and as a result will correctly import types as well. Ultimately, this is still compiled to the NodeJS native `require` syntax.

#### .gitignore

Set up `.gitignore` as desired:

```
# GENERATED
node_modules
dist

# LOGS
logs
*.log

# PRIVATE
nodemon.json
.env
.env.test
.DS_Store
```

#### nodemon.json

Configure any environment variables:

```json
{
  "env": {
    "USER": "username",
    "PORT": "3000",
    "ETC": "etc"
  }
}
```

### src/app.ts

Using ES6 `import` / `export` syntax, but much the same as a regular JS `app.js` file:

```ts
// 3RD PARTY MODULES
import express from 'express'
import bodyParser from 'body-parser'

// PROJECT MODULES
import someRoutes from './routes/someRoutes'

const app = express()

app.use(bodyParser.json())

app.use(someRoutes)

app.listen(process.env.PORT || 3000, () =>
  console.log(`Listening on http://localhost:${process.env.PORT || 3000}`)
)
```

### src/controllers/todos.ts

Setup is very similar to traditional JS projects again — with the exception of ES6 `import` / `export` syntax, and managing types within controllers.

#### Example

- `RequestHandler` type imported from express
- `Todo` type imported from `./src/models/todo.ts`
- Two custom object types are defined for use throughout the file, `RequestBody` and `RequestParams`
- `createTodo` handler is typed as `RequestHandler`, enabling intellisense on the base parameters
- By type casting `req.body`, intellisense will know that `text` can only be a `string`
- Other controllers that use `req.params` are handled in the same manner

Without type casting, TypeScript will set `req.body` and `req.params` to type `any`. Manual type casting gives better intellisense, and strong type safety.

```ts
// 3RD PARTY MODULES
import { RequestHandler } from 'express'

// PROJECT TYPES & INTERFACES
import { Todo } from '../models/todo'

type RequestBody = { text: string }
type RequestParams = { todoId: string }

let todos: Todo[] = []

const createTodo: RequestHandler = (req, res, next) => {
  const { text } = req.body as RequestBody

  const newTodo: Todo = {
    id: new Date().toISOString(),
    text,
  }

  todos.unshift(newTodo)

  res.status(201).json({ message: 'Todo added.', todos })
}
```
