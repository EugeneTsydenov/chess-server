import { Body, Controller, Get, Next, Res } from '@nestjs/common';
import { IUserController } from './interfaces/IUserController';
import { Response, NextFunction } from 'express';
import { GetMeUseCase } from './use-cases/get-me.use-case';
import { GetMeUseCaseInputDto } from './dto/get-me-use-case-input.dto';

@Controller('users')
export class UserController implements IUserController {
  constructor(private getMeUseCase: GetMeUseCase) {}

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
      res.json({ getMeUseCase });
    } catch (e) {
      next(e);
    }
  }

  deleteMe(): any {}

  getUser(): any {}

  updateMe(): any {}
}
