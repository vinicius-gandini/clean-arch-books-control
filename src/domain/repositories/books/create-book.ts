import { Book } from '@/domain/entities';

export interface CreateBookRepository {
  create(body: CreateBookRepository.Body): Promise<CreateBookRepository.Result>;
}

export namespace CreateBookRepository {
  export type Body = Omit<Book, 'id'> & {id?: string};

  export type Result = any;
}
