import { User } from '@/domain/entities';

export interface GetAllUsersRepository {
  getUsers(): Promise<GetAllUsersRepository.Result>;
}

export namespace GetAllUsersRepository {
  export type Result = User[];
}
