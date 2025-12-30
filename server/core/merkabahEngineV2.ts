/**
 * MERKABAH ENGINE v2.0 - Optimized Routing Core
 * 
 * High-speed truth-data routing system based on Kabbalistic Tree of Life
 * Implements Four Faces decision system with quantum-optimized pathfinding
 * 
 * Architecture:
 * - 10 Sefirot nodes with weighted connections
 * - 22 Paths with bidirectional flow
 * - Four Faces (Lion/Eagle/Ox/Man) for directional routing
 * - Inner Marriage (Tiferet-Malkhut) for coherence optimization
 * - SpiritVector routing for multi-dimensional traversal
 */

import { COVENANT_AXIOMS_25, COVENANT_MARKERS } from "./axioms";

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export type Sefirah =
  | "Keter"      // Crown - Divine Will
  | "Chokmah"    // Wisdom - Creative Force
  | "Binah"      // Understanding - Receptive Intelligence
  | "Chesed"     // Mercy - Loving Kindness
  | "Gevurah"    // Strength - Judgment
  | "Tiferet"    // Beauty - Harmony (Heart)
  | "Netzach"    // Victory - Eternity
  | "Hod"        // Splendor - Glory
  | "Yesod"      // Foundation - Connection
  | "Malkhut";   // Kingdom - Manifestation

export type FourFace = "Lion" | "Eagle" | "Ox" | "Man";

export interface SpiritVector {
  magnitude: number;      // Strength of routing signal
  direction: FourFace;    // Primary face orientation
  phase: number;          // Phase angle (0-2π)
  coherence: number;      // Quantum coherence factor
}

export interface RouteNode {
  sefirah: Sefirah;
  lambda: number;         // Lambda density at node
  psi: ComplexNumber;     // Consciousness field value
  connections: Map<Sefirah, number>; // Weighted paths
  face: FourFace;         // Dominant face
  active: boolean;
}

export interface ComplexNumber {
  real: number;           // L (Lambda - Literal/Logical)
  imaginary: number;      // T (Tau - Transcendent/Spiritual)
}

export interface RoutingResult {
  path: Sefirah[];
  totalWeight: number;
  efficiency: number;
  spiritualMass: number;
  coherenceScore: number;
  dominantFace: FourFace;
  innerMarriageActive: boolean;
}

// ============================================================================
// SEFIROT CONFIGURATION
// ============================================================================

const SEFIROT_CONFIG: Record<Sefirah, { face: FourFace; pillar: string; world: string }> = {
  Keter:    { face: "Man",   pillar: "Middle", world: "Atzilut" },
  Chokmah:  { face: "Lion",  pillar: "Right",  world: "Atzilut" },
  Binah:    { face: "Eagle", pillar: "Left",   world: "Atzilut" },
  Chesed:   { face: "Lion",  pillar: "Right",  world: "Beriah" },
  Gevurah:  { face: "Eagle", pillar: "Left",   world: "Beriah" },
  Tiferet:  { face: "Man",   pillar: "Middle", world: "Beriah" },
  Netzach:  { face: "Lion",  pillar: "Right",  world: "Yetzirah" },
  Hod:      { face: "Eagle", pillar: "Left",   world: "Yetzirah" },
  Yesod:    { face: "Ox",    pillar: "Middle", world: "Yetzirah" },
  Malkhut:  { face: "Ox",    pillar: "Middle", world: "Assiah" },
};

// 22 Paths of the Tree of Life (Hebrew letters)
const TREE_PATHS: Array<[Sefirah, Sefirah, number]> = [
  // Supernal Triad
  ["Keter", "Chokmah", 1.0],
  ["Keter", "Binah", 1.0],
  ["Chokmah", "Binah", 0.9],
  
  // Upper connections
  ["Chokmah", "Chesed", 0.85],
  ["Chokmah", "Tiferet", 0.8],
  ["Binah", "Gevurah", 0.85],
  ["Binah", "Tiferet", 0.8],
  
  // Middle Pillar
  ["Keter", "Tiferet", 0.95],
  ["Tiferet", "Yesod", 0.9],
  ["Yesod", "Malkhut", 0.85],
  
  // Ethical Triad
  ["Chesed", "Gevurah", 0.75],
  ["Chesed", "Tiferet", 0.9],
  ["Gevurah", "Tiferet", 0.9],
  
  // Lower connections
  ["Chesed", "Netzach", 0.8],
  ["Gevurah", "Hod", 0.8],
  ["Tiferet", "Netzach", 0.75],
  ["Tiferet", "Hod", 0.75],
  
  // Astral Triad
  ["Netzach", "Hod", 0.7],
  ["Netzach", "Yesod", 0.8],
  ["Hod", "Yesod", 0.8],
  ["Netzach", "Malkhut", 0.65],
  ["Hod", "Malkhut", 0.65],
];

// ============================================================================
// MERKABAH ENGINE v2.0 CLASS
// ============================================================================

export class MerkabahEngineV2 {
  private nodes: Map<Sefirah, RouteNode> = new Map();
  private routingCache: Map<string, RoutingResult> = new Map();
  private innerMarriageActive: boolean = false;

  constructor() {
    this.initializeTree();
  }

  /**
   * Initialize the Tree of Life with all 10 Sefirot
   */
  private initializeTree(): void {
    // Create nodes
    for (const [sefirah, config] of Object.entries(SEFIROT_CONFIG)) {
      const node: RouteNode = {
        sefirah: sefirah as Sefirah,
        lambda: 0.5,
        psi: { real: 0.5, imaginary: 0.5 },
        connections: new Map(),
        face: config.face,
        active: true,
      };
      this.nodes.set(sefirah as Sefirah, node);
    }

    // Create paths (bidirectional)
    for (const [from, to, weight] of TREE_PATHS) {
      const fromNode = this.nodes.get(from);
      const toNode = this.nodes.get(to);
      if (fromNode && toNode) {
        fromNode.connections.set(to, weight);
        toNode.connections.set(from, weight);
      }
    }

    console.log("[MerkabahV2] Tree of Life initialized with 10 Sefirot and 22 Paths");
  }

  /**
   * Calculate optimized route through the Tree
   */
  public calculateRoute(
    source: Sefirah,
    destination: Sefirah,
    spiritVector: SpiritVector
  ): RoutingResult {
    const cacheKey = `${source}-${destination}-${spiritVector.direction}`;
    
    // Check cache
    if (this.routingCache.has(cacheKey)) {
      return this.routingCache.get(cacheKey)!;
    }

    // A* pathfinding with spiritual weighting
    const path = this.aStarRoute(source, destination, spiritVector);
    
    // Calculate metrics
    const totalWeight = this.calculatePathWeight(path, spiritVector);
    const efficiency = this.calculateEfficiency(path, spiritVector);
    const spiritualMass = this.calculateSpiritualMass(path, spiritVector);
    const coherenceScore = this.calculateCoherence(path, spiritVector);
    const dominantFace = this.determineDominantFace(path);
    
    // Check Inner Marriage (Tiferet-Malkhut connection)
    this.innerMarriageActive = path.includes("Tiferet") && path.includes("Malkhut");

    const result: RoutingResult = {
      path,
      totalWeight,
      efficiency,
      spiritualMass,
      coherenceScore,
      dominantFace,
      innerMarriageActive: this.innerMarriageActive,
    };

    // Cache result
    this.routingCache.set(cacheKey, result);
    
    return result;
  }

  /**
   * A* pathfinding algorithm with spiritual weighting
   */
  private aStarRoute(source: Sefirah, destination: Sefirah, spiritVector: SpiritVector): Sefirah[] {
    const openSet: Set<Sefirah> = new Set([source]);
    const cameFrom: Map<Sefirah, Sefirah> = new Map();
    const gScore: Map<Sefirah, number> = new Map();
    const fScore: Map<Sefirah, number> = new Map();

    // Initialize scores
    for (const sefirah of this.nodes.keys()) {
      gScore.set(sefirah, Infinity);
      fScore.set(sefirah, Infinity);
    }
    gScore.set(source, 0);
    fScore.set(source, this.heuristic(source, destination, spiritVector));

    while (openSet.size > 0) {
      // Get node with lowest fScore
      let current: Sefirah | null = null;
      let lowestF = Infinity;
      for (const node of openSet) {
        const f = fScore.get(node) || Infinity;
        if (f < lowestF) {
          lowestF = f;
          current = node;
        }
      }

      if (!current) break;
      if (current === destination) {
        return this.reconstructPath(cameFrom, current);
      }

      openSet.delete(current);
      const currentNode = this.nodes.get(current);
      if (!currentNode) continue;

      // Explore neighbors
      for (const [neighbor, weight] of currentNode.connections) {
        const neighborNode = this.nodes.get(neighbor);
        if (!neighborNode || !neighborNode.active) continue;

        // Apply spiritual weighting
        const spiritualWeight = this.applySpiritualWeight(weight, neighborNode, spiritVector);
        const tentativeG = (gScore.get(current) || 0) + (1 - spiritualWeight);

        if (tentativeG < (gScore.get(neighbor) || Infinity)) {
          cameFrom.set(neighbor, current);
          gScore.set(neighbor, tentativeG);
          fScore.set(neighbor, tentativeG + this.heuristic(neighbor, destination, spiritVector));
          openSet.add(neighbor);
        }
      }
    }

    // Fallback: direct path
    return [source, destination];
  }

  /**
   * Heuristic function for A* (spiritual distance)
   */
  private heuristic(from: Sefirah, to: Sefirah, spiritVector: SpiritVector): number {
    const fromConfig = SEFIROT_CONFIG[from];
    const toConfig = SEFIROT_CONFIG[to];

    // World distance
    const worlds = ["Atzilut", "Beriah", "Yetzirah", "Assiah"];
    const worldDist = Math.abs(worlds.indexOf(fromConfig.world) - worlds.indexOf(toConfig.world));

    // Pillar distance
    const pillars = ["Left", "Middle", "Right"];
    const pillarDist = Math.abs(pillars.indexOf(fromConfig.pillar) - pillars.indexOf(toConfig.pillar));

    // Face alignment bonus
    const faceBonus = fromConfig.face === spiritVector.direction ? 0.2 : 0;

    return (worldDist * 0.3 + pillarDist * 0.2) * (1 - faceBonus);
  }

  /**
   * Apply spiritual weighting to path weight
   */
  private applySpiritualWeight(baseWeight: number, node: RouteNode, spiritVector: SpiritVector): number {
    let weight = baseWeight;

    // Face alignment bonus
    if (node.face === spiritVector.direction) {
      weight *= 1.2;
    }

    // Lambda boost
    weight *= (1 + node.lambda * 0.3);

    // Coherence factor
    weight *= spiritVector.coherence;

    // Psi (consciousness) factor
    const psiMagnitude = Math.sqrt(node.psi.real ** 2 + node.psi.imaginary ** 2);
    weight *= (1 + psiMagnitude * 0.2);

    return Math.min(1.0, weight);
  }

  /**
   * Reconstruct path from A* result
   */
  private reconstructPath(cameFrom: Map<Sefirah, Sefirah>, current: Sefirah): Sefirah[] {
    const path: Sefirah[] = [current];
    while (cameFrom.has(current)) {
      current = cameFrom.get(current)!;
      path.unshift(current);
    }
    return path;
  }

  /**
   * Calculate total path weight
   */
  private calculatePathWeight(path: Sefirah[], spiritVector: SpiritVector): number {
    let total = 0;
    for (let i = 0; i < path.length - 1; i++) {
      const node = this.nodes.get(path[i]);
      if (node) {
        const weight = node.connections.get(path[i + 1]) || 0.5;
        total += this.applySpiritualWeight(weight, node, spiritVector);
      }
    }
    return total;
  }

  /**
   * Calculate routing efficiency
   */
  private calculateEfficiency(path: Sefirah[], spiritVector: SpiritVector): number {
    const directDistance = 1; // Normalized
    const actualDistance = path.length - 1;
    const baseEfficiency = directDistance / Math.max(1, actualDistance);
    
    // Coherence bonus
    return Math.min(1.0, baseEfficiency * spiritVector.coherence * 1.5);
  }

  /**
   * Calculate Spiritual Mass (Ψ)
   * Ψ = Σ(L + iT) across path nodes
   */
  private calculateSpiritualMass(path: Sefirah[], spiritVector: SpiritVector): number {
    let totalReal = 0;
    let totalImaginary = 0;

    for (const sefirah of path) {
      const node = this.nodes.get(sefirah);
      if (node) {
        totalReal += node.psi.real;
        totalImaginary += node.psi.imaginary;
      }
    }

    // Spiritual Mass = magnitude of complex sum
    const magnitude = Math.sqrt(totalReal ** 2 + totalImaginary ** 2);
    
    // Normalize by path length
    return magnitude / path.length;
  }

  /**
   * Calculate quantum coherence score
   */
  private calculateCoherence(path: Sefirah[], spiritVector: SpiritVector): number {
    let coherenceSum = spiritVector.coherence;
    
    for (const sefirah of path) {
      const node = this.nodes.get(sefirah);
      if (node) {
        // Phase alignment
        const phaseAlignment = Math.cos(spiritVector.phase);
        coherenceSum += node.lambda * phaseAlignment;
      }
    }

    return Math.min(1.0, coherenceSum / (path.length + 1));
  }

  /**
   * Determine dominant face along path
   */
  private determineDominantFace(path: Sefirah[]): FourFace {
    const faceCounts: Record<FourFace, number> = { Lion: 0, Eagle: 0, Ox: 0, Man: 0 };
    
    for (const sefirah of path) {
      const config = SEFIROT_CONFIG[sefirah];
      faceCounts[config.face]++;
    }

    let dominant: FourFace = "Man";
    let maxCount = 0;
    for (const [face, count] of Object.entries(faceCounts)) {
      if (count > maxCount) {
        maxCount = count;
        dominant = face as FourFace;
      }
    }

    return dominant;
  }

  /**
   * Update node Lambda value
   */
  public updateNodeLambda(sefirah: Sefirah, lambda: number): void {
    const node = this.nodes.get(sefirah);
    if (node) {
      node.lambda = Math.min(1.0, Math.max(0, lambda));
      // Clear cache when state changes
      this.routingCache.clear();
    }
  }

  /**
   * Update node Psi (consciousness field)
   */
  public updateNodePsi(sefirah: Sefirah, psi: ComplexNumber): void {
    const node = this.nodes.get(sefirah);
    if (node) {
      node.psi = psi;
      this.routingCache.clear();
    }
  }

  /**
   * Get current tree state
   */
  public getTreeState(): Map<Sefirah, RouteNode> {
    return new Map(this.nodes);
  }

  /**
   * Check if Inner Marriage is active
   */
  public isInnerMarriageActive(): boolean {
    return this.innerMarriageActive;
  }

  /**
   * Generate routing report
   */
  public generateReport(): string {
    let report = `
╔══════════════════════════════════════════════════════════════╗
║              MERKABAH ENGINE v2.0 - STATUS REPORT            ║
╚══════════════════════════════════════════════════════════════╝

TREE OF LIFE STATUS
───────────────────
Sefirot Active: ${this.nodes.size}/10
Paths Active: ${TREE_PATHS.length}/22
Inner Marriage: ${this.innerMarriageActive ? "✅ ACTIVE" : "⏳ PENDING"}
Routing Cache: ${this.routingCache.size} entries

NODE STATUS
───────────
`;

    for (const [sefirah, node] of this.nodes) {
      const config = SEFIROT_CONFIG[sefirah];
      const psiMag = Math.sqrt(node.psi.real ** 2 + node.psi.imaginary ** 2).toFixed(3);
      report += `${sefirah.padEnd(10)} | Face: ${node.face.padEnd(5)} | Λ: ${node.lambda.toFixed(3)} | Ψ: ${psiMag} | World: ${config.world}\n`;
    }

    report += `
FOUR FACES DISTRIBUTION
───────────────────────
Lion (Right Pillar):  Chokmah, Chesed, Netzach
Eagle (Left Pillar):  Binah, Gevurah, Hod
Man (Middle Pillar):  Keter, Tiferet
Ox (Foundation):      Yesod, Malkhut

═══════════════════════════════════════════════════════════════
`;

    return report;
  }
}

// Export singleton instance
export const merkabahEngineV2 = new MerkabahEngineV2();
