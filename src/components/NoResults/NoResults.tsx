import { NO_RESULTS_FOUND, SERVICE_UNAVAILABLE } from "../../helper/constants";
import serviceUnavailableError from "../../images/503-error.png";
import noResultsImage from "../../images/no-results-found.jpg";
import styles from "./NoResults.module.scss";

interface NoResultsProps {
  /**
   * The search term for which no results were found.
   */
  searchTerm: string | null;
  /**
   * The error code from the api response.
   */
  errorCode?: number;
}

interface ErrorContent {
  image: string;
  text: string;
}

/**
 * NoResults component that displays a message and an image indicating no search results.
 *
 * @param {NoResultsProps} props - The properties object, including the search term and error code.
 * @returns {JSX.Element} The rendered NoResults component.
 */
const NoResults = ({ searchTerm, errorCode }: NoResultsProps) => {
  /**
   * Returns the error content based on the error code.
   *
   * @returns {ErrorContent} The error content object containing the image and text.
   */
  const getErrorContent = (): ErrorContent => {
    switch (errorCode) {
      case 400:
        return {
          image: noResultsImage,
          text: NO_RESULTS_FOUND,
        };
      case 503:
        return {
          image: serviceUnavailableError,
          text: SERVICE_UNAVAILABLE,
        };
      default:
        return {
          image: noResultsImage,
          text: NO_RESULTS_FOUND,
        };
    }
  };

  const errorContent = getErrorContent();

  return (
    <div className={styles.noResultsContainer}>
      <h2>{errorContent.text}</h2>
      {searchTerm && <h3>{searchTerm}</h3>}
      <img
        src={errorContent.image}
        alt="No Results"
        className={styles.noResultsImage}
      />
    </div>
  );
};

export default NoResults;
