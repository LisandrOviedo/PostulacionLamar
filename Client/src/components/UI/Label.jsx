import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export default function Label({ className, text, ...props }) {
  return (
    <label
      className={twMerge(
        clsx(
          "block mb-2 text-sm font-medium text-gray-900 dark:text-white",
          className
        )
      )}
      {...props}
    >
      {text}
    </label>
  );
}
