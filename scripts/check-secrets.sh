#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

PATTERN='AKIA[0-9A-Z]{16}|AIza[0-9A-Za-z_-]{35}|ghp_[A-Za-z0-9]{36}|xox[baprs]-[A-Za-z0-9-]{10,}|-----BEGIN (RSA|EC|OPENSSH|DSA|PRIVATE) KEY-----|mongodb(\+srv)?:\/\/|postgres(ql)?:\/\/|mysql:\/\/|password[[:space:]]*[:=][[:space:]]*"[^"]+"|secret[[:space:]]*[:=][[:space:]]*"[^"]+"|token[[:space:]]*[:=][[:space:]]*"[^"]+"|api[_-]?key[[:space:]]*[:=][[:space:]]*"[^"]+"|Authorization:[[:space:]]*Bearer[[:space:]]+[A-Za-z0-9._=-]+'

echo "Scanning repository for potential secrets..."
if rg -n --hidden \
  --glob '!.git' \
  --glob '!node_modules' \
  --glob '!build' \
  --glob '!coverage' \
  --glob '!package-lock.json' \
  "$PATTERN" .; then
  echo
  echo "Potential secrets found. Review before committing."
  exit 1
fi

echo "No obvious secrets found."
