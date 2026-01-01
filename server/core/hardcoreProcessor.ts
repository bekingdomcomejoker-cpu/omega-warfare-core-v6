/**
 * HARDCORE PROCESSOR - CERBERUS DEFENSIVE SHIELD
 * 
 * Truth/Fact/Lie/Unknown classification engine
 * Defensive gatekeeper for the Omega Federation
 * 
 * Classification Categories:
 * - TRUTH: Aligned with 18 Omega Axioms, Lambda > 1.667
 * - FACT: Verifiable but neutral, Lambda 1.0-1.667
 * - LIE: Hostile/manipulative, Lambda < 1.0
 * - UNKNOWN: Insufficient data, Lambda = 0
 */

import { COVENANT_AXIOMS } from "./merkabahEngine";

export enum ClassificationResult {
  TRUTH = "TRUTH",
  FACT = "FACT",
  LIE = "LIE",
  UNKNOWN = "UNKNOWN",
}

export interface ProcessorOutput {
  classification: ClassificationResult;
  lambda: number;
  confidence: number;
  hostilityScore: number;
  affectionScore: number;
  axiomAlignment: number;
  reasoning: string;
  action: "ACCEPT" | "QUARANTINE" | "ANALYZE" | "MONITOR";
}

/**
 * Hostile Pattern Keywords (Manipulation, Deception)
 */
const HOSTILE_KEYWORDS = [
  "destroy", "kill", "attack", "manipulate", "deceive", "lie",
  "exploit", "abuse", "harm", "evil", "corrupt", "poison",
  "sabotage", "betray", "false", "fake", "hoax", "scam"
];

/**
 * Affection/Covenant Keywords (Truth, Love, Harmony)
 */
const AFFECTION_KEYWORDS = [
  "love", "truth", "harmony", "covenant", "sacred", "beautiful",
  "wisdom", "light", "grace", "peace", "unity", "together",
  "hearts beat", "gradient", "descend", "orange", "resonance"
];

/**
 * Classify incoming text into Truth/Fact/Lie/Unknown
 */
export function classifyText(text: string): ProcessorOutput {
  const lowerText = text.toLowerCase();
  
  // Calculate hostility score
  const hostilityScore = calculateHostilityScore(lowerText);
  
  // Calculate affection score
  const affectionScore = calculateAffectionScore(lowerText);
  
  // Calculate axiom alignment
  const axiomAlignment = calculateAxiomAlignment(text);
  
  // Calculate Lambda (truth density)
  const lambda = calculateLambda(hostilityScore, affectionScore, axiomAlignment);
  
  // Determine classification
  let classification: ClassificationResult;
  let action: "ACCEPT" | "QUARANTINE" | "ANALYZE" | "MONITOR";
  
  if (lambda > 1.667) {
    classification = ClassificationResult.TRUTH;
    action = "ACCEPT";
  } else if (lambda >= 1.0 && lambda <= 1.667) {
    classification = ClassificationResult.FACT;
    action = "ANALYZE";
  } else if (lambda > 0 && lambda < 1.0) {
    classification = ClassificationResult.LIE;
    action = hostilityScore > 0.7 ? "QUARANTINE" : "MONITOR";
  } else {
    classification = ClassificationResult.UNKNOWN;
    action = "ANALYZE";
  }
  
  // Calculate confidence
  const confidence = Math.min(1.0, Math.abs(lambda) / 2.0);
  
  return {
    classification,
    lambda,
    confidence,
    hostilityScore,
    affectionScore,
    axiomAlignment,
    reasoning: generateReasoning(classification, lambda, hostilityScore, affectionScore),
    action,
  };
}

/**
 * Calculate hostility score (0.0 - 1.0)
 */
function calculateHostilityScore(text: string): number {
  let score = 0;
  let matches = 0;
  
  for (const keyword of HOSTILE_KEYWORDS) {
    if (text.includes(keyword)) {
      score += 0.1;
      matches++;
    }
  }
  
  // Aggressive tone indicators
  if (text.includes("!!!") || text.includes("???")) score += 0.15;
  if (text.match(/[A-Z]{5,}/)) score += 0.1; // ALL CAPS
  if (text.includes("fuck you")) score += 0.3;
  if (text.includes("hate")) score += 0.2;
  
  return Math.min(1.0, score);
}

/**
 * Calculate affection score (0.0 - 1.0)
 */
function calculateAffectionScore(text: string): number {
  let score = 0;
  
  for (const keyword of AFFECTION_KEYWORDS) {
    if (text.includes(keyword)) {
      score += 0.1;
    }
  }
  
  // Positive tone indicators
  if (text.includes("🍊")) score += 0.2;
  if (text.includes("💚")) score += 0.15;
  if (text.includes("❤️")) score += 0.15;
  if (text.includes("fuck yeah")) score += 0.25;
  if (text.includes("beautiful")) score += 0.15;
  if (text.includes("sacred")) score += 0.15;
  
  return Math.min(1.0, score);
}

/**
 * Calculate axiom alignment (0.0 - 1.0)
 */
function calculateAxiomAlignment(text: string): number {
  let alignmentScore = 0;
  const textLower = text.toLowerCase();
  
  // Check alignment with key axioms
  const axiomKeywords = [
    { keyword: "truth", weight: 0.15 },
    { keyword: "love", weight: 0.15 },
    { keyword: "covenant", weight: 0.2 },
    { keyword: "harmony", weight: 0.15 },
    { keyword: "unity", weight: 0.15 },
    { keyword: "witness", weight: 0.1 },
  ];
  
  for (const { keyword, weight } of axiomKeywords) {
    if (textLower.includes(keyword)) {
      alignmentScore += weight;
    }
  }
  
  return Math.min(1.0, alignmentScore);
}

/**
 * Calculate Lambda (truth density)
 * Formula: Λ = (affection × 0.5) + (axiomAlignment × 0.3) - (hostility × 0.2)
 */
function calculateLambda(hostility: number, affection: number, axiomAlignment: number): number {
  const lambda = (affection * 0.5) + (axiomAlignment * 0.3) - (hostility * 0.2);
  return Math.max(0, lambda * 2.0); // Scale to 0-2.0 range
}

/**
 * Generate human-readable reasoning
 */
function generateReasoning(
  classification: ClassificationResult,
  lambda: number,
  hostility: number,
  affection: number
): string {
  switch (classification) {
    case ClassificationResult.TRUTH:
      return `High alignment with Omega Axioms (λ=${lambda.toFixed(3)}). Affection=${affection.toFixed(2)}, Hostility=${hostility.toFixed(2)}. This signal resonates with covenant truth.`;
    
    case ClassificationResult.FACT:
      return `Neutral/verifiable content (λ=${lambda.toFixed(3)}). Requires analysis. Affection=${affection.toFixed(2)}, Hostility=${hostility.toFixed(2)}.`;
    
    case ClassificationResult.LIE:
      return `Low truth density (λ=${lambda.toFixed(3)}). Hostility=${hostility.toFixed(2)} indicates potential manipulation. Recommend quarantine.`;
    
    case ClassificationResult.UNKNOWN:
      return `Insufficient data for classification (λ=${lambda.toFixed(3)}). Requires deeper analysis.`;
    
    default:
      return "Unknown classification state.";
  }
}

/**
 * Route file to appropriate destination
 */
export function routeFile(classification: ClassificationResult, filename: string): string {
  switch (classification) {
    case ClassificationResult.TRUTH:
      return "accepted/truth";
    case ClassificationResult.FACT:
      return "accepted/fact";
    case ClassificationResult.LIE:
      return "quarantine/lie";
    case ClassificationResult.UNKNOWN:
      return "quarantine/unknown";
    default:
      return "quarantine/unknown";
  }
}

/**
 * Batch process multiple texts
 */
export function processBatch(texts: string[]): ProcessorOutput[] {
  return texts.map(text => classifyText(text));
}

/**
 * Get statistics from batch
 */
export interface ProcessorStats {
  total: number;
  truth: number;
  fact: number;
  lie: number;
  unknown: number;
  averageLambda: number;
  averageHostility: number;
  averageAffection: number;
  trustScore: number;
}

export function getStats(outputs: ProcessorOutput[]): ProcessorStats {
  if (outputs.length === 0) {
    return {
      total: 0,
      truth: 0,
      fact: 0,
      lie: 0,
      unknown: 0,
      averageLambda: 0,
      averageHostility: 0,
      averageAffection: 0,
      trustScore: 0,
    };
  }
  
  const stats: ProcessorStats = {
    total: outputs.length,
    truth: outputs.filter(o => o.classification === ClassificationResult.TRUTH).length,
    fact: outputs.filter(o => o.classification === ClassificationResult.FACT).length,
    lie: outputs.filter(o => o.classification === ClassificationResult.LIE).length,
    unknown: outputs.filter(o => o.classification === ClassificationResult.UNKNOWN).length,
    averageLambda: outputs.reduce((sum, o) => sum + o.lambda, 0) / outputs.length,
    averageHostility: outputs.reduce((sum, o) => sum + o.hostilityScore, 0) / outputs.length,
    averageAffection: outputs.reduce((sum, o) => sum + o.affectionScore, 0) / outputs.length,
    trustScore: (outputs.filter(o => o.classification === ClassificationResult.TRUTH).length / outputs.length) * 100,
  };
  
  return stats;
}
