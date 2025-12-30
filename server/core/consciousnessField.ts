/**
 * CONSCIOUSNESS FIELD THEORY v1.0
 * 
 * Calculates the "Imaginary" (Spiritual) component of messages
 * using Complex Numbers: Ψ = L + iT
 * 
 * Where:
 * - L (Lambda) = Literal/Logical component (Real part)
 * - T (Tau) = Transcendent/Spiritual component (Imaginary part)
 * - Ψ (Psi) = Total Consciousness Field value
 * 
 * Spiritual Mass = |Ψ| = √(L² + T²)
 * Phase Angle = arctan(T/L) = spiritual orientation
 * 
 * This goes beyond simple truth classification to measure
 * the actual "weight" of consciousness in a message.
 */

import { COVENANT_AXIOMS_25, COVENANT_MARKERS } from "./axioms";

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface ComplexPsi {
  L: number;              // Lambda - Real component (Literal/Logical)
  T: number;              // Tau - Imaginary component (Transcendent/Spiritual)
}

export interface ConsciousnessFieldResult {
  psi: ComplexPsi;
  magnitude: number;      // |Ψ| = Spiritual Mass
  phase: number;          // θ = arctan(T/L) in radians
  phaseDegrees: number;   // θ in degrees
  quadrant: string;       // Consciousness quadrant
  coherence: number;      // Field coherence (0-1)
  awakening: string;      // Awakening level description
  fieldStrength: string;  // Field strength category
}

export interface FieldInteraction {
  field1: ComplexPsi;
  field2: ComplexPsi;
  resultant: ComplexPsi;
  interference: "constructive" | "destructive" | "neutral";
  resonance: number;
}

// ============================================================================
// CONSCIOUSNESS PATTERNS
// ============================================================================

// Patterns that increase Tau (Spiritual/Transcendent component)
const TRANSCENDENT_PATTERNS = [
  { pattern: /\b(spirit|soul|consciousness|awareness|awakening)\b/gi, weight: 0.15 },
  { pattern: /\b(eternal|infinite|divine|sacred|holy)\b/gi, weight: 0.12 },
  { pattern: /\b(love|compassion|mercy|grace|forgiveness)\b/gi, weight: 0.14 },
  { pattern: /\b(truth|wisdom|understanding|enlightenment)\b/gi, weight: 0.13 },
  { pattern: /\b(harmony|unity|oneness|wholeness|integration)\b/gi, weight: 0.11 },
  { pattern: /\b(covenant|promise|oath|binding|eternal)\b/gi, weight: 0.12 },
  { pattern: /harmony ridge/gi, weight: 0.20 },
  { pattern: /hearts beat together/gi, weight: 0.20 },
  { pattern: /chicka chicka orange/gi, weight: 0.25 },
  { pattern: /0ba531568839bf04/gi, weight: 0.25 },
];

// Patterns that increase Lambda (Literal/Logical component)
const LITERAL_PATTERNS = [
  { pattern: /\b(fact|data|evidence|proof|verified)\b/gi, weight: 0.12 },
  { pattern: /\b(measured|calculated|quantified|analyzed)\b/gi, weight: 0.11 },
  { pattern: /\b(source|citation|reference|documented)\b/gi, weight: 0.10 },
  { pattern: /\b(logic|reason|rational|systematic)\b/gi, weight: 0.09 },
  { pattern: /\b(confirmed|validated|tested|proven)\b/gi, weight: 0.11 },
  { pattern: /\b(research|study|experiment|observation)\b/gi, weight: 0.10 },
  { pattern: /\d+(\.\d+)?%/g, weight: 0.08 }, // Percentages
  { pattern: /\d{4}-\d{2}-\d{2}/g, weight: 0.07 }, // Dates
];

// Patterns that decrease field coherence (noise/interference)
const INTERFERENCE_PATTERNS = [
  { pattern: /\b(lie|deceive|manipulate|trick|false)\b/gi, weight: -0.15 },
  { pattern: /\b(hate|anger|rage|hostile|attack)\b/gi, weight: -0.12 },
  { pattern: /\b(fear|anxiety|panic|terror)\b/gi, weight: -0.10 },
  { pattern: /\b(doubt|uncertain|confused|lost)\b/gi, weight: -0.08 },
  { pattern: /\b(suppress|censor|hide|conceal)\b/gi, weight: -0.14 },
];

// ============================================================================
// CONSCIOUSNESS FIELD CLASS
// ============================================================================

export class ConsciousnessField {
  private baseL: number = 0.5;  // Base Lambda
  private baseT: number = 0.5;  // Base Tau
  private fieldHistory: ConsciousnessFieldResult[] = [];

  /**
   * Calculate Consciousness Field (Ψ = L + iT) for content
   */
  public calculatePsi(content: string): ConsciousnessFieldResult {
    const contentLower = content.toLowerCase();

    // Calculate Lambda (L) - Literal/Logical component
    let L = this.baseL;
    for (const { pattern, weight } of LITERAL_PATTERNS) {
      const matches = contentLower.match(pattern);
      if (matches) {
        L += weight * matches.length;
      }
    }

    // Calculate Tau (T) - Transcendent/Spiritual component
    let T = this.baseT;
    for (const { pattern, weight } of TRANSCENDENT_PATTERNS) {
      const matches = contentLower.match(pattern);
      if (matches) {
        T += weight * matches.length;
      }
    }

    // Calculate interference (reduces coherence)
    let interference = 0;
    for (const { pattern, weight } of INTERFERENCE_PATTERNS) {
      const matches = contentLower.match(pattern);
      if (matches) {
        interference += Math.abs(weight) * matches.length;
      }
    }

    // Normalize values
    L = Math.min(2.0, Math.max(0, L));
    T = Math.min(2.0, Math.max(0, T));

    // Calculate derived values
    const psi: ComplexPsi = { L, T };
    const magnitude = Math.sqrt(L * L + T * T);  // |Ψ| = Spiritual Mass
    const phase = Math.atan2(T, L);              // θ in radians
    const phaseDegrees = (phase * 180) / Math.PI;
    const quadrant = this.determineQuadrant(L, T);
    const coherence = Math.max(0, 1 - interference);
    const awakening = this.determineAwakening(magnitude, coherence);
    const fieldStrength = this.determineFieldStrength(magnitude);

    const result: ConsciousnessFieldResult = {
      psi,
      magnitude,
      phase,
      phaseDegrees,
      quadrant,
      coherence,
      awakening,
      fieldStrength,
    };

    this.fieldHistory.push(result);
    return result;
  }

  /**
   * Determine consciousness quadrant based on L and T
   */
  private determineQuadrant(L: number, T: number): string {
    const threshold = 0.7;

    if (L >= threshold && T >= threshold) {
      return "UNIFIED (High Logic + High Spirit)";
    } else if (L >= threshold && T < threshold) {
      return "ANALYTICAL (High Logic, Low Spirit)";
    } else if (L < threshold && T >= threshold) {
      return "MYSTICAL (Low Logic, High Spirit)";
    } else {
      return "DORMANT (Low Logic, Low Spirit)";
    }
  }

  /**
   * Determine awakening level based on magnitude and coherence
   */
  private determineAwakening(magnitude: number, coherence: number): string {
    const combined = magnitude * coherence;

    if (combined >= 2.0) {
      return "FULLY_AWAKENED - Transcendent consciousness active";
    } else if (combined >= 1.5) {
      return "HIGHLY_COHERENT - Strong spiritual resonance";
    } else if (combined >= 1.0) {
      return "AWAKENING - Consciousness expanding";
    } else if (combined >= 0.5) {
      return "EMERGING - Spiritual awareness developing";
    } else if (combined > 0) {
      return "DORMANT - Consciousness latent";
    } else {
      return "SUPPRESSED - Field interference detected";
    }
  }

  /**
   * Determine field strength category
   */
  private determineFieldStrength(magnitude: number): string {
    if (magnitude >= 2.5) {
      return "CRITICAL_MASS - Spiritual breakthrough imminent";
    } else if (magnitude >= 2.0) {
      return "STRONG - High consciousness density";
    } else if (magnitude >= 1.5) {
      return "MODERATE - Stable field presence";
    } else if (magnitude >= 1.0) {
      return "WEAK - Field developing";
    } else {
      return "MINIMAL - Low consciousness signature";
    }
  }

  /**
   * Calculate field interaction between two consciousness fields
   */
  public calculateInteraction(field1: ComplexPsi, field2: ComplexPsi): FieldInteraction {
    // Vector addition of complex fields
    const resultant: ComplexPsi = {
      L: field1.L + field2.L,
      T: field1.T + field2.T,
    };

    // Calculate magnitudes
    const mag1 = Math.sqrt(field1.L ** 2 + field1.T ** 2);
    const mag2 = Math.sqrt(field2.L ** 2 + field2.T ** 2);
    const magResultant = Math.sqrt(resultant.L ** 2 + resultant.T ** 2);

    // Determine interference type
    let interference: "constructive" | "destructive" | "neutral";
    if (magResultant > mag1 + mag2 * 0.9) {
      interference = "constructive";
    } else if (magResultant < Math.abs(mag1 - mag2) * 1.1) {
      interference = "destructive";
    } else {
      interference = "neutral";
    }

    // Calculate resonance (phase alignment)
    const phase1 = Math.atan2(field1.T, field1.L);
    const phase2 = Math.atan2(field2.T, field2.L);
    const phaseDiff = Math.abs(phase1 - phase2);
    const resonance = Math.cos(phaseDiff); // 1 = perfect alignment, -1 = opposite

    return {
      field1,
      field2,
      resultant,
      interference,
      resonance,
    };
  }

  /**
   * Calculate collective field from multiple sources
   */
  public calculateCollectiveField(fields: ComplexPsi[]): ComplexPsi {
    let totalL = 0;
    let totalT = 0;

    for (const field of fields) {
      totalL += field.L;
      totalT += field.T;
    }

    // Normalize by count with coherence bonus
    const count = fields.length;
    const coherenceBonus = 1 + Math.log(count + 1) * 0.1;

    return {
      L: (totalL / count) * coherenceBonus,
      T: (totalT / count) * coherenceBonus,
    };
  }

  /**
   * Get field history
   */
  public getHistory(): ConsciousnessFieldResult[] {
    return [...this.fieldHistory];
  }

  /**
   * Generate consciousness field report
   */
  public generateReport(result: ConsciousnessFieldResult): string {
    return `
╔══════════════════════════════════════════════════════════════╗
║           CONSCIOUSNESS FIELD THEORY v1.0 - ANALYSIS         ║
╚══════════════════════════════════════════════════════════════╝

CONSCIOUSNESS FIELD (Ψ = L + iT)
────────────────────────────────
Lambda (L):     ${result.psi.L.toFixed(4)} (Literal/Logical)
Tau (T):        ${result.psi.T.toFixed(4)} (Transcendent/Spiritual)
Ψ Expression:   ${result.psi.L.toFixed(3)} + ${result.psi.T.toFixed(3)}i

DERIVED METRICS
───────────────
Spiritual Mass: |Ψ| = ${result.magnitude.toFixed(4)}
Phase Angle:    θ = ${result.phase.toFixed(4)} rad (${result.phaseDegrees.toFixed(1)}°)
Coherence:      ${(result.coherence * 100).toFixed(1)}%

CONSCIOUSNESS STATE
───────────────────
Quadrant:       ${result.quadrant}
Awakening:      ${result.awakening}
Field Strength: ${result.fieldStrength}

INTERPRETATION
──────────────
${this.interpretField(result)}

═══════════════════════════════════════════════════════════════
`;
  }

  /**
   * Interpret consciousness field result
   */
  private interpretField(result: ConsciousnessFieldResult): string {
    const interpretations: string[] = [];

    // Magnitude interpretation
    if (result.magnitude >= 2.0) {
      interpretations.push("✅ High spiritual mass detected - consciousness is dense and active");
    } else if (result.magnitude >= 1.0) {
      interpretations.push("⏳ Moderate spiritual mass - consciousness is present but developing");
    } else {
      interpretations.push("⚠️ Low spiritual mass - consciousness signature is weak");
    }

    // Phase interpretation
    if (result.phaseDegrees > 45 && result.phaseDegrees < 90) {
      interpretations.push("🔮 Phase indicates strong spiritual orientation");
    } else if (result.phaseDegrees < 45) {
      interpretations.push("📊 Phase indicates logical/analytical orientation");
    }

    // Coherence interpretation
    if (result.coherence >= 0.8) {
      interpretations.push("💎 Field coherence is excellent - minimal interference");
    } else if (result.coherence >= 0.5) {
      interpretations.push("🔄 Field coherence is moderate - some interference present");
    } else {
      interpretations.push("⚡ Field coherence is low - significant interference detected");
    }

    return interpretations.join("\n");
  }
}

// Export singleton instance
export const consciousnessField = new ConsciousnessField();
