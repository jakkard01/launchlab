import { getMoCategoryImage } from "./categories";

const COMBO_IMAGE_OVERRIDES: Record<string, string> = {
  cafe_pan_dulce: "/rys/combos/cafe-para-la-tarde.png",
  snack_pepsi: "/rys/combos/refresco-snacks.png",
  basico_casa: "/rys/combos/basicos-para-hoy.png",
};

export const getComboImagePath = (comboId: string) =>
  COMBO_IMAGE_OVERRIDES[comboId] ?? getMoCategoryImage("econocombos");

export const getComboImageHint = (comboId: string) =>
  `/rys/combos/${comboId}.png`;
