import { Body, Controller, Get, Next, Param, Patch, Res } from '@nestjs/common';
import { IUserController } from './interfaces/IUserController';
import { Response, NextFunction } from 'express';
import { GetMeUseCase } from './use-cases/get-me.use-case';
import { GetMeUseCaseInputDto } from './dto/get-me-use-case-input.dto';
import { GetUserByIdUseCase } from './use-cases/get-user-by-id.use-case';
import { IUpdatedMeBody } from './models/IUpdatedMeBody';
import { UpdateMeUseCase } from './use-cases/update-me.use-case';

@Controller('users')
export class UserController implements IUserController {
  constructor(
    private getMeUseCase: GetMeUseCase,
    private getUserByIdUseCase: GetUserByIdUseCase,
    private updateMeUseCase: UpdateMeUseCase,
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

  @Patch('me')
  async updateMe(
    @Body() body: IUpdatedMeBody,
    @Res() res: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    try {
      const updateMeUseCase = await this.updateMeUseCase.execute(body);
      res.json({
        message: 'User updated successfully.',
        updatedUser: { ...updateMeUseCase },
      });
    } catch (e) {
      next(e);
    }
  }
}
