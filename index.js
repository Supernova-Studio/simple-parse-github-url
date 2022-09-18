'use strict';

const cache = {};

module.exports = function parseGitUrl(str) {
  if (!cache[str]) {
    cache[str] = parse(str);
  }

  return cache[str];
};

/*
 * Git url examples https://www.notion.so/supernovaio/Git-servers-17a3529eddb044acab18a62d2eac1869
 */
function parse(str) {
  if (typeof str !== 'string' || !str.length || str.includes('//gist') || str.includes('@gist')) {
    return null;
  }

  if (str.indexOf('git@') === 0) {
    const parts = str.split(':');

    const pathname = parts.pop();
    const host = parts.join(':').replace('git@', 'https://');

    str = `${host}/${pathname}`;
  }

  const url = new URL(str);

  let segments = url.pathname.split('/').filter(Boolean);
  segments = segments[0] === 'repos' ? segments.slice(1) : segments;

  const owner = segments[0];
  const name = segments[1] && segments[1].replace(/^\W+|\.git$/g, '');
  if (!owner || !name) {
    return null;
  }

  let branchAndDirectory = segments.slice(2).join('/')
    .replace(/^(tree|-\/tree|src)\//g, '')
    .split('/').filter(Boolean);

  // older format, allows proto://host/owner/repo#branch
  if (!branchAndDirectory.length && url.hash) {
    branchAndDirectory = url.hash.slice(1).split('/')
  }

  return {
    href: str,
    protocol: str.indexOf('git@') === 0 ? 'git@' : url.protocol,
    origin: str.indexOf('git@') === 0 ? `git@${url.host}` : url.origin,
    host: url.host,
    hostname: url.hostname,
    port: url.port,
    pathname: [owner, name, ...branchAndDirectory].join('/'),
    search: url.search,
    hash: url.hash,
    owner,
    name,
    branchAndDirectory,
  };
}
