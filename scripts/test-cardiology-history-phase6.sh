#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
rm -rf .phase6-build
SHIM=.phase6-node-shim.d.ts
trap 'rm -rf .phase6-build "$SHIM"' EXIT
cat > "$SHIM" <<'TYPES'
declare const process: { env: Record<string, string | undefined> };
TYPES
tsc --strict --target ES2020 --module commonjs --moduleResolution node --skipLibCheck --outDir .phase6-build "$SHIM" data/cardiologyCases.ts data/courseBanks.ts lib/cardiologyCaseValidator.ts docs/cardiologyHistoryRuntimeValidator.ts data/cardiologyQuestionBank.ts data/cardiologyHistoryPhase3.ts data/cardiologyPhysicalExamBank.ts data/cardiologyInvestigationBank.ts
node docs/phase6IntegrationChecks.cjs
