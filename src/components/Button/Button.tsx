import React from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  /**
   * Determines the visual style of the button.
   * Can be "primary" or "secondary".
   * Default is "primary".
   */
  buttonType?: "primary" | "secondary";

  /**
   * The content to display inside the button.
   */
  children: React.ReactNode;

  /**
   * Additional CSS class names to style the button externally.
   */
  className?: string;

  /**
   * If true, disables the button.
   */
  disabled?: boolean;

  /**
   * Callback function to be called when the button is clicked.
   */
  onClick?: () => void;

  /**
   * Specifies the type of button, such as "button", "submit", or "reset".
   * Default is "button".
   */
  type?: "button" | "submit" | "reset";

  /**
   * URL to open in a new tab when the button is clicked.
   * If provided, the button will open this URL instead of triggering the onClick callback.
   */
  url?: string;
}

/**
 * Button component that renders a styled button with optional primary or secondary style, click behavior, and URL redirection.
 *
 * @param {ButtonProps} props - The properties object for the Button component.
 * @returns {JSX.Element} The rendered button component.
 */
const Button = ({
  children,
  className,
  disabled,
  onClick,
  type = "button",
  url,
  buttonType = "primary",
}: ButtonProps) => {
  /**
   * Handles the click event for the button.
   * - Executes the onClick callback, if provided.
   * - Opens the specified URL in a new tab if `url` is provided.
   */
  const handleButtonClick = () => {
    if (onClick) {
      onClick();
    }
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <button
      className={`${styles.button} ${styles[buttonType]} ${className || ""}`}
      disabled={disabled}
      onClick={handleButtonClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
