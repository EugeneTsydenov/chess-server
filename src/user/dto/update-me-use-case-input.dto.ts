import { IUpdatedMeBody } from '../models/IUpdatedMeBody';
import { UpdatableFields } from '../models/UpdatableFields';

export class UpdateMeUseCaseInputDto {
  userId: number;
  isHaveConfidentialFields: boolean;
  confirmedPassword?: string;
  updatedFields: UpdatableFields;

  constructor(input: IUpdatedMeBody) {
    this.userId = +input.userId;
    this.isHaveConfidentialFields = input.isHaveConfidentialFields;
    this.confirmedPassword = input.confirmedPassword;
    this.updatedFields = input.updatedFields;
  }
}
