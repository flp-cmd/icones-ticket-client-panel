import { logger } from './loggerService';

export interface HttpError {
  response?: {
    status?: number;
    data?: unknown;
  };
}

export interface ErrorResponse {
  message: string;
  status?: number;
}

export class ErrorService {
  private static readonly ERROR_MESSAGES: Record<string | number, string> = {
    // Generic server errors
    500: 'Erro interno do servidor. Tente novamente mais tarde.',
    502: 'Serviço temporariamente indisponível. Tente novamente em alguns minutos.',
    503: 'Serviço temporariamente indisponível. Tente novamente em alguns minutos.',
    504: 'Serviço temporariamente indisponível. Tente novamente em alguns minutos.',
    // Client errors
    403: 'Você não tem permissão para acessar este recurso. Entre em contato com os administradores do sistema.',
    404: 'Recurso não encontrado. Verifique se a URL está correta.',
    408: 'Tempo limite da requisição. Tente novamente.',
    429: 'Muitas requisições. Aguarde um momento e tente novamente.',
    // Network errors
    NETWORK_ERROR: 'Erro de conexão. Verifique sua internet e tente novamente.',
    TIMEOUT_ERROR: 'Tempo limite excedido. Tente novamente.',
    UNKNOWN_ERROR: 'Ocorreu um erro inesperado. Tente novamente.',
  };

  private static readonly LOGIN_ERROR_MESSAGES: Record<string | number, string> = {
    // Login specific errors
    401: 'Email ou senha incorretos',
    403: 'Acesso negado. Entre em contato com o administrador.',
    404: 'Serviço não encontrado. Tente novamente mais tarde.',
    409: 'Usuário já existe com este email.',
    422: 'Dados inválidos. Verifique as informações fornecidas.',
  };

  private static readonly TWO_FACTOR_ERROR_MESSAGES: Record<string | number, string> = {
    // 2FA specific errors
    401: 'Código de verificação incorreto. Tente novamente.',
    403: 'Código de verificação expirado. Solicite um novo código.',
    404: 'Token de verificação inválido. Tente fazer login novamente.',
    422: 'Código de verificação inválido. Digite um código de 6 dígitos.',
  };

  static handleHttpError(error: unknown): ErrorResponse {
    return this.handleErrorWithMessages(error, this.ERROR_MESSAGES);
  }

  static handleLoginHttpError(error: unknown): ErrorResponse {
    return this.handleErrorWithMessages(error, { ...this.ERROR_MESSAGES, ...this.LOGIN_ERROR_MESSAGES });
  }

  static handleTwoFactorHttpError(error: unknown): ErrorResponse {
    return this.handleErrorWithMessages(error, { ...this.ERROR_MESSAGES, ...this.TWO_FACTOR_ERROR_MESSAGES });
  }

  private static handleErrorWithMessages(error: unknown, messages: Record<string | number, string>): ErrorResponse {
    let message = messages.UNKNOWN_ERROR;
    let status: number | undefined;

    if (this.isHttpError(error)) {
      status = error.response?.status;
      if (status && status in messages) {
        message = messages[status];
      }
    } else if (this.isNetworkError(error)) {
      message = messages.NETWORK_ERROR;
    } else if (this.isTimeoutError(error)) {
      message = messages.TIMEOUT_ERROR;
    } else if (error instanceof Error) {
      message = error.message || messages.UNKNOWN_ERROR;
    }

    return { message, status };
  }

  static handleAuthError(error: unknown): string {
    const errorResponse = this.handleLoginHttpError(error);
    return errorResponse.message;
  }

  static handleTwoFactorError(error: unknown): string {
    const errorResponse = this.handleTwoFactorHttpError(error);
    return errorResponse.message;
  }

  static getErrorMessage(error: unknown): string {
    if (this.isHttpError(error)) {
      const httpError = error as { response?: { data?: { message?: string } } };
      const apiMessage = httpError.response?.data?.message;

      if (apiMessage && typeof apiMessage === 'string') {
        return apiMessage;
      }
    }

    const errorResponse = this.handleHttpError(error);
    return errorResponse.message;
  }

  static logError(error: unknown, context?: string) {
    const errorInfo = this.handleHttpError(error);

    logger.error(`[${context || 'Error'}]`, {
      message: errorInfo.message,
      status: errorInfo.status,
      originalError: error,
    });
  }

  private static isHttpError(error: unknown): error is HttpError {
    return error !== null && typeof error === 'object' && 'response' in error && error.response !== undefined;
  }

  private static isNetworkError(error: unknown): boolean {
    if (error instanceof Error) {
      return (
        error.message.includes('Network Error') ||
        error.message.includes('ERR_NETWORK') ||
        error.message.includes('fetch')
      );
    }
    return false;
  }

  private static isTimeoutError(error: unknown): boolean {
    if (error instanceof Error) {
      return error.message.includes('timeout') || error.message.includes('TIMEOUT') || error.name === 'TimeoutError';
    }
    return false;
  }
}
