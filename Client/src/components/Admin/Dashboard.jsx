import { useEffect } from "react";

import { Title } from "../UI";

export function Dashboard() {
  useEffect(() => {
    window.scroll(0, 0);

    document.title = "Grupo Lamar - Dashboard (Admin)";

    return () => {
      document.title = "Grupo Lamar";
    };
  }, []);

  return (
    <div className="mt-24 sm:mt-32 flex min-h-full flex-1 flex-col items-center px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Title>Dashboard Admin</Title>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-[40%] sm:max-w-sm"></div>
    </div>
  );
}
