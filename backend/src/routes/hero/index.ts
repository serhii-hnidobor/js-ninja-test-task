import { NextFunction, Request, Response, Router } from 'express';
import { heroService } from '@services';
import { validateImagesData, validateSchema } from '@middlewares';
import { responseMiddleware } from '@middlewares/response';
import { heroCreateSchema, heroUpdateSchema } from '@/schemas';
import multer from 'multer';
import { storageService } from '@services/storage';

const upload = multer({ dest: 'uploads/' });

const router = Router();

router.get(
  '/',
  async function (req, res, next) {
    try {
      const page = Number(req.query.page) || 1;
      const itemPerPage = Number(req.query.itemPerPage) || 5;
      res.locals.data = await heroService.getAll(itemPerPage, page);
    } catch (error) {
      res.locals.error = error;
    } finally {
      next();
    }
  },
  responseMiddleware,
);

router.get(
  '/:id',
  async function (req, res, next) {
    try {
      const id = req.params.id;
      res.locals.data = await heroService.getById(id);
    } catch (error) {
      res.locals.error = error;
    } finally {
      next();
    }
  },
  responseMiddleware,
);

router.post(
  '/',
  validateSchema(heroCreateSchema),
  upload.array('Images', 100),
  validateImagesData(),
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const { Images } = req.body;

      req.body.Images = await storageService.uploadMultipleBase64Img(Images);

      res.locals.data = await heroService.create(req.body);
    } catch (error) {
      res.locals.error = error;
    } finally {
      next();
    }
  },
  responseMiddleware,
);

router.put(
  '/:id',
  validateSchema(heroUpdateSchema),
  upload.array('Images', 100),
  validateImagesData(true),
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const { Images } = req.body;
      const id = req.params.id;
      req.body.Images = await storageService.uploadMultipleBase64Img(Images);
      res.locals.data = await heroService.update(id, req.body);
    } catch (error) {
      res.locals.error = error;
    } finally {
      next();
    }
  },
  responseMiddleware,
);

router.delete(
  '/:id',
  validateSchema(heroUpdateSchema),
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      res.locals.data = await heroService.delete(id);
    } catch (error) {
      res.locals.error = error;
    } finally {
      next();
    }
  },
  responseMiddleware,
);

export { router as heroRouter };
