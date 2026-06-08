#!/bin/bash
# SessionStart hook — prepares the project so tests/linters/builds work
# immediately in Claude Code on the web (fresh, dependency-less containers).
set -euo pipefail

# Only needed in the remote (web) environment; locally deps usually exist.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "$CLAUDE_PROJECT_DIR"

# Idempotent: npm install is a no-op when node_modules is already current,
# and (unlike npm ci) lets the cached container state be reused.
npm install
