import { heroRouter } from '@routes/hero';
import { Express } from 'express';

export default function (app: Express) {
  app.use('/api/heroes', heroRouter);
}
