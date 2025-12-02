export interface City {
  id: number;
  name: string;
}

export interface State {
  id: number;
  name: string;
  cities: City[];
}

export interface Localization {
  localizationId: number;
  name: string;
  type: string;
  active: boolean;
  cityId?: number;
  city?: string;
  stateId?: number;
  state?: string;
  stateAbbr?: string;
  zipCode?: string;
  neighborhood?: string;
  street?: string;
  number?: number;
  extra?: string;
  phone?: string;
  coordinates?: number[];
  googlePlaceId?: string;
}

export interface LocalizationAvailable {
  localizationId: number;
  name: string;
  city?: string;
  state?: string;
  stateAbbr?: string;
}
