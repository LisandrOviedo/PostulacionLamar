import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const Select = ({ className, children, ...props }) => {
  return (
    <select
      className={twMerge(
        clsx(
          "cursor-pointer bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-[#002846] block w-full p-2.5",
          className
        )
      )}
      {...props}
    >
      {children}
    </select>
  );
};

export default Select;
