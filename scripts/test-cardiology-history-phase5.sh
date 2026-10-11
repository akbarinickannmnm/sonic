#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
rm -rf .phase5-build
trap 'rm -rf .phase5-build' EXIT
tsc --strict --target ES2020 --module commonjs --moduleResolution node --skipLibCheck --outDir .phase5-build data/cardiologyCases.ts data/cardiologyQuestionBank.ts data/cardiologyHistoryPhase3.ts docs/cardiologyHistoryRuntimeValidator.ts
node docs/phase5HistoryChecks.cjs
