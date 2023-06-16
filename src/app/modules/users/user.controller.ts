import { RequestHandler } from 'express'
import { UserService } from './user.service'
import { z } from 'zod'

const createdUser: RequestHandler = async (req, res, next) => {
  try {
    // request validation
    // body --> object
    // data --> object
    const createUserZodSchema = z.object({
      body: z.object({
        role: z.string({ required_error: 'role is required' }),
        password: z.string().optional(),
      }),
    })
    await createUserZodSchema.parseAsync(req)
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
