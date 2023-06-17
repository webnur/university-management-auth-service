import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
const app: Application = express()
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import { UserRoutes } from './app/modules/user/user.route'

app.use(cors())
//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/users', UserRoutes)

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  // throw new ApiError(400, 'ore baba error')
  next('ore baba error')
})
app.use(globalErrorHandler)
export default app
