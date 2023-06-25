import express, { Application, Request, Response } from 'express';
import cors from 'cors';
const app: Application = express();
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { UserRoutes } from './app/modules/user/user.route';
import { AcademicSemesterRoutes } from './app/modules/academicSemester/acdemicSemester.route';

app.use(cors());
//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/users', UserRoutes);
app.use('/api/v1/academic-semesters', AcademicSemesterRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('server is running');
});
app.use(globalErrorHandler);
export default app;
