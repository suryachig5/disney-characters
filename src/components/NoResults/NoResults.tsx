import { NO_RESULTS_FOUND } from "../../helper/constants";
import noResultsImage from "../../images/no-results-found.jpg";
import styles from "./NoResults.module.scss";

interface NoResultsProps {
  /**
   * The search term for which no results were found.
   */
  searchTerm: string;
}

/**
 * NoResults component that displays a message and an image indicating no search results.
 *
 * @param {NoResultsProps} props - The properties object, including the search term.
 * @returns {JSX.Element} The rendered NoResults component.
 */
const NoResults = ({ searchTerm }: NoResultsProps) => {
  return (
    <div className={styles.noResultsContainer}>
      <h2>{NO_RESULTS_FOUND}</h2>
      <h3>{searchTerm}</h3>
      <img
        src={noResultsImage}
        alt="No Results"
        className={styles.noResultsImage}
      />
    </div>
  );
};

export default NoResults;
