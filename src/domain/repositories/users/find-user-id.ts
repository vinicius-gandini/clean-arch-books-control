import { User } from '@/domain/entities';

export interface FindUsersRepository {
  findByUsername(
    params: FindUsersByUsernameRepository.Params,
  ): Promise<FindUsersByUsernameRepository.Result>;
  findById(
    params: FindUsersByIdRepository.Params,
  ): Promise<FindUsersByIdRepository.Result>;
}

export namespace FindUsersByUsernameRepository {
  export type Params = {
    username: string;
  };

  export type Result = User | null;
}

export namespace FindUsersByIdRepository {
  export type Params = {
    id: string;
  };

  export type Result = User | null;
}
