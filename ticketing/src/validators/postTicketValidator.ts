import { body } from 'express-validator';

export const postTicketValidator = [
  body('title').not().isEmpty().withMessage('Ttile must be provided'),
  body('price')
    .isFloat({ gt:0})
    .withMessage('Price must be greater than zero')
  
];
