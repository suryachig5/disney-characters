import React from "react";
import styles from "./CardContainer.module.scss";

interface CardContainerProps {
  /**
   * The content to be displayed within the CardContainer.
   */
  children: React.ReactNode;
}

/**
 * CardContainer component that provides a styled container
 * for displaying content with a consistent card layout.
 *
 * @param {CardContainerProps} props - The properties object for CardContainer.
 * @returns {JSX.Element} The rendered CardContainer component.
 */
const CardContainer = ({ children }: CardContainerProps) => {
  return <div className={styles.cardContainer}>{children}</div>;
};

export default CardContainer;
