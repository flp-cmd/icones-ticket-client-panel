import { getTwoFactorTimestamp, setTwoFactorTimestamp } from './storageService';

const TWO_FACTOR_CONFIG: TwoFactorTimeConfig = {
  postRequestsTimeout: 24 * 60 * 60 * 1000,
  getRequestsTimeout: 7 * 24 * 60 * 60 * 1000,
};

export interface TwoFactorTimeConfig {
  postRequestsTimeout: number;
  getRequestsTimeout: number;
}

export class TwoFactorTimeService {
  private static config: TwoFactorTimeConfig = TWO_FACTOR_CONFIG;

  /**
   * Update the 2FA timestamp to current time
   */
  static updateTwoFactorTimestamp(): void {
    const currentTimestamp = Date.now();
    setTwoFactorTimestamp(currentTimestamp);
  }

  /**
   * Check if 2FA is required based on HTTP method
   */
  static isTwoFactorRequired(method: string): boolean {
    const lastTimestamp = getTwoFactorTimestamp();

    if (!lastTimestamp) {
      return false;
    }

    const timeElapsed = Date.now() - lastTimestamp;

    const isWriteOperation = method !== 'GET';

    if (isWriteOperation) {
      return timeElapsed >= this.config.postRequestsTimeout;
    }

    return timeElapsed >= this.config.getRequestsTimeout;
  }
}

export const twoFactorTimeService = TwoFactorTimeService;
