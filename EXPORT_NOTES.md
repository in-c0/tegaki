# Extracting as an independent repository

This branch contains an independent **root tree**; it is intentionally not a modification of upstream Tegaki's README.

1. Download this branch as an archive, or use `git archive --format=zip export/paper-ui -o paper-ui.zip`.
2. Create a **new, non-fork** GitHub repository, suggested name `in-c0/paper-ui`. Never detach, delete, or rewrite the original Tegaki fork to achieve this.
3. Import the extracted files into the new repository's `main` branch with **new independent commit history**.
4. In the new repo, update links to the new canonical URL. Do not claim first-party ownership of the upstream dependencies.
5. Run `bun install`, `bun run build`, `bun run test`, `bun run test:browser`, and `npm pack --dry-run`.
6. Review the exact bundle, verify npm scope ownership, configure trusted publishing OIDC, and publish an alpha only after approval.

The branch's Git *parent history* originated within the fork and therefore should **not** be mirrored as a new repository history. Import files into a clean repository instead.

Current GitHub connector can edit existing repositories, but cannot create repositories; repository creation is a separate user action.
