export type LocalizedString = {
  en: string;
  pl: string;
};

export interface ForSaleItem {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  condition: LocalizedString;
  price?: string;
  photos?: string[];
  shippingNote?: LocalizedString;
  notes?: LocalizedString[];
}

export const forSaleItems: ForSaleItem[] = [];
