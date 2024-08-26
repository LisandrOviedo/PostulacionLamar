import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const TextArea = ({ className, ...props }) => {
  return (
    <textarea
      className={twMerge(
        clsx(
          "text-sm resize-none block w-full rounded-md bg-gray-50 border border-gray-400 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#002846] sm:text-sm sm:leading-6",
          className
        )
      )}
      autoComplete="off"
      {...props}
    />
  );
};

export default TextArea;
