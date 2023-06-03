import express, { Application, Request, Response } from 'express'
import cors from 'cors'
const app: Application = express()

// import { createUser } from './app/modules/users/user.service'
import router from './app/modules/users/user.route'

app.use(cors())
//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/users', router)

app.get('/', async (req: Request, res: Response) => {
  // await createUser({
  //   id: '999',
  //   password: '1234',
  //   role: 'student',
  // })
  res.send('working successfully!')
})

export default app
