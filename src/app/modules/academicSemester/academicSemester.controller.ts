import { RequestHandler, Request, Response, NextFunction } from 'express';
import { AcademicSemesterService } from './academicSemester.service';
import { AcademicSemesterValidation } from './acdemicSemester.validation';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { IAcademicSemester } from './academicSemester.interface';

// const createSemester: RequestHandler = async (req, res, next) => {
//   try {
//     await AcademicSemesterValidation.createAcademicSemesterZodSchema.parseAsync(
//       req
//     );
//     const { ...academicSemesterData } = req.body;
//     const result = await AcademicSemesterService.createSemester(
//       academicSemesterData
//     );
//     res.status(200).json({
//       success: 'true',
//       message: 'academic semester is created Successfully',
//       data: result,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

const createSemester: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    await AcademicSemesterValidation.createAcademicSemesterZodSchema.parseAsync(
      req
    );
    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    );

    // res.status(200).json({
    //   success: 'true',
    //   message: 'academic semester is created Successfully',
    //   data: result,
    // });
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'academic semester is created Successfully',
      data: result,
    });
    next();
  }
);

const getAllSemesters = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // const paginationOptions = {
    //   page: Number(req.query.page),
    //   limit: Number(req.query.limit),
    //   sortBy: req.query.sortBy,
    //   sortOrder: req.query.sortOrder,
    // };

    const paginationOptions = pick(req.query, paginationFields);

    const result = await AcademicSemesterService.getAllSemesters(
      paginationOptions
    );
    sendResponse<IAcademicSemester[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'semester received successfully ',
      meta: result.meta,
      data: result.data,
    });
    next();
  }
);

export const AcademicSemesterController = { createSemester, getAllSemesters };
