import { CreateType } from '../enum/create-type';

export class CreateUserDto {
  email: string;
  nickname?: string;
  createType: CreateType;
}
