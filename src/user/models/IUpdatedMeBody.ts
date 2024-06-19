import { UpdatableFields } from './UpdatableFields';

export interface IUpdatedMeBody {
  userId: number;
  isHaveConfidentialFields: boolean;
  confirmedPassword?: string;
  updatedFields: Pick<
    UpdatableFields,
    'username' | 'avatar' | 'displayName' | 'email' | 'password'
  >;
}
