import { AppError } from '@/app/core/handlers/errors/app.error.handler';
import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: Error) {
    if (error instanceof AppError) {
      console.log(`${error.domain}  ${error.message}`);
    }
  }
}
