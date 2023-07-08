import express, { Application, Request, Response } from 'express';
import cors from 'cors';
const app: Application = express();
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routers from './app/routes';

app.use(cors());
//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', routers);

app.get('', (req: Request, res: Response) => {
  res.send('server is running');
});
app.use(globalErrorHandler);
export default app;
