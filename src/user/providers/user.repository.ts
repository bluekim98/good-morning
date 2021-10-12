import { BaseRepository } from '@src/common/provider/base.repository';
import { EntityRepository } from 'typeorm';
import { User } from '../user.entity';

@EntityRepository(User)
export class UserRepository extends BaseRepository<User> {}
