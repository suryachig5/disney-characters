import loadingGif from "../../images/loading.gif";
import styles from "./Loading.module.scss";

/**
 * Loading component that displays a loading GIF centered within the container.
 *
 * @returns {JSX.Element} The rendered Loading component.
 */
const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <img src={loadingGif} alt="Loading..." className={styles.loadingGif} />
    </div>
  );
};

export default Loading;
