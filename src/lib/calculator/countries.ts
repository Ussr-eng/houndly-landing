// EU-27 member states and the IANA zone used as the reporting timezone (the competent
// authority's wall clock). TODO(verify): mainland zones for Portugal (Europe/Lisbon, not
// Atlantic/Azores or Atlantic/Madeira) and Spain (Europe/Madrid, not Atlantic/Canary).

export interface Country {
  code: string;
  name: string;
  zone: string;
}

export const countries: readonly Country[] = [
  { code: 'AT', name: 'Austria', zone: 'Europe/Vienna' },
  { code: 'BE', name: 'Belgium', zone: 'Europe/Brussels' },
  { code: 'BG', name: 'Bulgaria', zone: 'Europe/Sofia' },
  { code: 'HR', name: 'Croatia', zone: 'Europe/Zagreb' },
  { code: 'CY', name: 'Cyprus', zone: 'Asia/Nicosia' },
  { code: 'CZ', name: 'Czechia', zone: 'Europe/Prague' },
  { code: 'DK', name: 'Denmark', zone: 'Europe/Copenhagen' },
  { code: 'EE', name: 'Estonia', zone: 'Europe/Tallinn' },
  { code: 'FI', name: 'Finland', zone: 'Europe/Helsinki' },
  { code: 'FR', name: 'France', zone: 'Europe/Paris' },
  { code: 'DE', name: 'Germany', zone: 'Europe/Berlin' },
  { code: 'GR', name: 'Greece', zone: 'Europe/Athens' },
  { code: 'HU', name: 'Hungary', zone: 'Europe/Budapest' },
  { code: 'IE', name: 'Ireland', zone: 'Europe/Dublin' },
  { code: 'IT', name: 'Italy', zone: 'Europe/Rome' },
  { code: 'LV', name: 'Latvia', zone: 'Europe/Riga' },
  { code: 'LT', name: 'Lithuania', zone: 'Europe/Vilnius' },
  { code: 'LU', name: 'Luxembourg', zone: 'Europe/Luxembourg' },
  { code: 'MT', name: 'Malta', zone: 'Europe/Malta' },
  { code: 'NL', name: 'Netherlands', zone: 'Europe/Amsterdam' },
  { code: 'PL', name: 'Poland', zone: 'Europe/Warsaw' },
  { code: 'PT', name: 'Portugal', zone: 'Europe/Lisbon' },
  { code: 'RO', name: 'Romania', zone: 'Europe/Bucharest' },
  { code: 'SK', name: 'Slovakia', zone: 'Europe/Bratislava' },
  { code: 'SI', name: 'Slovenia', zone: 'Europe/Ljubljana' },
  { code: 'ES', name: 'Spain', zone: 'Europe/Madrid' },
  { code: 'SE', name: 'Sweden', zone: 'Europe/Stockholm' },
];

export const defaultCountry = 'BE';

export function countryByCode(code: string): Country | undefined {
  return countries.find((c) => c.code === code.toUpperCase());
}
