import { RequestHandler } from 'express'
import { UserService } from './user.service'
import { UserValidation } from './user.validation'

const createdUser: RequestHandler = async (req, res, next) => {
  try {
    // request validation
    // body --> object
    // data --> object

    await UserValidation.createUserZodSchema.parseAsync(req)
    const { user } = req.body
    const result = await UserService.createUser(user)
    res.status(200).json({
      success: 'true',
      message: 'user create Successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const UserController = { createdUser }
