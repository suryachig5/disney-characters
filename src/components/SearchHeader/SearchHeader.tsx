import React, { ReactNode, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { filterCharacter } from "../../helper/api";
import { SEARCH_PLACEHOLDER } from "../../helper/constants";
import logo from "../../images/disney-logo.jpg";
import CharacterGrid from "../CharacterGrid/CharacterGrid";
import FeaturedCharacters from "../FeaturedCharacters/FeaturedCharacters";
import Footer from "../Footer/Footer";
import Loading from "../Loading/Loading";
import NoResults from "../NoResults/NoResults";
import styles from "./SearchHeader.module.scss";

interface SearchHeaderProps {
  /**
   * Optional children to be rendered when no search term is present.
   */
  children?: ReactNode;
}

/**
 * SearchHeader component that provides a search bar for filtering characters.
 * It displays a logo, search input, and user profile button in the header.
 * The search results are displayed in a grid format along with featured characters.
 * If there is no active search term the child component is rendered.
 *
 * @param {SearchHeaderProps} props - The properties object for SearchHeader.
 * @returns {JSX.Element} The rendered SearchHeader component.
 */
const SearchHeader = ({ children }: SearchHeaderProps) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    /**
     * Fetches filtered character results based on the current search term.
     * Only triggers when the search term has one or more characters.
     */
    const fetchResults = async () => {
      if (searchTerm.length >= 1) {
        setIsLoading(true);
        const data = await filterCharacter(`name=${searchTerm}`);
        setSearchResults(data?.data?.slice(0, 8) || []);
        setIsLoading(false);
      } else {
        setSearchResults([]);
      }
    };

    fetchResults();
  }, [searchTerm]);

  /**
   * Handles changes to the search input field and updates the search term state.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event - The change event from the input field.
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  /**
   * Handles clicking the logo by clearing the search term and navigating home.
   */
  const handleLogoClick = () => {
    setSearchTerm("");
  };

  /**
   * Renders the main header with logo, search input, and profile button.
   */
  const renderHeader = () => (
    <header className={styles.header}>
      <Link to="/" onClick={handleLogoClick}>
        <img src={logo} alt="Disney Logo" className={styles.logo} />
      </Link>
      <input
        type="text"
        placeholder={SEARCH_PLACEHOLDER}
        value={searchTerm}
        onChange={handleInputChange}
        className={styles.searchBar}
      />
      <button
        className={styles.profileButton}
        onClick={() => navigate("/user-profile")}
      >
        <span className={styles.profileIcon}>&#128100;</span>
      </button>
    </header>
  );

  /**
   * Renders the search results grid and featured characters.
   */
  const renderSearchResults = () => (
    <>
      <CharacterGrid searchTerm={searchTerm} characters={searchResults} />
      <FeaturedCharacters />
      <Footer />
    </>
  );

  /**
   * Renders the NoResults component and the footer.
   */
  const renderNoResults = () => (
    <>
      <NoResults searchTerm={searchTerm} />
      <Footer />
    </>
  );

  /**
   * Determines and renders the appropriate content based on loading state,
   * presence of a search term, and search results.
   */
  const renderContent = () => {
    if (isLoading) return <Loading />;
    if (!searchTerm) return children;
    return searchResults.length ? renderSearchResults() : renderNoResults();
  };

  return (
    <div className={styles.searchHeader}>
      {renderHeader()}
      {renderContent()}
    </div>
  );
};

export default SearchHeader;
