export interface TwoFactorSetupInitResponse {
  qrCode: string;
  secret: string;
  setupToken: string;
}

export interface TwoFactorSetupConfirmRequest {
  setupToken: string;
  code: string;
}

export interface TwoFactorSetupConfirmResponse {
  message: string;
}

export interface TwoFactorDisableResponse {
  message: string;
}
