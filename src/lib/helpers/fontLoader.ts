import { baseURL } from "@/constants/baseConstants";

export const fontLoader = (url: string) =>
  fetch(new URL(url, baseURL)).then((res) => res.arrayBuffer());
