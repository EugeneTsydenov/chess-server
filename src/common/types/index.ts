export type GameColors = 'w' | 'b';

export interface UseCase<args, returned> {
  execute(...args: args[]): returned;
}
