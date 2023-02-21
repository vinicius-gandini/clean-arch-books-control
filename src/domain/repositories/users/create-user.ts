import { User } from '@/domain/entities';

export interface CreateUserRepository {
  create(body: CreateUserRepository.Body): Promise<CreateUserRepository.Result>;
}

export namespace CreateUserRepository {
  export type Body = Omit<User, 'id'> & {id?: string};

  export type Result = any;
}
