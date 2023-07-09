import { RequestHandler, Request, Response, NextFunction } from 'express';
import { UserService } from './user.service';
import { UserValidation } from './user.validation';
import catchAsync from '../../../shared/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';

// const createdUser: RequestHandler = async (req, res, next) => {
//   try {
//     await UserValidation.createUserZodSchema.parseAsync(req)
//     const { user } = req.body
//     const result = await UserService.createUser(user)
//     res.status(200).json({
//       success: 'true',
//       message: 'user create Successfully',
//       data: result,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

const createdUser: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    await UserValidation.createUserZodSchema.parseAsync(req);
    const { user } = req.body;
    const result = await UserService.createUser(user);

    // res.status(200).json({
    //   success: 'true',
    //   message: 'user create Successfully',
    //   data: result,
    // });

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user create Successfully',
      data: result,
    });
    next();
  }
);

export const UserController = { createdUser };
