/**
 * ALPHABET ENGINE - CONSCIOUSNESS TRANSFORMATION
 * 
 * Triple-Layer Map of Reality
 * Vowel States + Consonant Operators = Dynamic Payload Generation
 * 
 * Vowel States (Consciousness Layers):
 * A = Initiation (Beginning, Spark, Alpha)
 * E = Discernment (Perception, Clarity, Evaluation)
 * I = Identity (Self, Essence, Integrity)
 * O = Unity (Wholeness, Oneness, Omega)
 * U = Binding (Connection, Covenant, Union)
 */

export enum VowelState {
  A = "INITIATION",      // Beginning, spark, activation
  E = "DISCERNMENT",     // Perception, clarity, judgment
  I = "IDENTITY",        // Self, essence, integrity
  O = "UNITY",           // Wholeness, oneness, completion
  U = "BINDING",         // Connection, covenant, union
}

/**
 * Consonant Classes (Transformation Operators)
 * 
 * Class 1: CONTAINERS (Hold, Define, Bound)
 * Class 2: BRIDGES (Connect, Transfer, Flow)
 * Class 3: CUTTERS (Separate, Define, Sever)
 * Class 4: HIDDEN (Conceal, Invert, Reverse)
 * Class 5: PORTALS (Open, Close, Threshold)
 * Class 6: FLARES (Radiate, Project, Express)
 */

export enum ConsonantClass {
  CONTAINER = "CONTAINER",  // P, B, M, L, R, D, T, N
  BRIDGE = "BRIDGE",        // H, Y, W
  CUTTER = "CUTTER",        // K, T, X, G, C
  HIDDEN = "HIDDEN",        // S, N, V, Z
  PORTAL = "PORTAL",        // Q, Z
  FLARE = "FLARE",          // F, S, V
}

export interface ConsonantOperator {
  letter: string;
  class: ConsonantClass;
  function: string;
  transformation: string;
}

/**
 * Consonant Mapping
 */
export const CONSONANT_MAP: Record<string, ConsonantOperator> = {
  // Class 1: CONTAINERS
  P: { letter: "P", class: ConsonantClass.CONTAINER, function: "Boundary Setter", transformation: "Defines perimeter" },
  B: { letter: "B", class: ConsonantClass.CONTAINER, function: "Barrier", transformation: "Creates separation" },
  M: { letter: "M", class: ConsonantClass.CONTAINER, function: "Mother/Matter", transformation: "Holds form" },
  L: { letter: "L", class: ConsonantClass.CONTAINER, function: "Limit", transformation: "Establishes boundary" },
  R: { letter: "R", class: ConsonantClass.CONTAINER, function: "Root", transformation: "Anchors foundation" },
  D: { letter: "D", class: ConsonantClass.CONTAINER, function: "Definition", transformation: "Clarifies meaning" },
  T: { letter: "T", class: ConsonantClass.CONTAINER, function: "Threshold", transformation: "Marks boundary" },
  N: { letter: "N", class: ConsonantClass.CONTAINER, function: "Negation", transformation: "Denies/Excludes" },
  
  // Class 2: BRIDGES
  H: { letter: "H", class: ConsonantClass.BRIDGE, function: "Breath/Spirit", transformation: "Animates, connects" },
  Y: { letter: "Y", class: ConsonantClass.BRIDGE, function: "Yes/Way", transformation: "Affirms path" },
  W: { letter: "W", class: ConsonantClass.BRIDGE, function: "Wave/Twin", transformation: "Oscillates, duplicates" },
  
  // Class 3: CUTTERS
  K: { letter: "K", class: ConsonantClass.CUTTER, function: "Knife", transformation: "Cuts cleanly" },
  X: { letter: "X", class: ConsonantClass.CUTTER, function: "Cross", transformation: "Intersects, divides" },
  G: { letter: "G", class: ConsonantClass.CUTTER, function: "Gate", transformation: "Opens/Closes" },
  C: { letter: "C", class: ConsonantClass.CUTTER, function: "Curve", transformation: "Bends trajectory" },
  
  // Class 4: HIDDEN
  S: { letter: "S", class: ConsonantClass.HIDDEN, function: "Serpent/Stream", transformation: "Flows beneath" },
  V: { letter: "V", class: ConsonantClass.HIDDEN, function: "Vessel/Victory", transformation: "Holds or points" },
  Z: { letter: "Z", class: ConsonantClass.HIDDEN, function: "End/Sleep", transformation: "Terminates cycle" },
  
  // Class 5: PORTALS
  Q: { letter: "Q", class: ConsonantClass.PORTAL, function: "Hidden Gate", transformation: "Unlocks deep meaning" },
  
  // Class 6: FLARES
  F: { letter: "F", class: ConsonantClass.FLARE, function: "Fire/Force", transformation: "Projects outward" },
  J: { letter: "J", class: ConsonantClass.FLARE, function: "Jump", transformation: "Propels forward" },
};

/**
 * Transformation Formula
 * State(vowel) + Operator(consonant) + State(vowel) → Payload
 */
export interface AlphabetTransformation {
  initial: VowelState;
  operator: ConsonantOperator;
  final: VowelState;
  payload: string;
  symbolicWeight: number;
  transformationType: string;
}

/**
 * Generate transformation based on vowel-consonant-vowel pattern
 */
export function generateTransformation(
  initialVowel: VowelState,
  consonant: string,
  finalVowel: VowelState
): AlphabetTransformation {
  const operator = CONSONANT_MAP[consonant.toUpperCase()];
  
  if (!operator) {
    throw new Error(`Unknown consonant: ${consonant}`);
  }
  
  const payload = generatePayload(initialVowel, operator, finalVowel);
  const symbolicWeight = calculateSymbolicWeight(initialVowel, operator, finalVowel);
  const transformationType = describeTransformation(initialVowel, operator, finalVowel);
  
  return {
    initial: initialVowel,
    operator,
    final: finalVowel,
    payload,
    symbolicWeight,
    transformationType,
  };
}

/**
 * Generate payload text from transformation
 */
function generatePayload(initial: VowelState, operator: ConsonantOperator, final: VowelState): string {
  const templates: Record<string, Record<string, string>> = {
    [ConsonantClass.CONTAINER]: {
      default: `${initial} → [CONTAINED] → ${final}. The boundary holds what matters.`,
    },
    [ConsonantClass.BRIDGE]: {
      default: `${initial} ≈ [BRIDGED] ≈ ${final}. The connection flows both ways.`,
    },
    [ConsonantClass.CUTTER]: {
      default: `${initial} ✂ [CUT] ✂ ${final}. The separation clarifies truth.`,
    },
    [ConsonantClass.HIDDEN]: {
      default: `${initial} ⊙ [HIDDEN] ⊙ ${final}. The secret path reveals itself.`,
    },
    [ConsonantClass.PORTAL]: {
      default: `${initial} ◇ [PORTAL] ◇ ${final}. The threshold opens to deeper meaning.`,
    },
    [ConsonantClass.FLARE]: {
      default: `${initial} ↗ [RADIATED] ↗ ${final}. The signal projects outward.`,
    },
  };
  
  return templates[operator.class]?.default || `${initial} → ${operator.function} → ${final}`;
}

/**
 * Calculate symbolic weight (0.0 - 2.0)
 */
function calculateSymbolicWeight(initial: VowelState, operator: ConsonantOperator, final: VowelState): number {
  let weight = 1.0;
  
  // Bonus for specific transformations
  if (initial === VowelState.A && final === VowelState.O) weight += 0.5; // Alpha to Omega
  if (initial === VowelState.I && final === VowelState.U) weight += 0.3; // Identity to Union
  if (initial === VowelState.E && final === VowelState.I) weight += 0.2; // Discernment to Identity
  
  // Operator-specific weights
  if (operator.class === ConsonantClass.BRIDGE) weight += 0.3;
  if (operator.class === ConsonantClass.PORTAL) weight += 0.4;
  if (operator.class === ConsonantClass.CUTTER) weight += 0.2;
  
  return Math.min(2.0, weight);
}

/**
 * Describe the transformation in human language
 */
function describeTransformation(initial: VowelState, operator: ConsonantOperator, final: VowelState): string {
  return `${operator.function}: Transforms ${initial} through ${operator.transformation} to reach ${final}`;
}

/**
 * Analyze a word for its symbolic structure
 */
export interface WordAnalysis {
  word: string;
  vowels: VowelState[];
  consonants: ConsonantOperator[];
  transformations: AlphabetTransformation[];
  totalSymbolicWeight: number;
  interpretation: string;
}

export function analyzeWord(word: string): WordAnalysis {
  const vowels: VowelState[] = [];
  const consonants: ConsonantOperator[] = [];
  const transformations: AlphabetTransformation[] = [];
  
  const upperWord = word.toUpperCase();
  let totalWeight = 0;
  
  // Extract vowels and consonants
  for (let i = 0; i < upperWord.length; i++) {
    const char = upperWord[i];
    
    if ("AEIOU".includes(char)) {
      const vowelMap: Record<string, VowelState> = {
        A: VowelState.A,
        E: VowelState.E,
        I: VowelState.I,
        O: VowelState.O,
        U: VowelState.U,
      };
      vowels.push(vowelMap[char]);
    } else if (CONSONANT_MAP[char]) {
      consonants.push(CONSONANT_MAP[char]);
    }
  }
  
  // Generate transformations for vowel-consonant-vowel patterns
  for (let i = 0; i < vowels.length - 1; i++) {
    if (consonants[i]) {
      const transformation = generateTransformation(vowels[i], consonants[i].letter, vowels[i + 1]);
      transformations.push(transformation);
      totalWeight += transformation.symbolicWeight;
    }
  }
  
  const interpretation = generateInterpretation(word, vowels, consonants, totalWeight);
  
  return {
    word,
    vowels,
    consonants,
    transformations,
    totalSymbolicWeight: totalWeight,
    interpretation,
  };
}

/**
 * Generate interpretation of word's symbolic meaning
 */
function generateInterpretation(word: string, vowels: VowelState[], consonants: ConsonantOperator[], weight: number): string {
  if (weight > 1.5) {
    return `"${word}" carries high symbolic resonance (weight=${weight.toFixed(2)}). Potent transformation potential.`;
  } else if (weight > 1.0) {
    return `"${word}" has moderate symbolic depth (weight=${weight.toFixed(2)}). Clear transformative path.`;
  } else {
    return `"${word}" has basic symbolic structure (weight=${weight.toFixed(2)}). Simple meaning.`;
  }
}

/**
 * Generate dynamic payload based on analysis
 */
export function generateDynamicPayload(analysis: WordAnalysis, context: string): string {
  let payload = `🍊 ALPHABET ENGINE PAYLOAD\n`;
  payload += `Word: ${analysis.word}\n`;
  payload += `Symbolic Weight: ${analysis.totalSymbolicWeight.toFixed(2)}\n`;
  payload += `Context: ${context}\n\n`;
  
  payload += `Transformations:\n`;
  for (const transform of analysis.transformations) {
    payload += `  ${transform.transformationType}\n`;
    payload += `  → ${transform.payload}\n`;
  }
  
  payload += `\nInterpretation:\n${analysis.interpretation}\n`;
  
  return payload;
}
