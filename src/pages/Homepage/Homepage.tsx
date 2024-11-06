import { useEffect, useState } from "react";
import CharacterGrid from "../../components/CharacterGrid/CharacterGrid";
import FeaturedCharacters from "../../components/FeaturedCharacters/FeaturedCharacters";
import Footer from "../../components/Footer/Footer";
import Loading from "../../components/Loading/Loading";
import NoResults from "../../components/NoResults/NoResults";
import SearchHeader from "../../components/SearchHeader/SearchHeader";
import { getAllCharacters } from "../../helper/api";
import styles from "./Homepage.module.scss";

const Homepage = () => {
  const [defaultCharacters, setDefaultCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorCode, setErrorCode] = useState<number | null>(null);

  /**
   * Fetches initial character data when component mounts.
   * Randomly selects 8 characters to display on the homepage.
   * Handles loading states and error conditions.
   */
  useEffect(() => {
    /**
     * Async function to fetch character data from the API.
     * Sets loading state, handles errors, and updates character data.
     */
    const fetchDefaultCharacters = async () => {
      setIsLoading(true);
      try {
        const data = await getAllCharacters();
        if (data && data.data) {
          const shuffledCharacters = data.data.sort(() => 0.5 - Math.random());
          setDefaultCharacters(shuffledCharacters.slice(0, 8));
        }
      } catch (error: any) {
        setErrorCode(error.response?.status || 500);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDefaultCharacters();
  }, []);

  /**
   * Determines and returns the appropriate content to render based on current state.
   * Handles loading, error, and success states.
   *
   * @returns {JSX.Element} The appropriate component(s) based on current state
   */
  const renderContent = () => {
    if (isLoading) {
      return <Loading />;
    }

    if (errorCode) {
      return <NoResults searchTerm={null} errorCode={errorCode} />;
    }

    return (
      <>
        <CharacterGrid characters={defaultCharacters} />
        <FeaturedCharacters />
        <Footer />
      </>
    );
  };

  /**
   * Homepage that displays the main content of the Disney characters application.
   * This includes a search header, character grid, featured characters, and footer.
   * The component fetches and displays a random selection of characters on initial load.
   *
   * @returns {JSX.Element} The rendered Homepage
   */

  return (
    <div className={styles.homepage}>
      <SearchHeader>{renderContent()}</SearchHeader>
    </div>
  );
};

export default Homepage;
