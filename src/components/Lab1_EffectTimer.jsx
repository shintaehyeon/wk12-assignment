import { useEffect, useState } from 'react';

// LAB 1 (Slide 07): useEffect Timer
export default function Lab1EffectTimer() {
  const [count, setCount] = useState(0);
  console.log('[LAB 1] rendered');

  useEffect(() => {
    console.log('[LAB 1] effect start');
    const timerId = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);
    return () => {
      console.log('[LAB 1] cleanup');
      clearInterval(timerId);
    };
  }, []);

  return (
    <div>
      <p className="hint">TODO를 완성하면 1초마다 자동으로 Count가 증가해야 합니다.</p>
      <div className="count">{count}</div>
      <p className="hint">Console에서 Render / Effect / Cleanup을 비교하세요.</p>
    </div>
  );
}
