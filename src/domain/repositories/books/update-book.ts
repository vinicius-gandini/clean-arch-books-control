import { EditBook } from '@/domain/entities';

export interface UpdateBookRepository {
  update(
    id: UpdateBookRepository.Params,
    body: UpdateBookRepository.Body,
  ): Promise<UpdateBookRepository.Result>;
}

export namespace UpdateBookRepository {
  export type Params = {
    id: string;
  };

  export type Body = EditBook;

  export type Result = any;
}
