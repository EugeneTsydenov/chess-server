import { Controller } from '@nestjs/common';
import { IUserController } from './interfaces/IUserController';

@Controller('user')
export class UserController implements IUserController {
  constructor() {}

  deleteMe(): any {}

  getMe(): any {}

  getUser(): any {}

  updateMe(): any {}
}
