import * as execa from "execa";
import type { LogentryItem, LogentryJson, SvnContributor } from "../types";
import { xmlParse } from "./xmlParse";

function getCommits(logentry: LogentryItem[]) {
  var hash = {};

  return logentry.reduce(function (item: SvnContributor[], next) {
    if (hash[next.author]) {
      item.map((e, i) => {
        next.author == e.name ? item[i].commits++ : "";
      });
    } else {
      const contributor: SvnContributor = {
        commits: 1,
        name: next.author,
        email: next.author,
      };
      hash[next.author] = true && item.push(contributor);
    }
    return item;
  }, []);
}

export const getContributors = async (
  filePath: string,
  cwd: string
): Promise<SvnContributor[]> => {
  const { stdout } = await execa("svn", ["log", filePath, "-q", "--xml"], {
    cwd,
    stdin: "inherit",
  });

  const { logentry }: LogentryJson = await xmlParse.parseStringPromise(stdout);
  const logentryList = Array.isArray(logentry) ? logentry : [logentry];
  return getCommits(logentryList);
};
