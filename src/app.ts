import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { UserRouter } from './app/modules/user/user.route'

const app: Application = express()

//parser
app.use(express.json())
app.use(cors())

//aplication router
app.use('/api/users', UserRouter)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World! working')
})

export default app
