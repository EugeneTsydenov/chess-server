import { Controller, Delete, Get, Put } from '@nestjs/common';
import { IUserController } from './IUserController';

@Controller('user')
export class UserController implements IUserController {
  @Delete('me')
  deleteMe(): any {
    return 'delete me';
  }

  @Get('me')
  getMe(): any {
    return 'get me';
  }

  @Get(':id')
  getUser(): any {
    return 'get user';
  }

  @Put('me')
  updateMe(): any {
    return 'update me';
  }
}
