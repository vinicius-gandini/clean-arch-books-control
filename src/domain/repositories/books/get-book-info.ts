export interface GetBookInfoRepository {
  getBookInfo(
    id: GetBookInfoRepository.Params,
  ): Promise<GetBookInfoRepository.Result>;
}

export namespace GetBookInfoRepository {
  export type Params = {
    id: string;
  };

  export type Result = any;
}
