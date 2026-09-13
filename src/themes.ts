export type ThemeName = 'midnight' | 'electric' | 'racing' | 'forest' | 'pure';

export interface Theme {
  name: ThemeName;
  label: string;
  description: string;
  vars: Record<string, string>;
}

export const themes: Theme[] = [
  {
    name: 'midnight',
    label: 'Midnight Black',
    description: 'Luxury dark appearance',
    vars: {
      '--color-bg': '11 15 20',
      '--color-card': '18 24 33',
      '--color-accent': '59 130 246',
      '--color-accent-hover': '37 99 235',
      '--color-text': '255 255 255',
      '--color-text-secondary': '161 161 170',
      '--color-border': '39 49 61',
    },
  },
  {
    name: 'electric',
    label: 'Electric Blue',
    description: 'Technology-focused',
    vars: {
      '--color-bg': '8 15 30',
      '--color-card': '15 27 49',
      '--color-accent': '0 212 255',
      '--color-accent-hover': '0 180 220',
      '--color-text': '224 242 254',
      '--color-text-secondary': '125 211 252',
      '--color-border': '30 58 95',
    },
  },
  {
    name: 'racing',
    label: 'Racing Red',
    description: 'Sports-car inspired',
    vars: {
      '--color-bg': '15 10 10',
      '--color-card': '28 16 16',
      '--color-accent': '239 68 68',
      '--color-accent-hover': '220 38 38',
      '--color-text': '255 245 245',
      '--color-text-secondary': '214 170 170',
      '--color-border': '49 28 28',
    },
  },
  {
    name: 'forest',
    label: 'Forest Green',
    description: 'Hybrid and EV inspired',
    vars: {
      '--color-bg': '8 18 14',
      '--color-card': '14 30 22',
      '--color-accent': '34 197 94',
      '--color-accent-hover': '22 163 74',
      '--color-text': '240 253 244',
      '--color-text-secondary': '134 239 172',
      '--color-border': '20 50 35',
    },
  },
  {
    name: 'pure',
    label: 'Pure White',
    description: 'Minimalist light theme',
    vars: {
      '--color-bg': '248 250 252',
      '--color-card': '255 255 255',
      '--color-accent': '59 130 246',
      '--color-accent-hover': '37 99 235',
      '--color-text': '15 23 42',
      '--color-text-secondary': '100 116 139',
      '--color-border': '226 232 240',
    },
  },
];
