import { Parser } from "xml2js";

export const xmlParse = new Parser({
  explicitRoot: false,
  explicitArray: false,
  mergeAttrs: true,
});
