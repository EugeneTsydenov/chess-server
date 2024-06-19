import { UpdatableFields } from '../models/UpdatableFields';

export class UpdateUserRepositoryDto {
  id: number;
  updatedFields: {
    password?: string;
    email?: string;
    username?: string;
    avatar?: string;
    display_name?: string;
    updated_at?: Date;
  };

  constructor(input: {
    id: number;
    updatedFields: Omit<UpdatableFields, 'displayName' | 'updatedAt'> & {
      display_name?: string;
      updated_at?: Date;
    };
  }) {
    this.id = input.id;
    this.updatedFields = input.updatedFields;
  }
}
