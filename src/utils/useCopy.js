import { useEffect, useRef, useState } from 'react';

/** Returns [status, copy]; status is 'idle' | 'copied' | 'failed'. */
export default function useCopy(resetMs = 2500) {
  const [status, setStatus] = useState('idle');
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async (text) => {
    clearTimeout(timer.current);
    try {
      if (!navigator.clipboard?.writeText) throw new Error('clipboard unavailable');
      await navigator.clipboard.writeText(text);
      setStatus('copied');
    } catch (e) {
      setStatus('failed');
    }
    timer.current = setTimeout(() => setStatus('idle'), resetMs);
  };

  return [status, copy];
}
