import { promises as fs } from "node:fs";
import path from "node:path";

import { masterCaseBank } from "../../../../../data/cases";
import { caseAnswerOverrideKey } from "../../../../../lib/caseAnswerOverrideKey";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const OVERRIDES_FILE = path.join(process.cwd(), "data", "caseAnswerOverrides.ts");
const FILE_PREFIX = "export const caseAnswerOverrides: Record<string, string> = ";

function isStageType(value: unknown): value is "history" | "physical-exam" | "investigation" {
  return value === "history" || value === "physical-exam" || value === "investigation";
}

function containsAnswer(caseId: string, stageType: "history" | "physical-exam" | "investigation", itemKey: string) {
  const caseItem = masterCaseBank.find((item) => item.id === caseId);
  if (!caseItem) return false;

  const stage = caseItem.stages.find((item) => item.type === stageType);
  if (!stage) return false;

  if (stage.type === "history" || stage.type === "physical-exam") {
    return stage.hints.some((item) => item.id === itemKey);
  }

  return stage.investigations.some((investigation) =>
    investigation.findings.some((finding) => `${investigation.id}::${finding.label}` === itemKey),
  );
}

async function readOverrides(): Promise<Record<string, string>> {
  try {
    const source = await fs.readFile(OVERRIDES_FILE, "utf8");
    const match = source.match(
      /export const caseAnswerOverrides: Record<string, string> = (\{[\s\S]*?\});/,
    );
    if (!match) return {};

    const parsed: unknown = JSON.parse(match[1]);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};

    return Object.fromEntries(
      Object.entries(parsed).filter(([, value]) => typeof value === "string"),
    );
  } catch {
    return {};
  }
}

async function writeOverrides(overrides: Record<string, string>) {
  const source = `/** Persistent source-code edits written by /admin/cases. */\n${FILE_PREFIX}${JSON.stringify(overrides, null, 2)};\n`;
  const tempFile = `${OVERRIDES_FILE}.tmp`;
  await fs.writeFile(tempFile, source, "utf8");
  await fs.rename(tempFile, OVERRIDES_FILE);
}

export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return Response.json(
      { ok: false, error: "ویرایش مستقیم فایل‌های source فقط در محیط توسعه محلی فعال است." },
      { status: 403 },
    );
  }

  try {
    const body = (await request.json()) as {
      caseId?: unknown;
      stageType?: unknown;
      itemKey?: unknown;
      content?: unknown;
    };

    const caseId = typeof body.caseId === "string" ? body.caseId.trim() : "";
    const stageType = body.stageType;
    const itemKey = typeof body.itemKey === "string" ? body.itemKey.trim() : "";
    const content = typeof body.content === "string" ? body.content.trim() : "";

    if (!caseId || !isStageType(stageType) || !itemKey) {
      return Response.json({ ok: false, error: "اطلاعات پاسخ ناقص است." }, { status: 400 });
    }

    if (!containsAnswer(caseId, stageType, itemKey)) {
      return Response.json({ ok: false, error: "این پاسخ در کیس پیدا نشد." }, { status: 404 });
    }

    if (!content) {
      return Response.json({ ok: false, error: "متن پاسخ نمی‌تواند خالی باشد." }, { status: 400 });
    }

    const overrides = await readOverrides();
    const key = caseAnswerOverrideKey(caseId, stageType, itemKey);

    // Replace the exact answer key. Nothing is appended to the case itself.
    overrides[key] = content;

    // JSON serialization gives each key exactly once, preventing duplicate answers.
    await writeOverrides(overrides);

    return Response.json({ ok: true, key });
  } catch (error) {
    console.error("Failed to persist case answer edit", error);
    return Response.json(
      { ok: false, error: "ذخیره در فایل source انجام نشد." },
      { status: 500 },
    );
  }
}
