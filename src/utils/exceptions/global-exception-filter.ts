import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import HttpStatus from 'http-status';
@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const httpCode = this.getHttpCode(exception)
    const message = this.getMessage(exception)
    host
      .switchToHttp()
      .getResponse<Response>()
      .status(httpCode)
      .json({ code: this.getCode(exception), data: null, error: this.getError(exception), message })
  }

  private getError(error: Error | HttpException) {
    return error.name || 'InternalServerError'
  }

  private getCode(error: Error | HttpException) {
  
    if (error instanceof HttpException) {
      return error.getStatus()
    }
    return HttpStatus.INTERNAL_SERVER_ERROR
  }

  private getHttpCode(error: Error | HttpException) {
  
    if (error instanceof HttpException) {
      return error.getStatus()
    }
    return HttpStatus.INTERNAL_SERVER_ERROR
  }

  private getMessage(error: Error | HttpException) {
  
    return error.message || 'Internal server error'
  }
}