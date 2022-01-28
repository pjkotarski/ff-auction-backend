import { Request } from 'express'
import { IDemoUser } from '../../shared/types/demo/IDemoUser'
import { BadRequestError } from '../../shared/types/errors/BadRequest.error';

export const getUserCookies = (req: Request): string => {

  if (req && req.cookies) {

    const id = req.cookies['user_id'];
    
    if (id) {
      return id;
    }
  }
  throw new BadRequestError('bad cookie');
}