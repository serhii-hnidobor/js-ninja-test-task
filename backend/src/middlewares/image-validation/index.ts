import { NextFunction, Request, Response } from 'express';
import isUrlHttp from 'is-url-http';
import { BASE64_REG_EXP } from '@config';

const validateImagesData = (isUrlAllowed: boolean | undefined = false) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { Images } = req.body;

    for (const image of Images) {
      if (image.match(BASE64_REG_EXP)) {
        continue;
      }

      if (!isUrlAllowed) {
        throw {
          message: 'invalid image data',
        };
      }

      if (!isUrlHttp(image)) {
        throw {
          message: 'invalid image data',
        };
      }
    }

    next();
  };
};

export { validateImagesData };
