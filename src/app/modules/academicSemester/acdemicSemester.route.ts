import express from 'express';
// import { UserController } from './user.controller'
// import { UserValidation } from './user.validation'
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidation } from './acdemicSemester.validation';
import { AcademicSemesterController } from './academicSemester.controller';

const router = express.Router();
router.post(
  '/create-semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemesterController.createSemester
);

export const AcademicSemesterRoutes = router;
