type GitParseResult = URL & {
  owner: string;
  name: string;
  branchAndDirectory: string[];
};

declare function simpleGithubParse(str: string): GitParseResult;
declare function simpleGitParse(str: string): GitParseResult;

declare namespace simpleGitParse {
  export type SimpleGithubParseResult = GitParseResult;
  export type SimpleGitParseResult = GitParseResult;
}

export = simpleGitParse;
