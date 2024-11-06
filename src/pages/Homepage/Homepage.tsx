import { useEffect, useState } from "react";
import CharacterGrid from "../../components/CharacterGrid/CharacterGrid";
import FeaturedCharacters from "../../components/FeaturedCharacters/FeaturedCharacters";
import Footer from "../../components/Footer/Footer";
import Loading from "../../components/Loading/Loading";
import SearchHeader from "../../components/SearchHeader/SearchHeader";
import { getAllCharacters } from "../../helper/api";
import styles from "./Homepage.module.scss";

const Homepage = () => {
  const [defaultCharacters, setDefaultCharacters] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * useEffect hook to fetch characters data from the API, shuffle the results,
   * and set the default characters to a subset of 8 random entries.
   */
  useEffect(() => {
    const fetchDefaultCharacters = async () => {
      setIsLoading(true);
      const data = await getAllCharacters();
      if (data && data.data) {
        const shuffledCharacters = data.data.sort(() => 0.5 - Math.random());
        setDefaultCharacters(shuffledCharacters.slice(0, 8));
      }
      setIsLoading(false);
    };
    fetchDefaultCharacters();
  }, []);

  /**
   * Homepage component displays the main content of the Disney characters homepage,
   * including a search header, a grid of randomly selected default characters,
   * featured characters, and a footer. It fetches and displays a randomized subset
   * of characters upon initial load.
   *
   * @returns {JSX.Element} The rendered Homepage component.
   */

  return (
    <div className={styles.homepage}>
      <SearchHeader>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <CharacterGrid characters={defaultCharacters} />
            <FeaturedCharacters />
            <Footer />
          </>
        )}
      </SearchHeader>
    </div>
  );
};

export default Homepage;
