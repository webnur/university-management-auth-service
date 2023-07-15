import {
  IAcademicSemesterMonths,
  IAcademicSemesterTitles,
  IAcademicSemesterCodes,
} from './academicSemester.interface';
export const academicSemesterMonths: IAcademicSemesterMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const academicSemesterTitles: IAcademicSemesterTitles[] = [
  'Autumn',
  'Summer',
  'Fall',
];

export const academicSemesterCodes: IAcademicSemesterCodes[] = [
  '01',
  '02',
  '03',
];

export const academicSemesterCodeMapper: { [key: string]: string } = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};

export const academicSemesterSearchableField = ['title', 'code', 'year'];

export const academicSemesterFilterableField = [
  'searchTerm',
  'title',
  'code',
  'year',
];
