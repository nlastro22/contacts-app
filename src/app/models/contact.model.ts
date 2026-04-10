export interface Contact {
  id: string;
  name: string;
  lastName: string;
  note?: string;
  address?: string;
  favorite: 0 | 1;
  telNumber: string[];
}
