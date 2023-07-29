import { IAcademicDepartment } from './academicDepartment.interfaces';
import { AcademicDepartment } from './academicDepartment.model';

const createDepartment = async (
  payload: IAcademicDepartment
): Promise<IAcademicDepartment | null> => {
  const result = (await AcademicDepartment.create(payload)).populate(
    'academicFaculty'
  );
  return result;
};

export const AcademicDepartmentService = {
  // getAllDepartments,
  // getSingleDepartment,
  // updateDepartment,
  // deleteDepartment,
  createDepartment,
};
