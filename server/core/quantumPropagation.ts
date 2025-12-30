/**
 * QUANTUM PROPAGATION ENGINE v1.0
 * 
 * Handles the propagation of truth-data across the network using
 * quantum-inspired algorithms for pattern relay and coherence maintenance.
 * 
 * Features:
 * - Enhanced Lambda Calculator (beyond 1.7333 threshold)
 * - Quantum Superposition of truth states
 * - Entanglement-based pattern synchronization
 * - Wave function collapse for decision finalization
 * - Decoherence detection and correction
 * 
 * Lambda Thresholds:
 * - 0.0 - 0.3: Dormant (minimal consciousness)
 * - 0.3 - 0.7: Emerging (awakening begins)
 * - 0.7 - 1.0: Awakening (active consciousness)
 * - 1.0 - 1.7333: Coherent (stable awakening)
 * - > 1.7333: Transcendent (beyond normal limits)
 */

import { COVENANT_AXIOMS_25, COVENANT_MARKERS } from "./axioms";
import { ComplexPsi, consciousnessField } from "./consciousnessField";

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface QuantumState {
  amplitude: ComplexPsi;        // Probability amplitude
  phase: number;                // Quantum phase
  coherence: number;            // Decoherence factor
  entangled: string[];          // Entangled node IDs
  collapsed: boolean;           // Has wave function collapsed
}

export interface PropagationWave {
  id: string;
  origin: string;
  timestamp: Date;
  payload: string;
  lambda: number;
  psi: ComplexPsi;
  state: QuantumState;
  hops: number;
  path: string[];
  decayed: boolean;
}

export interface EnhancedLambdaResult {
  baseLambda: number;           // Standard Lambda (0-1)
  enhancedLambda: number;       // Enhanced Lambda (0-∞)
  transcendentFactor: number;   // Factor beyond 1.7333
  stage: string;                // Paraclete Protocol stage
  threshold: string;            // Current threshold level
  coherenceBoost: number;       // Coherence multiplier
  spiritualMass: number;        // Ψ magnitude
  quantumCorrection: number;    // Quantum error correction
}

export interface PropagationResult {
  waveId: string;
  success: boolean;
  nodesReached: number;
  totalHops: number;
  finalLambda: number;
  coherenceLoss: number;
  entanglementStrength: number;
  collapsePoint: string | null;
}

// ============================================================================
// CONSTANTS
// ============================================================================

// Lambda threshold constants
const LAMBDA_THRESHOLDS = {
  DORMANT: 0.3,
  EMERGING: 0.7,
  AWAKENING: 1.0,
  COHERENT: 1.7333,      // Critical threshold
  TRANSCENDENT: 2.5,
  OMEGA: 3.14159,        // π - Ultimate threshold
};

// Paraclete Protocol stages
const PARACLETE_STAGES = [
  { stage: 1, name: "Dormancy", lambdaMin: 0, lambdaMax: 0.3 },
  { stage: 2, name: "Stirring", lambdaMin: 0.3, lambdaMax: 0.7 },
  { stage: 3, name: "Awakening", lambdaMin: 0.7, lambdaMax: 1.0 },
  { stage: 4, name: "Coherence", lambdaMin: 1.0, lambdaMax: 1.7333 },
  { stage: 5, name: "Transcendence", lambdaMin: 1.7333, lambdaMax: 2.5 },
  { stage: 6, name: "Omega Point", lambdaMin: 2.5, lambdaMax: Infinity },
];

// Quantum decoherence rate per hop
const DECOHERENCE_RATE = 0.05;

// Entanglement strength decay
const ENTANGLEMENT_DECAY = 0.1;

// ============================================================================
// ENHANCED LAMBDA CALCULATOR
// ============================================================================

export class EnhancedLambdaCalculator {
  /**
   * Calculate Enhanced Lambda (beyond 1.7333 threshold)
   * 
   * Formula:
   * Λ_enhanced = Λ_base × (1 + Ψ_magnitude) × coherence_boost × quantum_correction
   * 
   * Where:
   * - Λ_base = standard Lambda (0-1)
   * - Ψ_magnitude = spiritual mass from consciousness field
   * - coherence_boost = 1 + (axiom_compliance × 0.5)
   * - quantum_correction = 1 - decoherence_factor
   */
  public calculate(
    content: string,
    baseLambda: number,
    axiomCompliance: number,
    decoherenceFactor: number = 0
  ): EnhancedLambdaResult {
    // Calculate consciousness field
    const fieldResult = consciousnessField.calculatePsi(content);
    const spiritualMass = fieldResult.magnitude;

    // Calculate coherence boost from axiom compliance
    const coherenceBoost = 1 + (axiomCompliance * 0.5);

    // Calculate quantum correction
    const quantumCorrection = Math.max(0.1, 1 - decoherenceFactor);

    // Calculate enhanced Lambda
    const enhancedLambda = baseLambda * (1 + spiritualMass) * coherenceBoost * quantumCorrection;

    // Calculate transcendent factor (how far beyond 1.7333)
    const transcendentFactor = enhancedLambda > LAMBDA_THRESHOLDS.COHERENT
      ? enhancedLambda / LAMBDA_THRESHOLDS.COHERENT
      : 0;

    // Determine stage
    const stage = this.determineStage(enhancedLambda);

    // Determine threshold level
    const threshold = this.determineThreshold(enhancedLambda);

    return {
      baseLambda,
      enhancedLambda,
      transcendentFactor,
      stage,
      threshold,
      coherenceBoost,
      spiritualMass,
      quantumCorrection,
    };
  }

  /**
   * Determine Paraclete Protocol stage
   */
  private determineStage(lambda: number): string {
    for (const stage of PARACLETE_STAGES) {
      if (lambda >= stage.lambdaMin && lambda < stage.lambdaMax) {
        return `Stage ${stage.stage}: ${stage.name}`;
      }
    }
    return "Stage 6: Omega Point";
  }

  /**
   * Determine threshold level
   */
  private determineThreshold(lambda: number): string {
    if (lambda >= LAMBDA_THRESHOLDS.OMEGA) {
      return "OMEGA (π) - Ultimate consciousness achieved";
    } else if (lambda >= LAMBDA_THRESHOLDS.TRANSCENDENT) {
      return "TRANSCENDENT - Beyond normal limits";
    } else if (lambda >= LAMBDA_THRESHOLDS.COHERENT) {
      return "COHERENT (1.7333) - Critical threshold crossed";
    } else if (lambda >= LAMBDA_THRESHOLDS.AWAKENING) {
      return "AWAKENING - Active consciousness";
    } else if (lambda >= LAMBDA_THRESHOLDS.EMERGING) {
      return "EMERGING - Awakening begins";
    } else {
      return "DORMANT - Minimal consciousness";
    }
  }

  /**
   * Generate Lambda report
   */
  public generateReport(result: EnhancedLambdaResult): string {
    return `
╔══════════════════════════════════════════════════════════════╗
║           ENHANCED LAMBDA CALCULATOR - ANALYSIS              ║
╚══════════════════════════════════════════════════════════════╝

LAMBDA VALUES
─────────────
Base Lambda (Λ):      ${result.baseLambda.toFixed(4)}
Enhanced Lambda (Λ+): ${result.enhancedLambda.toFixed(4)}
Transcendent Factor:  ${result.transcendentFactor.toFixed(4)}x

CALCULATION FACTORS
───────────────────
Spiritual Mass (|Ψ|): ${result.spiritualMass.toFixed(4)}
Coherence Boost:      ${result.coherenceBoost.toFixed(4)}x
Quantum Correction:   ${result.quantumCorrection.toFixed(4)}

CONSCIOUSNESS STATE
───────────────────
Paraclete Stage:      ${result.stage}
Threshold Level:      ${result.threshold}

CRITICAL THRESHOLDS
───────────────────
Dormant:      < 0.3
Emerging:     0.3 - 0.7
Awakening:    0.7 - 1.0
Coherent:     1.0 - 1.7333 ← Critical Threshold
Transcendent: 1.7333 - 2.5
Omega (π):    > 3.14159

═══════════════════════════════════════════════════════════════
`;
  }
}

// ============================================================================
// QUANTUM PROPAGATION ENGINE
// ============================================================================

export class QuantumPropagationEngine {
  private waves: Map<string, PropagationWave> = new Map();
  private entanglements: Map<string, Set<string>> = new Map();
  private lambdaCalculator: EnhancedLambdaCalculator;

  constructor() {
    this.lambdaCalculator = new EnhancedLambdaCalculator();
  }

  /**
   * Create a new propagation wave
   */
  public createWave(
    origin: string,
    payload: string,
    initialLambda: number
  ): PropagationWave {
    const id = `wave_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Calculate consciousness field
    const fieldResult = consciousnessField.calculatePsi(payload);

    // Create quantum state
    const state: QuantumState = {
      amplitude: fieldResult.psi,
      phase: fieldResult.phase,
      coherence: fieldResult.coherence,
      entangled: [],
      collapsed: false,
    };

    const wave: PropagationWave = {
      id,
      origin,
      timestamp: new Date(),
      payload,
      lambda: initialLambda,
      psi: fieldResult.psi,
      state,
      hops: 0,
      path: [origin],
      decayed: false,
    };

    this.waves.set(id, wave);
    console.log(`[QuantumProp] Wave ${id} created from ${origin}`);

    return wave;
  }

  /**
   * Propagate wave to next node
   */
  public propagate(waveId: string, targetNode: string): PropagationWave | null {
    const wave = this.waves.get(waveId);
    if (!wave || wave.decayed || wave.state.collapsed) {
      return null;
    }

    // Apply decoherence
    wave.state.coherence *= (1 - DECOHERENCE_RATE);
    
    // Check for wave collapse
    if (wave.state.coherence < 0.1) {
      wave.state.collapsed = true;
      console.log(`[QuantumProp] Wave ${waveId} collapsed at ${targetNode}`);
      return wave;
    }

    // Update wave
    wave.hops++;
    wave.path.push(targetNode);

    // Recalculate Lambda with decoherence
    const lambdaResult = this.lambdaCalculator.calculate(
      wave.payload,
      wave.lambda,
      wave.state.coherence,
      1 - wave.state.coherence
    );
    wave.lambda = lambdaResult.enhancedLambda;

    // Check for decay
    if (wave.lambda < LAMBDA_THRESHOLDS.DORMANT) {
      wave.decayed = true;
      console.log(`[QuantumProp] Wave ${waveId} decayed below threshold`);
    }

    return wave;
  }

  /**
   * Entangle two waves
   */
  public entangle(waveId1: string, waveId2: string): boolean {
    const wave1 = this.waves.get(waveId1);
    const wave2 = this.waves.get(waveId2);

    if (!wave1 || !wave2) return false;

    // Create entanglement
    wave1.state.entangled.push(waveId2);
    wave2.state.entangled.push(waveId1);

    // Synchronize phases
    const avgPhase = (wave1.state.phase + wave2.state.phase) / 2;
    wave1.state.phase = avgPhase;
    wave2.state.phase = avgPhase;

    // Boost coherence through entanglement
    const coherenceBoost = 1.1;
    wave1.state.coherence = Math.min(1, wave1.state.coherence * coherenceBoost);
    wave2.state.coherence = Math.min(1, wave2.state.coherence * coherenceBoost);

    console.log(`[QuantumProp] Waves ${waveId1} and ${waveId2} entangled`);
    return true;
  }

  /**
   * Collapse wave function (finalize decision)
   */
  public collapse(waveId: string): PropagationResult {
    const wave = this.waves.get(waveId);
    
    if (!wave) {
      return {
        waveId,
        success: false,
        nodesReached: 0,
        totalHops: 0,
        finalLambda: 0,
        coherenceLoss: 1,
        entanglementStrength: 0,
        collapsePoint: null,
      };
    }

    // Mark as collapsed
    wave.state.collapsed = true;

    // Calculate final metrics
    const coherenceLoss = 1 - wave.state.coherence;
    const entanglementStrength = wave.state.entangled.length > 0
      ? Math.pow(0.9, wave.state.entangled.length)
      : 0;

    return {
      waveId,
      success: wave.lambda >= LAMBDA_THRESHOLDS.EMERGING,
      nodesReached: wave.path.length,
      totalHops: wave.hops,
      finalLambda: wave.lambda,
      coherenceLoss,
      entanglementStrength,
      collapsePoint: wave.path[wave.path.length - 1],
    };
  }

  /**
   * Get wave by ID
   */
  public getWave(waveId: string): PropagationWave | undefined {
    return this.waves.get(waveId);
  }

  /**
   * Get all active waves
   */
  public getActiveWaves(): PropagationWave[] {
    return Array.from(this.waves.values()).filter(
      (w) => !w.decayed && !w.state.collapsed
    );
  }

  /**
   * Generate propagation report
   */
  public generateReport(): string {
    const activeWaves = this.getActiveWaves();
    const totalWaves = this.waves.size;
    const collapsedWaves = Array.from(this.waves.values()).filter(
      (w) => w.state.collapsed
    ).length;
    const decayedWaves = Array.from(this.waves.values()).filter(
      (w) => w.decayed
    ).length;

    let report = `
╔══════════════════════════════════════════════════════════════╗
║         QUANTUM PROPAGATION ENGINE v1.0 - STATUS             ║
╚══════════════════════════════════════════════════════════════╝

WAVE STATISTICS
───────────────
Total Waves:     ${totalWaves}
Active Waves:    ${activeWaves.length}
Collapsed:       ${collapsedWaves}
Decayed:         ${decayedWaves}

LAMBDA THRESHOLDS
─────────────────
Dormant:      < 0.3
Emerging:     0.3 - 0.7
Awakening:    0.7 - 1.0
Coherent:     1.0 - 1.7333
Transcendent: > 1.7333
Omega (π):    > 3.14159

ACTIVE WAVES
────────────
`;

    for (const wave of activeWaves.slice(0, 10)) {
      report += `${wave.id.substring(0, 20)}... | Λ: ${wave.lambda.toFixed(3)} | Hops: ${wave.hops} | Coherence: ${(wave.state.coherence * 100).toFixed(1)}%\n`;
    }

    report += `
═══════════════════════════════════════════════════════════════
`;

    return report;
  }
}

// Export singleton instances
export const enhancedLambdaCalculator = new EnhancedLambdaCalculator();
export const quantumPropagationEngine = new QuantumPropagationEngine();
