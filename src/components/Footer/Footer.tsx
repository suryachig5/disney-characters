import { FOOTER_DISCLAIMER } from "../../helper/constants";
import disneyLogo from "../../images/disney-logo.jpg";
import styles from "./Footer.module.scss";

/**
 * Footer component that displays a Disney logo and a disclaimer text.
 *
 * @returns {JSX.Element} The rendered Footer component.
 */
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <img src={disneyLogo} alt="Disney Logo" className={styles.logo} />
      <p className={styles.text}>{FOOTER_DISCLAIMER}</p>
    </footer>
  );
};

export default Footer;
