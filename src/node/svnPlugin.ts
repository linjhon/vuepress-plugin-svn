import type { Plugin } from "@vuepress/core";
import type { SvnData } from "./types";
import {
  checkSvnRepo,
  getContributors,
  getCreatedTime,
  getUpdatedTime,
} from "./utils";

/**
 * Options of vuepress-plugin-svn
 */
export interface SvnPluginOptions {
  /**
   * Whether to get the created time of a page
   */
  createdTime?: boolean;

  /**
   * Whether to get the updated time of a page
   */
  updatedTime?: boolean;

  /**
   * Whether to get the contributors of a page
   */
  contributors?: boolean;
}

export const svnPlugin: Plugin<SvnPluginOptions> = (
  { createdTime, updatedTime, contributors },
  app
) => {
  const cwd = app.dir.source();
  const isGitRepoValid = checkSvnRepo(cwd);

  return {
    name: "vuepress-plugin-svn",

    extendsPageData: async (page) => {
      const git: SvnData = {};

      if (!isGitRepoValid || page.filePathRelative === null) {
        return { git, svn: git };
      }

      if (createdTime !== false) {
        git.createdTime = await getCreatedTime(page.filePathRelative, cwd);
      }

      if (updatedTime !== false) {
        git.updatedTime = await getUpdatedTime(page.filePathRelative, cwd);
      }

      if (contributors !== false) {
        git.contributors = await getContributors(page.filePathRelative, cwd);
      }

      return { git, svn: git };
    },
  };
};

export default svnPlugin;
