import { RequestHandler, Request, Response } from 'express';
import { UserService } from './user.service';
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

// const createdUser: RequestHandler = catchAsync(
//   async (req: Request, res: Response) => {
//     await UserValidation.createUserZodSchema.parseAsync(req);
//     const { ...userData } = req.body;
//     const result = await UserService.createUser(userData);

//     // res.status(200).json({
//     //   success: 'true',
//     //   message: 'user create Successfully',
//     //   data: result,
//     // });

//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'user create Successfully',
//       data: result,
//     });
//   }
// );

// export const UserController = { createdUser };

const createdStudent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { student, ...userData } = req.body;
    const result = await UserService.createStudent(student, userData);

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
  }
);

const createFaculty: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { faculty, ...userData } = req.body;
    const result = await UserService.createFaculty(faculty, userData);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'create faculty Successfully',
      data: result,
    });
  }
);

const createAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { admin, ...userData } = req.body;
    const result = await UserService.createAdmin(admin, userData);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'create admin Successfully',
      data: result,
    });
  }
);

export const UserController = { createdStudent, createFaculty, createAdmin };
