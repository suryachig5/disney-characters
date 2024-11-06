import { useNavigate } from "react-router-dom";
import {
    FEATURED_FILMS,
    FEATURED_PARK_ATTRACTIONS,
    FEATURED_SHORT_FILMS,
    FEATURED_TV_SHOWS,
    FEATURED_VIDEO_GAMES,
    VIEW_PROFILE,
} from "../../helper/constants";
import defaultImage from "../../images/default-image.png";
import styles from "./CharacterCard.module.scss";

interface CharacterCardProps {
  /**
   * Unique identifier for the character.
   */
  characterId: string;

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
 * CharacterCard component displays character details such as name, image, and featured appearances.
 *
 * Determines the subtitle and description to show based on the priority order of available content.
 *
 * @param {CharacterCardProps} props - Properties of the character including films, shows, games, and other features.
 * @returns {JSX.Element} The rendered CharacterCard component.
 */
const CharacterCard = ({
  characterId,
  films,
  imageUrl,
  name,
  parkAttractions,
  shortFilms,
  tvShows,
  videoGames,
}: CharacterCardProps) => {
  const navigate = useNavigate();

  // Determine subtitle and description based on priority order
  let subtitle = "";
  let description = "";

  if (films.length > 0) {
    subtitle = FEATURED_FILMS;
    description = films.join(", ");
  } else if (tvShows.length > 0) {
    subtitle = FEATURED_TV_SHOWS;
    description = tvShows.join(", ");
  } else if (shortFilms.length > 0) {
    subtitle = FEATURED_SHORT_FILMS;
    description = shortFilms.join(", ");
  } else if (videoGames.length > 0) {
    subtitle = FEATURED_VIDEO_GAMES;
    description = videoGames.join(", ");
  } else if (parkAttractions.length > 0) {
    subtitle = FEATURED_PARK_ATTRACTIONS;
    description = parkAttractions.join(", ");
  }

  const handleCharacterClick = () => {
    navigate(`/character/${characterId}`);
  };

  return (
    <div className={styles.card} onClick={handleCharacterClick}>
      <img src={imageUrl || defaultImage} alt={name} className={styles.image} />
      <div className={styles.textContainer}>
        <h3 className={styles.name} title={name}>
          {name}
        </h3>
        <p className={styles.subtitle}>{subtitle}</p>
        <p className={styles.description}>{description}</p>
      </div>
      <button className={styles.button} onClick={handleCharacterClick}>
        {VIEW_PROFILE}
      </button>
    </div>
  );
};

export default CharacterCard;
