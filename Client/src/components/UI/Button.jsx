import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const Button = ({ className, children, ...props }) => {
  return (
    <button
      className={twMerge(
        clsx(
          "my-5 text-white bg-[#0053af] hover:bg-[#0053af]/[.5] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center",
          className
        )
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
