import { Body, Controller, Get, Next, Param, Res } from '@nestjs/common';
import { IUserController } from './interfaces/IUserController';
import { Response, NextFunction } from 'express';
import { GetMeUseCase } from './use-cases/get-me.use-case';
import { GetMeUseCaseInputDto } from './dto/get-me-use-case-input.dto';
import { GetUserByIdUseCase } from './use-cases/get-user-by-id.use-case';

@Controller('users')
export class UserController implements IUserController {
  constructor(
    private getMeUseCase: GetMeUseCase,
    private getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  @Get('me')
  async getMe(
    @Body() body: { userId: number },
    @Res() res: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    try {
      const getMeUseCase = await this.getMeUseCase.execute(
        new GetMeUseCaseInputDto(body.userId),
      );
      res.json(getMeUseCase);
    } catch (e) {
      next(e);
    }
  }

  deleteMe(): any {}

  updateMe(): any {}

  @Get(':id')
  async getUserById(
    @Param('id') id: number,
    @Res() res: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    try {
      const getUserByIdUseCase = await this.getUserByIdUseCase.execute({
        id: +id,
      });
      res.json(getUserByIdUseCase);
    } catch (e) {
      next(e);
    }
  }
}
