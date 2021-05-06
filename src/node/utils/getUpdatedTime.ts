import * as execa from "execa";
import { LogentryItem } from "../types";
import { xmlParse } from "./xmlParse";

/**
 * Get unix timestamp in milliseconds of the last commit
 */
export const getUpdatedTime = async (
  filePath: string,
  cwd: string
): Promise<number> => {
  const { stdout } = await execa("svn", ["log", filePath, "-l 1", "--xml"], {
    cwd,
  });

  const {
    logentry,
  }: { logentry: LogentryItem } = await xmlParse.parseStringPromise(stdout);
  return new Date(logentry.date).getTime();
};
