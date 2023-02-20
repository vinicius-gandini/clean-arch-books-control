import { User } from '@/domain/entities';

export interface FindUsersRepository {
  findByUsername(
    params: FindUsersRepository.Params,
  ): Promise<FindUsersRepository.Result>;
}

export namespace FindUsersRepository {
  export type Params = {
    username: string;
  };

  export type Result = User | null;
}
