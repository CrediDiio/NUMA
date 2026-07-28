export type Colorway = {
  name: string;
  hex: string;
};

export type Product = {
  slug: string;
  name: string;
  collection: string;
  price: number;
  images: string[]; // placeholders
  colorway: Colorway;
  texture: "Fio de malha trançado" | "Fio de malha bouclê" | "Fio de malha clássico";
  ornaments: string[];
  shortDescription: string;
  fullDescription: string;
  details: string[];
  isNew?: boolean;
};
