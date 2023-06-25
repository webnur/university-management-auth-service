import { RequestHandler } from 'express';
import { AcademicSemesterService } from './academicSemester.service';
import { AcademicSemesterValidation } from './acdemicSemester.validation';

const createSemester: RequestHandler = async (req, res, next) => {
  try {
    await AcademicSemesterValidation.createAcademicSemesterZodSchema.parseAsync(
      req
    );
    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    );
    res.status(200).json({
      success: 'true',
      message: 'academic semester is created Successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const AcademicSemesterController = { createSemester };
