import { commandSync } from "execa";

/**
 * Check if the git repo is valid
 */
export const checkSvnRepo = (cwd: string): boolean => {
  try {
    commandSync("svn log", { cwd });
    return true;
  } catch {
    return false;
  }
};
