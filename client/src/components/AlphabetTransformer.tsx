import React, { useState } from 'react';
import { parseWord, generateAlphabetPayload } from '@/lib/alphabetEngine';

export function AlphabetTransformer() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<any>(null);

  const handleTransform = () => {
    const transform = parseWord(input);
    if (transform) {
      const payload = generateAlphabetPayload(transform);
      setResult({ transform, payload });
    }
  };

  return (
    <div className="space-y-4 p-6 bg-gradient-to-br from-indigo-900 to-purple-900 rounded-lg border border-cyan-500/30">
      <h3 className="text-xl font-bold text-cyan-300">Alphabet Engine Transformer</h3>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter word to transform..."
        className="w-full px-4 py-2 bg-black/50 border border-cyan-500/50 rounded text-white"
      />
      <button
        onClick={handleTransform}
        className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-black font-bold rounded"
      >
        Transform
      </button>
      {result && (
        <pre className="text-xs text-cyan-200 bg-black/70 p-4 rounded overflow-auto max-h-96">
          {result.payload}
        </pre>
      )}
    </div>
  );
}
