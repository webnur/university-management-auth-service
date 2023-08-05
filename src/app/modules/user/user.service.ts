import mongoose from 'mongoose';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { IStudent } from '../student/student.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
// import { generateStudentId } from './user.utils';
import { IUser } from './users.interface';
import { Student } from '../student/student.model';
import httpStatus from 'http-status';

// export const createUser = async (user: IUser): Promise<IUser | null> => {
//   //auto generate incremental id

//   const academicSemester = {
//     code: '01',
//     year: '2025',
//   };

//   const id = await generateStudentId(academicSemester);
//   user.id = id;
//   // default password
//   if (!user.password) {
//     user.password = config.default_user_password as string;
//   }
//   const createdUser = await User.create(user);
//   if (!createdUser) {
//     throw new ApiError(400, 'Failed to Create user');
//   }
//   return createdUser;
// };

// export const UserService = {
//   createUser,
// };

const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  // default password
  if (!user.password) {
    user.password = config.default_student_password as string;
  }
  // set role
  user.role = 'student';

  const academicsemester = await AcademicSemester.findById(
    student.academicSemester
  );

  // generate student id
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await generateStudentId(academicsemester);
    user.id = id;
    student.id = id;

    //array
    const newStudent = await Student.create([student], { session });

    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    //set student -->  _id into user.student
    user.student = newStudent[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  //user --> student ---> academicSemester, academicDepartment , academicFaculty

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }

  return newUserAllData;
};
export const UserService = {
  createStudent,
};
