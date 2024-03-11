import { useEffect } from "react";

export function Landing() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Landing</h1>
    </div>
  );
}
