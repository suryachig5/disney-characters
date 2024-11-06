import { SEARCH_RESULTS } from "../../helper/constants";
import CardContainer from "../CardContainer/CardContainer";
import CharacterCard from "../CharacterCard/CharacterCard";
import styles from "./CharacterGrid.module.scss";

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

interface CharacterGridProps {
  /**
   * Array of character objects to be displayed in the grid.
   */
  characters: Character[];

  /**
   * Search term to display at the top of the grid, if any.
   */
  searchTerm?: string;
}

/**
 * CharacterGrid component displays a grid of CharacterCard components.
 * If a search term is provided, it displays a title with the search term at the top.
 *
 * @param {CharacterGridProps} props - The properties object for CharacterGrid.
 * @returns {JSX.Element} The rendered CharacterGrid component.
 */
const CharacterGrid = ({ characters, searchTerm }: CharacterGridProps) => {
  /**
   * Renders a grid of CharacterCard components.
   *
   * @param {Character[]} chars - The array of characters to display in the grid.
   * @returns {JSX.Element} The rendered character grid.
   */
  const renderCharacterGrid = (chars: Character[]) => (
    <div className={styles.characterGrid}>
      {chars.map((character) => (
        <CharacterCard
          characterId={character._id}
          films={character.films}
          imageUrl={character.imageUrl}
          key={character._id}
          name={character.name}
          parkAttractions={character.parkAttractions}
          shortFilms={character.shortFilms}
          tvShows={character.tvShows}
          videoGames={character.videoGames}
        />
      ))}
    </div>
  );

  return (
    <CardContainer>
      {searchTerm && (
        <div className={styles.searchResultsTitleContainer}>
          <h2 className={styles.searchResultsTitle}>
            {SEARCH_RESULTS} - {searchTerm}
          </h2>
        </div>
      )}
      {renderCharacterGrid(characters)}
    </CardContainer>
  );
};

export default CharacterGrid;
