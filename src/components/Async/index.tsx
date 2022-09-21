import { useEffect, useState } from "react";

export function Async() {
  const [isButtInvisible, setIsButtInvisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsButtInvisible(true);
    }, 1000);
  }, []);

  return (
    <div>
      <div>Hello World</div>
      {!isButtInvisible && <button>Button</button>}
    </div>
  );
}
