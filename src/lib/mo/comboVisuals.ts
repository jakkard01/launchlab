import { getMoCategoryImage } from "./categories";

const COMBO_IMAGE_OVERRIDES: Record<string, string> = {};

export const getComboImagePath = (comboId: string) =>
  COMBO_IMAGE_OVERRIDES[comboId] ?? getMoCategoryImage("econocombos");

export const getComboImageHint = (comboId: string) =>
  `/rys/combos/${comboId}.webp`;
