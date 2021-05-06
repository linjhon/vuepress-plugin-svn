export interface SvnPluginPageData {
  git: SvnData;
}

export interface SvnData {
  /**
   * Unix timestamp in milliseconds of the first commit
   */
  createdTime?: number;

  /**
   * Unix timestamp in milliseconds of the last commit
   */
  updatedTime?: number;

  /**
   * Contributors of all commits
   */
  contributors?: SvnContributor[];
}

export interface SvnContributor {
  name: string;
  email: string;
  commits: number;
}

export interface LogentryItem {
  revision: string;
  author: string;
  date: string;
  msg: string;
}

export interface LogentryJson {
  logentry: LogentryItem | LogentryItem[];
}
