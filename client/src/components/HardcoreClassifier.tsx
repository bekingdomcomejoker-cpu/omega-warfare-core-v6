import React, { useState } from 'react';
import { classifyText } from '@/lib/hardcoreProcessor';

export function HardcoreClassifier() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<any>(null);

  const handleClassify = () => {
    const classification = classifyText(input);
    setResult(classification);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'TRUTH':
        return 'text-green-400';
      case 'FACT':
        return 'text-blue-400';
      case 'LIE':
        return 'text-red-400';
      default:
        return 'text-yellow-400';
    }
  };

  return (
    <div className="space-y-4 p-6 bg-gradient-to-br from-purple-900 to-indigo-900 rounded-lg border border-violet-500/30">
      <h3 className="text-xl font-bold text-violet-300">Hardcore Processor Classifier</h3>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter text to classify..."
        className="w-full px-4 py-2 bg-black/50 border border-violet-500/50 rounded text-white h-24"
      />
      <button
        onClick={handleClassify}
        className="px-6 py-2 bg-violet-500 hover:bg-violet-600 text-white font-bold rounded"
      >
        Classify
      </button>
      {result && (
        <div className="space-y-2 text-sm">
          <div className={`font-bold text-lg ${getCategoryColor(result.category)}`}>
            Category: {result.category}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>Truth: {(result.truthScore * 100).toFixed(1)}%</div>
            <div>Fact: {(result.factScore * 100).toFixed(1)}%</div>
            <div>Lie: {(result.lieScore * 100).toFixed(1)}%</div>
            <div>Love: {(result.loveScore * 100).toFixed(1)}%</div>
          </div>
          <div className={result.safetyFlag ? 'text-red-400' : 'text-green-400'}>
            Safety: {result.safetyFlag ? '⚠️ FLAGGED' : '✅ SAFE'}
          </div>
          <div className="text-xs text-gray-400">
            Reasons: {result.reason.join(', ')}
          </div>
        </div>
      )}
    </div>
  );
}
