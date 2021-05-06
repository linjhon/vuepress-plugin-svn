import * as execa from "execa";
import { LogentryItem } from "../types";
import { xmlParse } from "./xmlParse";

/**
 * Get unix timestamp in milliseconds of the first commit
 */
export const getCreatedTime = async (
  filePath: string,
  cwd: string
): Promise<number> => {
  const { stdout } = await execa(
    "svn",
    ["log", filePath, "-r1:HEAD", "-l 1", "--xml"],
    {
      cwd,
    }
  );

  const {
    logentry,
  }: { logentry: LogentryItem } = await xmlParse.parseStringPromise(stdout);
  return new Date(logentry.date).getTime();
};
