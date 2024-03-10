import React, { ReactNode } from "react";
import styles from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  size?: "sm" | "md";
  isActive?: boolean;
  defaultColor?: string;
  activeColor?: string;
  inactiveColor?: string;
  children?: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  text,
  size = "md",
  isActive,
  defaultColor = "#009963",
  activeColor = "#009963",
  inactiveColor = "#F5F0E5",
  children,
  ...props
}) => {
  let backgroundColor;
  if (isActive !== undefined) {
    backgroundColor = isActive ? activeColor : inactiveColor;
  } else {
    backgroundColor = defaultColor;
  }
  const className = `${styles.button} ${styles[size]}`;
  const style = {
    backgroundColor,
    ...props.style,
  };

  return (
    <button
      style={style}
      className={className}
      {...props}
      data-inactive={isActive}
    >
      {text}
      {children}
    </button>
  );
};

export default Button;
