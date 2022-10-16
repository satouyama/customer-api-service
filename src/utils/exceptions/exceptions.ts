import IError from "./error"



export abstract class CustomError extends Error {
  public abstract defaultMessage: string
  public abstract httpCode: number
  public abstract code: number
  public abstract legacyHttpCode: number
  public abstract legacyCode: number

  constructor(message?: string) {
    super(message)
    Object.defineProperty(this, 'message', { enumerable: true })
  }
}

export class InvalidData extends CustomError {
  public name = 'InvalidData'
  public defaultMessage = 'Invalid parameters'
  public httpCode = 400
  public code = 40000
  public legacyHttpCode = 400
  public legacyCode = 400
}

export class Unauthorized extends CustomError {
  public name = 'Unauthorized'
  public defaultMessage = 'Unauthorized'
  public httpCode = 401
  public code = 40100
  public legacyHttpCode = 401
  public legacyCode = 401
}

export class TokenBlockedError extends Unauthorized {
  public name = 'TokenBlockedError'
  public defaultMessage = 'Token blocked, contact support'
  public httpCode = 401
  public code = 40101
  public legacyCode = 402
}

export class Forbidden extends CustomError {
  public name = 'Forbidden'
  public defaultMessage = 'Forbidden'
  public httpCode = 403
  public code = 40300
  public legacyHttpCode = 403
  public legacyCode = 403
}

export class ResourceNotFound extends CustomError {
  public name = 'ResourceNotFound'
  public defaultMessage = 'Resource not found'
  public httpCode = 404
  public code = 40400
  public legacyHttpCode = 400
  public legacyCode = 404
}

export class TooManyRequests extends CustomError {
  public name = 'TooManyRequests'
  public defaultMessage = 'Too many requests'
  public httpCode = 429
  public code = 42900
  public legacyHttpCode = 429
  public legacyCode = 429
}

export class SystemIsBusy extends CustomError {
  public name = 'SystemIsBusy'
  public defaultMessage = 'System is busy'
  public httpCode = 420
  public code = 42000
  public legacyHttpCode = 420
  public legacyCode = 420
}

export class InternalServerError extends CustomError {
  public name = 'InternalServerError'
  public defaultMessage = 'Internal server error'
  public httpCode = 500
  public code = 50000
  public legacyHttpCode = 500
  public legacyCode = 500
}

export class ErrorGettingData extends InternalServerError {
  public name = 'ErrorGettingData'
  public defaultMessage = 'Error getting data'
  public code = 50001
  public legacyCode = 405
  public legacyHttpCode = 400
}

export class ExternalCommunicationError extends InternalServerError {
  public name = 'ExternalCommunicationError'
  public defaultMessage = 'External communication error'
  public code = 50002
  public legacyCode = 502
}

export class InternalCommunicationError extends InternalServerError {
  public name = 'InternalCommunicationError'
  public defaultMessage = 'Internal communication error'
  public code = 50003
  public legacyCode = 503
}

export class Maintenance extends CustomError {
  public name = 'Maintenance'
  public defaultMessage = 'This page is under maintenance'
  public httpCode = 503
  public code = 50300
  public legacyHttpCode = 503
  public legacyCode = 503
}

const errors = {
  ErrorGettingData: {
    code: 405,
    error: ErrorGettingData,
    httpCode: 400,
    key: 'ErrorGettingData',
    message: 'Error getting data',
  },
  ExternalCommunicationError: {
    code: 502,
    error: ExternalCommunicationError,
    httpCode: 500,
    key: 'ExternalCommunicationError',
    message: 'External communication error',
  },
  Forbidden: {
    code: 403,
    error: Forbidden,
    httpCode: 403,
    key: 'Forbidden',
    message: 'Forbidden',
  },
  InternalCommunicationError: {
    code: 503,
    error: InternalCommunicationError,
    httpCode: 500,
    key: 'InternalCommunicationError',
    message: 'Internal communication error',
  },
  InternalServerError: {
    code: 500,
    error: InternalServerError,
    httpCode: 500,
    key: 'InternalServerError',
    message: 'Internal server error',
  },
  InvalidData: {
    code: 400,
    error: InvalidData,
    httpCode: 400,
    key: 'InvalidData',
    message: 'Invalid data',
  },
  Maintenance: {
    code: 503,
    error: Maintenance,
    httpCode: 503,
    key: 'Maintenance',
    message: 'This page is under maintenance',
  },
  ResourceNotFound: {
    code: 404,
    error: ResourceNotFound,
    httpCode: 400,
    key: 'ResourceNotFound',
    message: 'Resource not found',
  },
  SystemIsBusy: {
    code: 420,
    error: SystemIsBusy,
    httpCode: 420,
    key: 'SystemIsBusy',
    message: 'System is busy',
  },
  TokenBlockedError: {
    code: 402,
    error: TokenBlockedError,
    httpCode: 401,
    key: 'TokenBlockedError',
    message: 'Token blocked, contact support',
  },
  TooManyRequests: {
    code: 429,
    error: TooManyRequests,
    httpCode: 429,
    key: 'TooManyRequests',
    message: 'Too many requests',
  },
  Unauthorized: {
    code: 401,
    error: Unauthorized,
    httpCode: 401,
    key: 'Unauthorized',
    message: 'Unauthorized',
  },
}

const errorData: any = {}

for (const index in errors) {
  if (Object.prototype.hasOwnProperty.call(errors, index)) {
    const item: IError = (errors as any)[index]

    errorData[item.code] = {
      code: item.code,
      httpCode: item.httpCode,
      key: item.key,
      message: item.message,
    }
  }
}

export { errorData }
export default errors