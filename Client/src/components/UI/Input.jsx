import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const Input = ({ className, errors, ...props }) => {
  return (
    <input
      className={twMerge(
        clsx(
          `bg-gray-50 border ${
            errors ? "border-[#ff1a1a]" : "border-gray-400"
          }  text-gray-900 text-sm rounded-lg block w-full p-2.5 outline-none uppercase`,

          className
        )
      )}
      autoComplete="off"
      {...props}
    />
  );
};

export default Input;
