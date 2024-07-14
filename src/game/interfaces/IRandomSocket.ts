import { IFindGameInput } from '../models/IFindGameInput';

export interface IRandomSocket {
  findGame(body: IFindGameInput, client: any): any;
  move(): any;
  offerDraw(): any;
  giveUp(): any;
}
