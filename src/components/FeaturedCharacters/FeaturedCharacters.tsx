import { useEffect, useState } from "react";
import { FEATURED_CHARACTERS } from "../../helper/constants";
import CharacterCard from "../CharacterCard/CharacterCard";
import styles from "./FeaturedCharacters.module.scss";

interface Character {
  /**
   * Unique identifier for the character.
   */
  _id: string;

  /**
   * Array of films associated with the character.
   */
  films: string[];

  /**
   * URL of the character's image.
   */
  imageUrl: string;

  /**
   * Name of the character.
   */
  name: string;

  /**
   * Array of park attractions associated with the character.
   */
  parkAttractions: string[];

  /**
   * Array of short films associated with the character.
   */
  shortFilms: string[];

  /**
   * Array of TV shows associated with the character.
   */
  tvShows: string[];

  /**
   * Array of video games associated with the character.
   */
  videoGames: string[];
}

/**
 * FeaturedCharacters component fetches and displays the last 4 characters
 * as featured characters in a grid layout.
 *
 * @returns {JSX.Element} The rendered FeaturedCharacters component.
 */
const FeaturedCharacters = () => {
  const [featuredCharacters, setFeaturedCharacters] = useState<Character[]>([]);

  useEffect(() => {
    /**
     * Fetches all characters and selects the last 4 to display as featured characters.
     */
    const fetchCharacters = async () => {
      try {
        const response = await fetch("https://api.disneyapi.dev/character");
        const data = await response.json();
        if (data && data.data) {
          const lastFourCharacters = data.data.slice(-4); // Get the last 4 characters
          setFeaturedCharacters(lastFourCharacters);
        }
      } catch (error) {
        console.error("Error fetching featured characters:", error);
      }
    };

    fetchCharacters();
  }, []);

  return (
    <section className={styles.featuredSection}>
      <h2 className={styles.title}>{FEATURED_CHARACTERS}</h2>
      <div className={styles.grid}>
        {featuredCharacters.map(
          ({
            _id,
            films,
            imageUrl,
            name,
            parkAttractions,
            shortFilms,
            tvShows,
            videoGames,
          }) => (
            <CharacterCard
              characterId={_id}
              films={films}
              imageUrl={imageUrl}
              key={_id}
              name={name}
              parkAttractions={parkAttractions}
              shortFilms={shortFilms}
              tvShows={tvShows}
              videoGames={videoGames}
            />
          )
        )}
      </div>
    </section>
  );
};

export default FeaturedCharacters;
