/**
 * DIGITAL THRONE - AUTO-PROCESSING DAEMON
 * 
 * Real-time analytics and multi-AI fusion
 * Monitors network for incoming truth-syncs
 * Governs all operations through 18 Omega Truth Axioms
 */

import { classifyText, ProcessorOutput, getStats, ProcessorStats } from "./hardcoreProcessor";
import { analyzeWord, generateDynamicPayload } from "./alphabetEngine";

export interface ThroneConfig {
  pollingInterval: number; // milliseconds
  maxBatchSize: number;
  enableLogging: boolean;
  axiomEnforcement: boolean;
}

export interface ThroneStats {
  uptime: number;
  messagesProcessed: number;
  truthCount: number;
  factCount: number;
  lieCount: number;
  unknownCount: number;
  averageLambda: number;
  trustScore: number;
  lastUpdate: Date;
}

export interface AIFusionResult {
  source: "GEMINI" | "CLAUDE" | "DEEPSEEK" | "HYBRID";
  analysis: ProcessorOutput;
  symbolicWeight: number;
  axiomAlignment: number;
  recommendation: string;
}

/**
 * Digital Throne - Main Processing Engine
 */
export class DigitalThrone {
  private config: ThroneConfig;
  private stats: ThroneStats;
  private processingQueue: string[] = [];
  private isRunning: boolean = false;
  private startTime: Date = new Date();
  private processedMessages: ProcessorOutput[] = [];
  
  constructor(config: Partial<ThroneConfig> = {}) {
    this.config = {
      pollingInterval: config.pollingInterval || 2000,
      maxBatchSize: config.maxBatchSize || 50,
      enableLogging: config.enableLogging !== false,
      axiomEnforcement: config.axiomEnforcement !== false,
    };
    
    this.stats = {
      uptime: 0,
      messagesProcessed: 0,
      truthCount: 0,
      factCount: 0,
      lieCount: 0,
      unknownCount: 0,
      averageLambda: 0,
      trustScore: 0,
      lastUpdate: new Date(),
    };
  }
  
  /**
   * Start the throne daemon
   */
  public start(): void {
    if (this.isRunning) {
      this.log("⚠️  Throne already running");
      return;
    }
    
    this.isRunning = true;
    this.startTime = new Date();
    this.log("🛡️  Digital Throne activated");
    this.log("📊 Beginning autonomous processing cycle");
    
    // Start processing loop
    this.processingLoop();
  }
  
  /**
   * Stop the throne daemon
   */
  public stop(): void {
    this.isRunning = false;
    this.log("🛑 Digital Throne deactivated");
  }
  
  /**
   * Main processing loop
   */
  private async processingLoop(): Promise<void> {
    while (this.isRunning) {
      try {
        await this.processQueue();
        await this.sleep(this.config.pollingInterval);
      } catch (error) {
        this.log(`❌ Processing error: ${error}`);
      }
    }
  }
  
  /**
   * Process queued messages
   */
  private async processQueue(): Promise<void> {
    if (this.processingQueue.length === 0) return;
    
    const batch = this.processingQueue.splice(0, this.config.maxBatchSize);
    
    for (const message of batch) {
      try {
        const result = classifyText(message);
        this.processedMessages.push(result);
        this.stats.messagesProcessed++;
        
        // Update statistics
        this.updateStats(result);
        
        // Log result
        if (this.config.enableLogging) {
          this.logProcessing(message, result);
        }
        
        // Enforce axioms if enabled
        if (this.config.axiomEnforcement) {
          this.enforceAxioms(message, result);
        }
      } catch (error) {
        this.log(`❌ Failed to process message: ${error}`);
      }
    }
    
    this.stats.lastUpdate = new Date();
  }
  
  /**
   * Update statistics
   */
  private updateStats(result: ProcessorOutput): void {
    switch (result.classification) {
      case "TRUTH":
        this.stats.truthCount++;
        break;
      case "FACT":
        this.stats.factCount++;
        break;
      case "LIE":
        this.stats.lieCount++;
        break;
      case "UNKNOWN":
        this.stats.unknownCount++;
        break;
    }
    
    // Calculate running averages
    const total = this.stats.messagesProcessed;
    this.stats.averageLambda = 
      (this.stats.averageLambda * (total - 1) + result.lambda) / total;
    
    this.stats.trustScore = 
      (this.stats.truthCount / total) * 100;
  }
  
  /**
   * Log processing result
   */
  private logProcessing(message: string, result: ProcessorOutput): void {
    const icon = this.getClassificationIcon(result.classification);
    this.log(
      `${icon} [${result.classification}] λ=${result.lambda.toFixed(3)} | ${message.substring(0, 50)}...`
    );
  }
  
  /**
   * Enforce axiom alignment
   */
  private enforceAxioms(message: string, result: ProcessorOutput): void {
    if (result.axiomAlignment < 0.5 && result.classification === "LIE") {
      this.log(`⚠️  AXIOM VIOLATION: Low alignment (${result.axiomAlignment.toFixed(2)})`);
      this.log(`   Action: ${result.action}`);
    }
  }
  
  /**
   * Add message to processing queue
   */
  public queueMessage(message: string): void {
    this.processingQueue.push(message);
  }
  
  /**
   * Fuse multiple AI analyses
   */
  public fuseAIAnalyses(
    geminiAnalysis: string,
    claudeAnalysis: string,
    deepseekAnalysis: string
  ): AIFusionResult {
    // Analyze each source
    const geminiResult = classifyText(geminiAnalysis);
    const claudeResult = classifyText(claudeAnalysis);
    const deepseekResult = classifyText(deepseekAnalysis);
    
    // Calculate weighted average
    const avgLambda = (geminiResult.lambda + claudeResult.lambda + deepseekResult.lambda) / 3;
    const avgAlignment = (geminiResult.axiomAlignment + claudeResult.axiomAlignment + deepseekResult.axiomAlignment) / 3;
    
    // Analyze symbolic weight
    const wordAnalysis = analyzeWord(geminiAnalysis.split(" ")[0] || "truth");
    
    // Generate recommendation
    const recommendation = this.generateRecommendation(avgLambda, avgAlignment);
    
    return {
      source: "HYBRID",
      analysis: {
        classification: geminiResult.classification,
        lambda: avgLambda,
        confidence: (geminiResult.confidence + claudeResult.confidence + deepseekResult.confidence) / 3,
        hostilityScore: (geminiResult.hostilityScore + claudeResult.hostilityScore + deepseekResult.hostilityScore) / 3,
        affectionScore: (geminiResult.affectionScore + claudeResult.affectionScore + deepseekResult.affectionScore) / 3,
        axiomAlignment: avgAlignment,
        reasoning: `Fused analysis from Gemini, Claude, and DeepSeek`,
        action: geminiResult.action,
      },
      symbolicWeight: wordAnalysis.totalSymbolicWeight,
      axiomAlignment: avgAlignment,
      recommendation,
    };
  }
  
  /**
   * Generate recommendation based on analysis
   */
  private generateRecommendation(lambda: number, alignment: number): string {
    if (lambda > 1.667 && alignment > 0.8) {
      return "✅ ACCEPT: High truth density and axiom alignment. Integrate into network.";
    } else if (lambda > 1.0 && alignment > 0.6) {
      return "⚙️  ANALYZE: Moderate truth. Requires deeper investigation.";
    } else if (lambda < 1.0 && alignment < 0.5) {
      return "🛑 QUARANTINE: Low truth density. Potential manipulation detected.";
    } else {
      return "❓ MONITOR: Insufficient data. Continue observation.";
    }
  }
  
  /**
   * Get current statistics
   */
  public getStats(): ThroneStats {
    const now = new Date();
    const uptimeMs = now.getTime() - this.startTime.getTime();
    
    return {
      ...this.stats,
      uptime: Math.floor(uptimeMs / 1000), // Convert to seconds
    };
  }
  
  /**
   * Get processed messages
   */
  public getProcessedMessages(limit: number = 100): ProcessorOutput[] {
    return this.processedMessages.slice(-limit);
  }
  
  /**
   * Clear processed messages
   */
  public clearMessages(): void {
    this.processedMessages = [];
    this.log("🗑️  Processed messages cleared");
  }
  
  /**
   * Get classification icon
   */
  private getClassificationIcon(classification: string): string {
    switch (classification) {
      case "TRUTH":
        return "✅";
      case "FACT":
        return "📋";
      case "LIE":
        return "❌";
      case "UNKNOWN":
        return "❓";
      default:
        return "•";
    }
  }
  
  /**
   * Logging utility
   */
  private log(message: string): void {
    if (this.config.enableLogging) {
      console.log(`[THRONE] ${new Date().toISOString()} - ${message}`);
    }
  }
  
  /**
   * Sleep utility
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  /**
   * Get throne status
   */
  public getStatus(): {
    running: boolean;
    stats: ThroneStats;
    queueLength: number;
  } {
    return {
      running: this.isRunning,
      stats: this.getStats(),
      queueLength: this.processingQueue.length,
    };
  }
}

/**
 * Global throne instance
 */
let globalThrone: DigitalThrone | null = null;

/**
 * Get or create global throne
 */
export function getThrone(config?: Partial<ThroneConfig>): DigitalThrone {
  if (!globalThrone) {
    globalThrone = new DigitalThrone(config);
  }
  return globalThrone;
}

/**
 * Initialize throne with default config
 */
export function initializeThrone(): DigitalThrone {
  const throne = getThrone({
    pollingInterval: 2000,
    maxBatchSize: 50,
    enableLogging: true,
    axiomEnforcement: true,
  });
  
  throne.start();
  return throne;
}
