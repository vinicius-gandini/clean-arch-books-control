export interface DeleteBookRepository {
  delete(id: DeleteBookRepository.Params): Promise<DeleteBookRepository.Result>;
}

export namespace DeleteBookRepository {
  export type Params = {
    id: string;
  };

  export type Result = any;
}
