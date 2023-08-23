import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import {validateRequest, BadRequestError} from '@coretickets/modules';

import * as loginService from '../service/loginService';
import { compare } from '../service/passwordService';
import { signinValidator } from '../validators/singnInValidator';

const router = express.Router();

router.post('/api/users/signin',
  signinValidator, validateRequest,async (req: Request, res: Response) => {
    
    const {email, password } = req.body;
    const user = await loginService.findUser(email);

    if(user==null){
      throw new BadRequestError('invalid credentials');
    }
    const passwordsMatch = await compare(user.password, password);

    if(!passwordsMatch){
      throw new BadRequestError('Invalid credentials');
    }

    const userJwt = jwt.sign( { id: user.id, email: user.email, }, 'secret' );

    req.session = {
      jwt: userJwt,
    };
    res.status(200).send(user);
  
  }
);

export { router as signInRouter };

