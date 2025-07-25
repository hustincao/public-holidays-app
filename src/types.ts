export type Country = {
  isoCode: string;
  name: Array<{ language: string; text: string }>;
  officialLanguages: Array<string>;
};

export type Holiday = {
  endDate: string;
  id: string;
  name: Array<{ language: string; text: string }>;
  nationwide: boolean;
  regionalScope: string;
  startDate: string;
  temporalScope: string;
  type: string;
};
