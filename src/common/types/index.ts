export type GameColors = 'w' | 'b';

export interface UseCase<args, returned> {
  execute(...args: args[]): returned;
}

interface ISecret {
  access: string;
  refresh: string;
}

export interface IEnv {
  port: number;
  dbUrl: string;
  clientUrl: string;
  secrets: ISecret;
}
