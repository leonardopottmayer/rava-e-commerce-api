export type AppExceptionData = {
  message: string;
  timestamp: number;
  statusCode: number;
};

export class AppException extends Error {
  public data: AppExceptionData;

  constructor(data: AppExceptionData) {
    super(data.message);

    this.data = data;
  }
}
