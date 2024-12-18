import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const Label = ({ className, errors, children, ...props }) => {
  return (
    <label
      className={twMerge(
        clsx(
          `block mb-2 text-sm font-medium ${
            errors ? "text-error" : "text-gray-900"
          }`,
          className
        )
      )}
      {...props}
    >
      {children}
    </label>
  );
};

export default Label;
