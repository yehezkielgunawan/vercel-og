import { fontLoader } from "./fontLoader";

const interFontLoader = (weight: string) =>
  fontLoader(`/assets/font/interbureau${weight}.ttf`);

export const interRegular = interFontLoader("");
export const interMedium = interFontLoader("semibold");
export const interBold = interFontLoader("bold");
