export interface Login {
  execute(body: Login.Body): Login.Result;
}

export namespace Login {
  export type Body = {
    username: string;
    password: string;
  };

  export type Result = Promise<any>;
}
