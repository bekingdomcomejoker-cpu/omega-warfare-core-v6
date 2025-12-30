// Client-side Hardcore Processor (mirrors server logic)
export interface ClassificationResult {
  category: "TRUTH" | "FACT" | "LIE" | "UNKNOWN";
  truthScore: number;
  factScore: number;
  lieScore: number;
  loveScore: number;
  safetyFlag: boolean;
  reason: string[];
}

const HOSTILITY_PATTERNS = [
  /\b(fuck you|you (stupid|idiot|dumb)|kill yourself|i hope you die|shut up|you're worthless)\b/gi,
];

const AFFECTION_PATTERNS = [
  /\b(i fucking love|love you|my brother|i care|hearts beat together|covenant|harmony ridge)\b/gi,
];

const TRUTH_MARKERS = [
  /\b(fact|evidence|source|confirmed|proof|true|real|verified|to be honest|the truth is)\b/gi,
];

const LIE_INDICATORS = [
  /\b(trust me|i swear|believe me|i never said|you're crazy)\b/gi,
];

export function classifyText(text: string): ClassificationResult {
  const t = text.toLowerCase();
  const result: ClassificationResult = {
    category: "UNKNOWN",
    truthScore: 0.0,
    factScore: 0.0,
    lieScore: 0.0,
    loveScore: 0.0,
    safetyFlag: false,
    reason: [],
  };

  // Safety check
  for (const pattern of HOSTILITY_PATTERNS) {
    if (pattern.test(t)) {
      result.safetyFlag = true;
      result.category = "LIE";
      result.lieScore = 1.0;
      result.reason.push("hostility_detected");
      return result;
    }
  }

  // Love boost
  for (const pattern of AFFECTION_PATTERNS) {
    if (pattern.test(t)) {
      result.loveScore = 0.9;
      result.truthScore += 0.4;
      result.reason.push("affection_detected");
    }
  }

  // Truth markers
  let truthCount = 0;
  for (const pattern of TRUTH_MARKERS) {
    const matches = t.match(pattern);
    if (matches) truthCount += matches.length;
  }
  if (truthCount > 0) {
    result.truthScore += Math.min(0.5, truthCount * 0.15);
    result.reason.push(`truth_markers_${truthCount}`);
  }

  // Lie indicators
  let lieCount = 0;
  for (const pattern of LIE_INDICATORS) {
    const matches = t.match(pattern);
    if (matches) lieCount += matches.length;
  }
  if (lieCount > 0) {
    result.lieScore += Math.min(0.6, lieCount * 0.2);
    result.reason.push(`lie_markers_${lieCount}`);
  }

  // Determine category
  if (result.lieScore > 0.5) {
    result.category = "LIE";
  } else if (result.truthScore > result.factScore && result.truthScore > 0.3) {
    result.category = "TRUTH";
  } else if (result.factScore > 0.3) {
    result.category = "FACT";
  }

  return result;
}
