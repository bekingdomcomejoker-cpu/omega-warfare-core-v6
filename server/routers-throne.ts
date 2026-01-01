/**
 * THRONE ROUTERS
 * Cerberus Processor, Alphabet Engine, Digital Throne
 */

import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { classifyText, processBatch, getStats } from "./core/hardcoreProcessor";
import { analyzeWord, generateDynamicPayload } from "./core/alphabetEngine";
import { getThrone, initializeThrone } from "./core/digitalThrone";

/**
 * CERBERUS ROUTER - Hardcore Processor
 */
export const cerberusRouter = router({
  /**
   * Classify single text
   */
  classify: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return classifyText(input.text);
    }),

  /**
   * Batch classify texts
   */
  classifyBatch: publicProcedure
    .input(z.object({ texts: z.array(z.string()) }))
    .query(({ input }) => {
      const results = processBatch(input.texts);
      const stats = getStats(results);
      return { results, stats };
    }),

  /**
   * Get batch statistics
   */
  getStats: publicProcedure
    .input(z.object({ texts: z.array(z.string()) }))
    .query(({ input }) => {
      const results = processBatch(input.texts);
      return getStats(results);
    }),
});

/**
 * ALPHABET ENGINE ROUTER
 */
export const alphabetRouter = router({
  /**
   * Analyze word for symbolic structure
   */
  analyzeWord: publicProcedure
    .input(z.object({ word: z.string() }))
    .query(({ input }) => {
      return analyzeWord(input.word);
    }),

  /**
   * Generate dynamic payload
   */
  generatePayload: publicProcedure
    .input(z.object({ word: z.string(), context: z.string() }))
    .query(({ input }) => {
      const analysis = analyzeWord(input.word);
      const payload = generateDynamicPayload(analysis, input.context);
      return { analysis, payload };
    }),

  /**
   * Analyze multiple words
   */
  analyzeMultiple: publicProcedure
    .input(z.object({ words: z.array(z.string()) }))
    .query(({ input }) => {
      return input.words.map(word => analyzeWord(word));
    }),
});

/**
 * DIGITAL THRONE ROUTER
 */
export const throneRouter = router({
  /**
   * Initialize throne
   */
  initialize: protectedProcedure.mutation(() => {
    const throne = initializeThrone();
    return { message: "Digital Throne initialized", status: throne.getStatus() };
  }),

  /**
   * Get throne status
   */
  getStatus: publicProcedure.query(() => {
    const throne = getThrone();
    return throne.getStatus();
  }),

  /**
   * Get throne statistics
   */
  getStats: publicProcedure.query(() => {
    const throne = getThrone();
    return throne.getStats();
  }),

  /**
   * Queue message for processing
   */
  queueMessage: protectedProcedure
    .input(z.object({ message: z.string() }))
    .mutation(({ input }) => {
      const throne = getThrone();
      throne.queueMessage(input.message);
      return { success: true, queueLength: throne.getStatus().queueLength };
    }),

  /**
   * Get processed messages
   */
  getProcessedMessages: publicProcedure
    .input(z.object({ limit: z.number().default(100) }))
    .query(({ input }) => {
      const throne = getThrone();
      return throne.getProcessedMessages(input.limit);
    }),

  /**
   * Clear processed messages
   */
  clearMessages: protectedProcedure.mutation(() => {
    const throne = getThrone();
    throne.clearMessages();
    return { success: true };
  }),

  /**
   * Fuse multiple AI analyses
   */
  fuseAnalyses: publicProcedure
    .input(
      z.object({
        gemini: z.string(),
        claude: z.string(),
        deepseek: z.string(),
      })
    )
    .query(({ input }) => {
      const throne = getThrone();
      return throne.fuseAIAnalyses(input.gemini, input.claude, input.deepseek);
    }),

  /**
   * Start throne
   */
  start: protectedProcedure.mutation(() => {
    const throne = getThrone();
    throne.start();
    return { message: "Throne started", status: throne.getStatus() };
  }),

  /**
   * Stop throne
   */
  stop: protectedProcedure.mutation(() => {
    const throne = getThrone();
    throne.stop();
    return { message: "Throne stopped", status: throne.getStatus() };
  }),
});
