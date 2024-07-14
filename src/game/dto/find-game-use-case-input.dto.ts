import { IFindGameInput } from '../models/IFindGameInput';

export class FindGameUseCaseInputDto {
  gameSettings: {
    isRating: boolean;
    timeTitle:
      | '1 | 0'
      | '1 | 1'
      | '2 | 1'
      | '3 | 0'
      | '3 | 2'
      | '5 | 0'
      | '10 | 0'
      | '15 | 10'
      | '30 | 0';
  };
  userId: number;

  constructor(input: IFindGameInput) {
    this.gameSettings = input.gameSettings;
    this.userId = input.userId;
  }
}
