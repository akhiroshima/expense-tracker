# MCP (Model Context Protocol) configuration

## GitHub MCP

To enable GitHub MCP in this project (create repos, manage issues/PRs, search code, etc.):

1. Copy the example config: `cp mcp.json.example mcp.json`
2. Open `mcp.json` and replace `YOUR_GITHUB_PAT` with your [GitHub Personal Access Token](https://github.com/settings/personal-access-tokens/new) (e.g. with `repo` scope).
3. Restart Cursor.

Requires Cursor v0.48.0+ for the remote GitHub server. `mcp.json` is gitignored so your token is never committed.
