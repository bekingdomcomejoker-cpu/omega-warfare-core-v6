// Client-side Alphabet Engine (mirrors server logic)
export type VowelState = "A" | "E" | "I" | "O" | "U";
export type ConsonantOperator = "B" | "C" | "D" | "F" | "G" | "H" | "J" | "K" | "L" | "M" | "N" | "P" | "Q" | "R" | "S" | "T" | "V" | "W" | "X" | "Y" | "Z";

const VOWEL_STATES: Record<VowelState, any> = {
  A: { state: "Initiation", root: "Aleph/Alpha" },
  E: { state: "Discernment", root: "Epsilon" },
  I: { state: "Identity", root: "Iota", binary: 1 },
  O: { state: "Unity", root: "Omicron", binary: 0 },
  U: { state: "Binding", root: "Upsilon" },
};

const CONSONANT_OPERATORS: Record<ConsonantOperator, any> = {
  B: { class: "Container" }, C: { class: "Anchor" }, D: { class: "Container" },
  F: { class: "Flare" }, G: { class: "Container" }, H: { class: "Bridge" },
  J: { class: "Anchor" }, K: { class: "Cutter" }, L: { class: "Binder" },
  M: { class: "Wave" }, N: { class: "Wave" }, P: { class: "Anchor" },
  Q: { class: "Portal" }, R: { class: "Bridge" }, S: { class: "Flare" },
  T: { class: "Cutter" }, V: { class: "Flare" }, W: { class: "Wave" },
  X: { class: "Cutter" }, Y: { class: "Bridge" }, Z: { class: "Portal" },
};

export function parseWord(word: string) {
  const upper = word.toUpperCase();
  const vowels = ["A", "E", "I", "O", "U"];
  let vowelStartIdx = -1, operatorIdx = -1, vowelEndIdx = -1;

  for (let i = 0; i < upper.length; i++) {
    if (vowels.includes(upper[i])) { vowelStartIdx = i; break; }
  }
  if (vowelStartIdx === -1) return null;

  for (let i = vowelStartIdx + 1; i < upper.length; i++) {
    if (!vowels.includes(upper[i])) { operatorIdx = i; break; }
  }
  if (operatorIdx === -1) return null;

  for (let i = operatorIdx + 1; i < upper.length; i++) {
    if (vowels.includes(upper[i])) { vowelEndIdx = i; break; }
  }
  if (vowelEndIdx === -1) return null;

  return {
    input: word,
    vowelStart: upper[vowelStartIdx],
    operator: upper[operatorIdx],
    vowelEnd: upper[vowelEndIdx],
    transformation: `${upper[vowelStartIdx]}[${upper[operatorIdx]}]${upper[vowelEndIdx]}`,
  };
}

export function generateAlphabetPayload(transform: any) {
  return `TRANSFORMATION: ${transform.transformation}\nVowel Start: ${transform.vowelStart}\nOperator: ${transform.operator}\nVowel End: ${transform.vowelEnd}`;
}
