import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/Button/Button";
import CardContainer from "../../components/CardContainer/CardContainer";
import FeaturedCharacters from "../../components/FeaturedCharacters/FeaturedCharacters";
import Footer from "../../components/Footer/Footer";
import Loading from "../../components/Loading/Loading";
import SearchHeader from "../../components/SearchHeader/SearchHeader";
import { getOneCharacter } from "../../helper/api";
import {
  EXPLORE_MORE_CHARACTER_DETAILS,
  LAST_UPDATED,
} from "../../helper/constants";
import defaultImage from "../../images/default-image.png";
import styles from "./CharacterDetailsPage.module.scss";

interface CharacterDetail {
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
   * URL for the source of the character's details.
   */
  sourceUrl: string;

  /**
   * Array of TV shows associated with the character.
   */
  tvShows: string[];

  /**
   * Date when the character's information was last updated.
   */
  updatedAt: string;

  /**
   * Array of video games associated with the character.
   */
  videoGames: string[];
}

/**
 * CharacterDetailPage component displays detailed information about a specific character.
 * Fetches data based on character ID from the URL and shows featured titles like films, TV shows, etc.
 *
 * @returns {JSX.Element} The rendered CharacterDetailPage component.
 */
const CharacterDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<CharacterDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    /**
     * Fetches character details based on the character ID from the URL.
     */
    const fetchCharacter = async () => {
      if (id) {
        setIsLoading(true);
        const characterInformation = await getOneCharacter(id);
        if (characterInformation && characterInformation.data) {
          setCharacter(characterInformation.data);
        }
        setIsLoading(false);
      }
    };
    fetchCharacter();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  const {
    films = [],
    imageUrl = "",
    name = "",
    parkAttractions = [],
    shortFilms = [],
    sourceUrl = "",
    tvShows = [],
    updatedAt = "",
    videoGames = [],
  } = character || {};

  /**
   * Renders a section with a header and a list of titles.
   *
   * @param {string} headerTitle - The title of the section.
   * @param {string[]} titles - The list of titles to display.
   * @returns {JSX.Element} The rendered section with titles.
   */
  const renderTitles = (headerTitle: string, titles: string[]) => {
    return (
      <>
        <h3>{headerTitle}</h3>
        <ul>
          {titles.map((title, index) => (
            <li key={index}>{title}</li>
          ))}
        </ul>
      </>
    );
  };

  return (
    <div className={styles.characterDetailsPage}>
      <SearchHeader>
        <CardContainer>
          <div className={styles.characterDetails}>
            <img
              src={imageUrl || defaultImage}
              alt={name}
              className={styles.characterImage}
            />
            <div className={styles.characterInfo}>
              <h2 className={styles.name}>{name}</h2>
              <p className={styles.updatedAt}>
                {LAST_UPDATED} {new Date(updatedAt).toLocaleDateString()}
              </p>
              {films.length > 0 && renderTitles("Feature Films", films)}
              {shortFilms.length > 0 && renderTitles("Short Films", shortFilms)}
              {tvShows.length > 0 && renderTitles("TV Shows", tvShows)}
              {parkAttractions.length > 0 &&
                renderTitles("Park Attractions", parkAttractions)}
              {videoGames.length > 0 && renderTitles("Video Games", videoGames)}
              <Button url={sourceUrl}>{EXPLORE_MORE_CHARACTER_DETAILS}</Button>
            </div>
          </div>
        </CardContainer>
        <FeaturedCharacters />
        <Footer />
      </SearchHeader>
    </div>
  );
};

export default CharacterDetailPage;
