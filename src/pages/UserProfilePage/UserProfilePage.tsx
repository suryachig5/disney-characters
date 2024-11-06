import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import CardContainer from "../../components/CardContainer/CardContainer";
import Footer from "../../components/Footer/Footer";
import SearchHeader from "../../components/SearchHeader/SearchHeader";
import {
  EDIT_PROFILE,
  MILLISECONDS_IN_A_YEAR,
  NOT_AVAILABLE,
} from "../../helper/constants";
import styles from "./UserProfilePage.module.scss";

interface UserProfile {
  firstName: string;
  lastName: string;
  birthDate: string;
  city: string;
  state: string;
  favoriteCharacter: string;
  favoriteMovie: string;
  favoriteDisneyland: string;
}

const UserProfilePage = () => {
  const navigate = useNavigate();

  /**
   * State for storing the user's profile details.
   * @type {UserProfile | null}
   */
  const [profile, setProfile] = useState<UserProfile | null>(null);

  /**
   * State for storing the last updated date of the profile.
   * @type {string}
   */
  const [lastUpdated, setLastUpdated] = useState<string>("");

  /**
   * useEffect hook to load the profile data from cookies on component mount.
   */
  useEffect(() => {
    /**
     * Helper function to retrieve a cookie value by name.
     *
     * @param {string} name - Name of the cookie to retrieve.
     * @returns {string | null} Value of the cookie, or null if not found.
     */
    const getCookie = (name: string): string | null => {
      const cookieName = `${name}=`;
      const cookies = document.cookie.split(";");
      for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.indexOf(cookieName) === 0) {
          return cookie.substring(cookieName.length, cookie.length);
        }
      }
      return null;
    };

    const savedProfile = getCookie("userProfile");
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
      setLastUpdated(
        new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      );
    }
  }, []);

  /**
   * Calculates the age from a given birth date.
   *
   * @param {string} birthDate - User's birth date.
   * @returns {string} Age in years or "Not Available" if birthDate is invalid.
   */
  const getAge = (birthDate: string | undefined) => {
    if (!birthDate) return NOT_AVAILABLE;
    const age = Math.floor(
      (new Date().getTime() - new Date(birthDate).getTime()) /
        MILLISECONDS_IN_A_YEAR
    );
    return age > 0 ? age : NOT_AVAILABLE;
  };

  /**
   * Renders the user's profile information, showing "Not Available" if data is missing.
   *
   * @returns {JSX.Element} JSX element displaying profile information.
   */
  const renderProfileInfo = () => {
    const {
      birthDate,
      city,
      favoriteCharacter,
      favoriteDisneyland,
      favoriteMovie,
      firstName,
      lastName,
      state,
    } = profile || {};
    /**
     * Helper function to format the user's location based on city and state.
     *
     * @returns {string} Formatted location or "Not Available".
     */
    const renderLocation = () => {
      if (city && state) {
        return `${city}, ${state}`;
      } else if (city) {
        return city;
      } else if (state) {
        return state;
      } else {
        return NOT_AVAILABLE;
      }
    };

    return (
      <ul className={styles.profileList}>
        <li>
          <strong>Age:</strong> {getAge(birthDate)}
        </li>
        <li>
          <strong>Location:</strong> {renderLocation()}
        </li>
        <li>
          <strong>Favorite Disney Character:</strong>{" "}
          {favoriteCharacter || NOT_AVAILABLE}
        </li>
        <li>
          <strong>Favorite Disney Movie:</strong>{" "}
          {favoriteMovie || NOT_AVAILABLE}
        </li>
        <li>
          <strong>Favorite Disneyland:</strong>{" "}
          {favoriteDisneyland || NOT_AVAILABLE}
        </li>
      </ul>
    );
  };

  /**
   * UserProfilePage component displays user's profile information stored in a cookie.
   * Allows navigation to an edit profile page.
   *
   * @returns {JSX.Element} The rendered UserProfilePage component.
   */

  return (
    <div className={styles.userProfilePage}>
      <SearchHeader>
        <CardContainer>
          <h1 className={styles.title}>
            {profile
              ? `${profile.firstName} ${profile.lastName}`
              : "Profile Not Available"}
          </h1>
          <p className={styles.lastUpdated}>
            Last Updated: {lastUpdated || "Never"}
          </p>
          {renderProfileInfo()}
          <Button onClick={() => navigate("/edit-user-profile")}>
            {EDIT_PROFILE}
          </Button>
        </CardContainer>
        <Footer />
      </SearchHeader>
    </div>
  );
};

export default UserProfilePage;
