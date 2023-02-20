import { User } from '@/domain/entities';

export interface CreateUserRepository {
  create(body: CreateUserRepository.Body): Promise<CreateUserRepository.Result>;
}

export namespace CreateUserRepository {
  export type Body = User;

  export type Result = any;
}
