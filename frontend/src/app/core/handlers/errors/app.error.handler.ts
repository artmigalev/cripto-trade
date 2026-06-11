export class AppError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly domain: string
  ) {
    super(message);
    this.name = 'AppError';
  }
}
