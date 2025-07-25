export type Country = {
  isoCode: string;
  name: Array<{ language: string; text: string }>;
  officialLanguages: Array<string>;
};