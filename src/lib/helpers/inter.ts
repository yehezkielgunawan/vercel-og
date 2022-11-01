import { fontLoader } from "./fontLoader";

const firaSansFontLoader = (weight: string) =>
  fontLoader(`/assets/font/FiraSans-${weight}.otf`);

export const firaSansRegular = firaSansFontLoader("Regular");
export const firaSansSemibold = firaSansFontLoader("SemiBold");
export const firaSansBold = firaSansFontLoader("Bold");
export const firaSansLight = firaSansFontLoader("Light");
