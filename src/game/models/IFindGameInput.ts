export interface IFindGameInput {
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
}
