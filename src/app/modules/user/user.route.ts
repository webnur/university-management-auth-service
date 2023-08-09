import express from 'express';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();
// router.post(
//   '/create-user',
//   validateRequest(UserValidation.createUserZodSchema),
//   UserController.createdUser
// )

router.post(
  '/create-student',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createdStudent
);

router.post(
  '/create-faculty',
  validateRequest(UserValidation.createFacultyZodSchema),
  UserController.createFaculty
);

router.post(
  '/create-admin',
  validateRequest(UserValidation.createAdminZodSchema),
  UserController.createAdmin
);
export const UserRoutes = router;
