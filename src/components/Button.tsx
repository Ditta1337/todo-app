import React, { Children } from "react";
import style from "../styles/modules/button.module.css";
import { getClasses } from "../utilities/getCasses";

// has Button and SelectButton components

const buttonVariants = {
  primary: "Primary",
  secondary: "Secondary",
};

// Button function
function Button({
  variant = "primary",
  children,
  type,
  onClick,
  onKeyDown,
  ...rest
}: {
  variant?: keyof typeof buttonVariants;
  children: string | React.ReactNode;
  type?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button
      className={getClasses([
        style.button,
        style[`button${buttonVariants[variant]}`],
      ])}
      type={type === "submit" ? "submit" : "button"}
      onClick={onClick}
      onKeyDown={onKeyDown}
      {...rest}
    >
      {Children.map(children, (child) => child)}
    </button>
  );
}

function SelectButton({
  children,
  id,
  value,
  onChange,
  ...rest
}: {
  children: React.ReactNode;
  id: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <select
      id={id}
      onChange={onChange}
      className={getClasses([style.button, style.buttonSelect])}
      {...rest}
    >
      {Children.map(children, (child) => child)}
    </select>
  );
}

export default Button;
export { SelectButton };
