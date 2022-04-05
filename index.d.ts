type GithubParseResult = URL & {
  owner: string;
  name: string;
  branchAndDirectory?: string[];
};

declare function simpleGithubParse(str: string): GithubParseResult;

declare namespace simpleGithubParse {
  export type SimpleGithubParseResult = GithubParseResult;
}

export = simpleGithubParse;
