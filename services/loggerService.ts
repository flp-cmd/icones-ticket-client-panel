const IS_PRODUCTION = process.env.NODE_ENV === "production";

interface Logger {
  debug: (message: string, ...args: unknown[]) => void;
  info: (message: string, ...args: unknown[]) => void;
  warn: (message: string, ...args: unknown[]) => void;
  error: (message: string, ...args: unknown[]) => void;
}

class LoggerService implements Logger {
  private shouldLog(): boolean {
    return !IS_PRODUCTION;
  }

  debug(message: string, ...args: unknown[]): void {
    if (this.shouldLog()) {
      console.log(`🔍 [DEBUG] ${message}`, ...args);
    }
  }

  info(message: string, ...args: unknown[]): void {
    if (this.shouldLog()) {
      console.log(`ℹ️ [INFO] ${message}`, ...args);
    }
  }

  warn(message: string, ...args: unknown[]): void {
    if (this.shouldLog()) {
      console.warn(`⚠️ [WARN] ${message}`, ...args);
    }
  }

  error(message: string, ...args: unknown[]): void {
    if (this.shouldLog()) {
      console.error(`❌ [ERROR] ${message}`, ...args);
    }
  }

  http(message: string, ...args: unknown[]): void {
    if (this.shouldLog()) {
      console.log(`🌐 [HTTP] ${message}`, ...args);
    }
  }
}

export const logger = new LoggerService();
