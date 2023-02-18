export class HttpResponse<T> {
  public data: T;
  public statusCode: number;

  constructor(data?: T, statusCode?: number) {
    if (data) {
      this.data = data;
    }

    this.statusCode = statusCode ?? 200;
  }
}
