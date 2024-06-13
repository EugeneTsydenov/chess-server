export type GameSide = 'w' | 'b';

export interface UseCase<args, returned> {
  execute(...args: args[]): Promise<returned>;
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
