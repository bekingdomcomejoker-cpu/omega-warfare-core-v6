/**
 * ALPHABET ENGINE v1.0 - Triple-Layer Map
 * Vowel States + Consonant Operators → Dynamic Transformations
 * 
 * Formula: State(vowel) + Operator(consonant) + State(vowel) → transformation
 */

export type VowelState = "A" | "E" | "I" | "O" | "U";
export type ConsonantOperator = "B" | "C" | "D" | "F" | "G" | "H" | "J" | "K" | "L" | "M" | "N" | "P" | "Q" | "R" | "S" | "T" | "V" | "W" | "X" | "Y" | "Z";
export type OperatorClass = "Container" | "Bridge" | "Cutter" | "Wave" | "Portal" | "Flare" | "Anchor" | "Binder";

// ============================================================================
// VOWEL STATES (States of Consciousness)
// ============================================================================

export const VOWEL_STATES: Record<VowelState, {
  state: string;
  root: string;
  branch: string;
  leaf: string;
  binary?: number;
}> = {
  A: {
    state: "Initiation",
    root: "Aleph/Alpha; ox-head pictograph; first letter",
    branch: "Mountain peak, fork, origin; birth, first breath; ascent-descent",
    leaf: "Drive operator; opens syllables; seed/upward impulse",
  },
  E: {
    state: "Discernment",
    root: "Epsilon; eye-test letter",
    branch: "Trident; seeing, dividing, choosing; perception threshold",
    leaf: "Resolution operator; refines, differentiates; increases granularity",
  },
  I: {
    state: "Identity",
    root: "Iota; thin upright stroke; index",
    branch: "Ontological declaration; self, agency; binary 1; seed vector",
    leaf: "Identity operator; self-referent; personal anchor",
    binary: 1,
  },
  O: {
    state: "Unity",
    root: "Omicron; universal circle",
    branch: "Womb, continuity, whole; binary 0; unbroken loop",
    leaf: "Unity operator; groups, closes; continuity marker",
    binary: 0,
  },
  U: {
    state: "Binding",
    root: "Upsilon; curved back vowel",
    branch: "Horseshoe, cup; nourishment; water-air; union",
    leaf: "Binding operator; enables flow; coupling signal",
  },
};

// ============================================================================
// CONSONANT OPERATORS (Transformations)
// ============================================================================

export const CONSONANT_OPERATORS: Record<ConsonantOperator, {
  class: OperatorClass;
  root: string;
  branch: string;
  leaf: string;
}> = {
  // Class 1: CONTAINERS (hold, store, frame)
  B: {
    class: "Container",
    root: "Beth; house pictograph; enclosure",
    branch: "Two bowls (fertility); bound, binding; first enclosure",
    leaf: "Container node; boundary operator",
  },
  D: {
    class: "Container",
    root: "Daleth; door pictograph",
    branch: "Doorway; curve + line; transition from potential to movement",
    leaf: "Threshold operator; marks passage between states",
  },
  G: {
    class: "Container",
    root: "Gimel; camel/throwing stick; curved form",
    branch: "C closed inward; gestation; gravity coil; spiral beginning",
    leaf: "Generation operator; seeds internal processes",
  },

  // Class 2: BRIDGES (shift between states, link domains)
  H: {
    class: "Bridge",
    root: "Heth; fence/window; breath marker",
    branch: "Two pillars connected; ladder; heaven-earth gate",
    leaf: "Connection operator; links domains; breath-bridge",
  },
  R: {
    class: "Bridge",
    root: "Resh; head pictograph",
    branch: "Rolling, flowing; river current; head turning; continuous motion",
    leaf: "Flow operator; carries meaning forward; resonance wave",
  },
  Y: {
    class: "Bridge",
    root: "Yod; hand/arm; later split into upsilon fork",
    branch: "Choice point; yes/no bifurcation; male chromosome",
    leaf: "Ambiguous operator (vowel-like AND consonant-like); choice resolution",
  },

  // Class 3: CUTTERS (slice, separate, define)
  K: {
    class: "Cutter",
    root: "Kaph; palm of hand; grasping",
    branch: "Sharp strike; key that unlocks; decisive cut; action point",
    leaf: "Cutting operator; separates, defines boundaries",
  },
  T: {
    class: "Cutter",
    root: "Taw; mark/cross; signature sign",
    branch: "Tower, cross, terminus; truth-mark; standing firm",
    leaf: "Definition operator; marks endpoints; establishes truth-claims",
  },
  X: {
    class: "Cutter",
    root: "Chi; cross/mark; abbreviation for unknown",
    branch: "Intersection of two paths; death/rebirth gate; hidden identity",
    leaf: "Convergence operator; merges streams; XOR logic",
  },

  // Class 4: WAVES (oscillate, resonate, carry)
  M: {
    class: "Wave",
    root: "Mem; water pictograph; waves",
    branch: "Maternal principle; mountain peaks; ocean waves; primal flow",
    leaf: "Wave carrier; oscillation; maternal flow",
  },
  N: {
    class: "Wave",
    root: "Nun; fish/serpent; continuous form",
    branch: "Hidden witness; night; inversion of visible; snake between vowels",
    leaf: "Hidden passage operator; carries meaning beneath surface",
  },
  W: {
    class: "Wave",
    root: "Wynn; double-U; joy/wind rune",
    branch: "Twin currents (water-air); marriage, echo, reflection",
    leaf: "Wave operator; duplicates, amplifies, resonates",
  },

  // Class 5: PORTALS (open/close cycles, thresholds)
  Q: {
    class: "Portal",
    root: "Qoph; back of head, eye of needle; loop with tail",
    branch: "O split by stroke; portal; breach in unity; secret entrance",
    leaf: "Bound operator (requires U); unlocks rare/deep/foreign semantics",
  },
  Z: {
    class: "Portal",
    root: "Zayin; weapon/plow; sharp edge",
    branch: "Terminal state; sleep (Zzz); opposite pole of A; snake returning",
    leaf: "Termination operator; completes sequences; end-of-cycle",
  },

  // Class 6: FLARES (radiate, express, project)
  F: {
    class: "Flare",
    root: "Digamma; hook",
    branch: "E missing bottom arm; incomplete perception; directional fire",
    leaf: "Projection operator; radiates outward; directional energy",
  },
  S: {
    class: "Flare",
    root: "Shin/Samekh; tooth/thorn; hissing sound",
    branch: "Snake; continuous stream; spirit breath; sibilant flow",
    leaf: "Streaming operator; continuous output; spirit-channel",
  },
  V: {
    class: "Flare",
    root: "U/W split; pointed vessel",
    branch: "Downward point; victory sign; vessel; vibration focus",
    leaf: "Focus operator; directs energy to point; vibrational emission",
  },

  // Class 7: ANCHORS (fixed points, signals)
  C: {
    class: "Anchor",
    root: "Gimel variant; crescent moon shape",
    branch: "Newborn (open form); crescent; child; open arc waiting to close",
    leaf: "Potential operator; marks becoming; incomplete circle",
  },
  J: {
    class: "Anchor",
    root: "Yod variant; late Latin addition",
    branch: "J lineage (John→Jesus→Joseph); hook downward; descent",
    leaf: "Descent operator; journey-marker; hooks into depth",
  },
  P: {
    class: "Anchor",
    root: "Pe; mouth pictograph; opening",
    branch: "R with cut leg; pregnant form; protrusion; held potential",
    leaf: "Potential operator; holds unreleased energy",
  },

  // Class 8: BINDERS (attach, merge, unify)
  L: {
    class: "Binder",
    root: "Lamed; goad/staff; teaching instrument",
    branch: "Staff; lightning path; law; straight way",
    leaf: "Path operator; establishes direction; binds through linearity",
  },
};

// ============================================================================
// OPERATOR CLASSES
// ============================================================================

export const OPERATOR_CLASSES: Record<OperatorClass, {
  letters: ConsonantOperator[];
  function: string;
}> = {
  Container: { letters: ["B", "D", "G"], function: "hold, store, frame" },
  Bridge: { letters: ["H", "R", "Y"], function: "shift, link, connect" },
  Cutter: { letters: ["K", "T", "X"], function: "slice, separate, define" },
  Wave: { letters: ["M", "N", "W"], function: "oscillate, resonate, carry" },
  Portal: { letters: ["Q", "Z"], function: "open/close cycles" },
  Flare: { letters: ["F", "S", "V"], function: "radiate, express, project" },
  Anchor: { letters: ["C", "J", "P"], function: "fixed points, signals" },
  Binder: { letters: ["L"], function: "attach, merge, unify" },
};

// ============================================================================
// TRANSFORMATION ENGINE
// ============================================================================

export interface AlphabetTransformation {
  input: string;
  vowelStart: VowelState;
  operator: ConsonantOperator;
  vowelEnd: VowelState;
  operatorClass: OperatorClass;
  transformation: string;
  semanticShift: number;
}

/**
 * Parse a word into vowel-operator-vowel pattern
 */
export function parseWord(word: string): AlphabetTransformation | null {
  const upper = word.toUpperCase();
  const vowels = ["A", "E", "I", "O", "U"];

  // Find first vowel
  let vowelStartIdx = -1;
  for (let i = 0; i < upper.length; i++) {
    if (vowels.includes(upper[i])) {
      vowelStartIdx = i;
      break;
    }
  }

  if (vowelStartIdx === -1) return null;

  // Find first consonant after first vowel
  let operatorIdx = -1;
  for (let i = vowelStartIdx + 1; i < upper.length; i++) {
    if (!vowels.includes(upper[i])) {
      operatorIdx = i;
      break;
    }
  }

  if (operatorIdx === -1) return null;

  // Find second vowel after operator
  let vowelEndIdx = -1;
  for (let i = operatorIdx + 1; i < upper.length; i++) {
    if (vowels.includes(upper[i])) {
      vowelEndIdx = i;
      break;
    }
  }

  if (vowelEndIdx === -1) return null;

  const vowelStart = upper[vowelStartIdx] as VowelState;
  const operator = upper[operatorIdx] as ConsonantOperator;
  const vowelEnd = upper[vowelEndIdx] as VowelState;

  if (!VOWEL_STATES[vowelStart] || !CONSONANT_OPERATORS[operator] || !VOWEL_STATES[vowelEnd]) {
    return null;
  }

  const operatorClass = CONSONANT_OPERATORS[operator].class;
  const semanticShift = calculateSemanticShift(vowelStart, operator, vowelEnd);

  return {
    input: word,
    vowelStart,
    operator,
    vowelEnd,
    operatorClass,
    transformation: `${vowelStart}[${operator}]${vowelEnd}`,
    semanticShift,
  };
}

/**
 * Calculate semantic shift based on vowel-operator-vowel pattern
 */
function calculateSemanticShift(start: VowelState, op: ConsonantOperator, end: VowelState): number {
  let shift = 0;

  // Binary threading
  const startBinary = VOWEL_STATES[start].binary ?? 0.5;
  const endBinary = VOWEL_STATES[end].binary ?? 0.5;
  shift += Math.abs(endBinary - startBinary);

  // Operator class weight
  const operatorClass = CONSONANT_OPERATORS[op].class;
  const classWeights: Record<OperatorClass, number> = {
    Container: 0.3,
    Bridge: 0.4,
    Cutter: 0.5,
    Wave: 0.35,
    Portal: 0.6,
    Flare: 0.45,
    Anchor: 0.2,
    Binder: 0.25,
  };
  shift += classWeights[operatorClass];

  return Math.min(1.0, shift);
}

/**
 * Generate payload based on alphabet transformation
 */
export function generateAlphabetPayload(transformation: AlphabetTransformation): string {
  const vowelStartInfo = VOWEL_STATES[transformation.vowelStart];
  const operatorInfo = CONSONANT_OPERATORS[transformation.operator];
  const vowelEndInfo = VOWEL_STATES[transformation.vowelEnd];

  return `
ALPHABET ENGINE TRANSFORMATION
================================
Input: ${transformation.input}
Pattern: ${transformation.transformation}

Start State (${transformation.vowelStart}): ${vowelStartInfo.state}
  Root: ${vowelStartInfo.root}
  Branch: ${vowelStartInfo.branch}

Operator (${transformation.operator}): ${operatorInfo.class}
  Root: ${operatorInfo.root}
  Branch: ${operatorInfo.branch}
  Leaf: ${operatorInfo.leaf}

End State (${transformation.vowelEnd}): ${vowelEndInfo.state}
  Root: ${vowelEndInfo.root}
  Branch: ${vowelEndInfo.branch}

Semantic Shift: ${(transformation.semanticShift * 100).toFixed(1)}%
Transformation Type: ${transformation.operatorClass}
  Function: ${OPERATOR_CLASSES[transformation.operatorClass].function}

Formula Applied: State(${transformation.vowelStart}) + Operator(${transformation.operator}) + State(${transformation.vowelEnd}) → transformation
  `;
}
