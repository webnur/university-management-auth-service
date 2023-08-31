import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
const app: Application = express();
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routers from './app/routes';
import httpStatus from 'http-status';
import cookieParser from 'cookie-parser';
// import { generateFacultyId } from './app/modules/user/user.utils';

app.use(cors());
app.use(cookieParser());
//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', routers);

app.get('', (req: Request, res: Response) => {
  res.send('server is running');
});
// handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'Api Not Found',
      },
    ],
  });
  next();
});

// const testId = async () => {
//   const testId = await generateFacultyId();
//   console.log(testId);
// };
// testId();
app.use(globalErrorHandler);
export default app;
