export type AppExceptionData = {
  message: string;
  statusCode: number;
};

export class AppException extends Error {
  public data: AppExceptionData;

  constructor(data: AppExceptionData) {
    super(data.message);

    this.data = data;
  }
}
