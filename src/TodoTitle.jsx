import { useEffect, useState } from 'react';

// 標題與目前的日期/問候
export default function TodoTitle() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="rounded-md bg-space-secondary-dark text-center p-2 text-ring">
        <h1 className="text-3xl">我的代辦清單</h1>
        <p className="text-sm">現在是 {time.toLocaleString('zh-TW')}</p>
      </div>
    </>
  );
}
