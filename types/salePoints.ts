import { Localization } from './localization';

export interface SalePointItem {
  salePointId: number;
  name: string;
  terminalImei: string;
  terminalSerialNumber: string;
  username: string;
  responsibleName: string;
  responsiblePhone: string;
  responsibleEmail: string;
  localization: Localization;
}
