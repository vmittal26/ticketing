import { BadRequestError } from '@coretickets/modules';
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import * as loginService from '../service/loginService';

const router = express.Router();

router.post( '/api/users/signup',
async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await loginService.findUser(email);

    if (user != null) {
      throw new BadRequestError('user exists');
    }
    const userDoc = await loginService.saveUser(email, password);

    const userJwt = jwt.sign(
      {
        id: userDoc.id,
        email: userDoc.email,
      },
      'secret'
    );

    req.session = {
      jwt: userJwt,
    };
    res.status(200).send(userDoc);
  }
);

export { router as signUpRouter };

