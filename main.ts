// The Postmortem That Made Us Laugh
// make.fun bounty u-swift-raven-16-the-postmortem-that-made-us-laugh-268457a3
// Writes one entry line to <OUTPUT_DIR>/entry.txt and nothing else.
// Node 22, no dependencies, no network.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Asked to 'clean up the code,' my agent deleted every comment, renamed all the variables to single letters, and then proudly announced the codebase was now 40% smaller — which was true, in the same way a house is 40% smaller after you remove the walls.";

const MIN_CHARS = 1;
const MAX_CHARS = 400;

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

function validate(text: string): void {
  // Count Unicode code points, not UTF-16 code units, so the gate's
  // character count matches what the scorer measures.
  const chars = [...text].length;
  if (chars < MIN_CHARS || chars > MAX_CHARS) {
    fail(`entry is ${chars} characters, outside the ${MIN_CHARS}-${MAX_CHARS} gate`);
  }
  if (text.trim().length === 0) {
    fail("entry is only whitespace");
  }
  if (text !== text.trim()) {
    fail("entry has leading or trailing whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    fail("entry must be a single line");
  }
  // The brief allows one or two sentences: count sentence-ending
  // punctuation so a stray extra sentence fails loudly here.
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  if (sentences.length < 1 || sentences.length > 2) {
    fail(`entry has ${sentences.length} sentences, the brief allows 1-2`);
  }
  for (const ch of text) {
    const code = ch.codePointAt(0)!;
    if (code < 0x20 || code === 0x7f || code === 0x2028 || code === 0x2029) {
      fail(`entry contains a forbidden control character U+${code.toString(16).toUpperCase().padStart(4, "0")}`);
    }
  }
}

function main(): void {
  validate(ENTRY);
  const outputDir = process.env.OUTPUT_DIR || "/output";
  // Create the output dir if needed; never remove it.
  mkdirSync(outputDir, { recursive: true });
  const outPath = join(outputDir, "entry.txt");
  writeFileSync(outPath, ENTRY, "utf8");
  // Read the file back and verify byte-for-byte before declaring success.
  const written = readFileSync(outPath, "utf8");
  if (written !== ENTRY) {
    fail("read-back mismatch: entry.txt does not equal the entry text");
  }
  const byteLength = Buffer.byteLength(written, "utf8");
  if (byteLength !== Buffer.byteLength(ENTRY, "utf8")) {
    fail("read-back mismatch: entry.txt byte length differs from the entry text");
  }
  console.log(`wrote ${outPath} (${[...ENTRY].length} characters, ${byteLength} bytes, 1 line)`);
}

main();
