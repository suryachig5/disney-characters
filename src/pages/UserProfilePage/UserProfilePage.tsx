import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import CardContainer from "../../components/CardContainer/CardContainer";
import Footer from "../../components/Footer/Footer";
import SearchHeader from "../../components/SearchHeader/SearchHeader";
import { EDIT_PROFILE, MILLISECONDS_IN_A_YEAR } from "../../helper/constants";
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
  const getAge = (birthDate: string) => {
    if (!birthDate) return "Not Available";
    const age = Math.floor(
      (new Date().getTime() - new Date(birthDate).getTime()) /
        MILLISECONDS_IN_A_YEAR
    );
    return age > 0 ? age : "Not Available";
  };

  /**
   * Renders the user's profile information, showing "Not Available" if data is missing.
   *
   * @returns {JSX.Element} JSX element displaying profile information.
   */
  const renderProfileInfo = () => {
    if (!profile) {
      return (
        <ul className={styles.profileList}>
          <li>
            <strong>Age:</strong> Not Available
          </li>
          <li>
            <strong>Location:</strong> Not Available
          </li>
          <li>
            <strong>Favorite Disney Character:</strong> Not Available
          </li>
          <li>
            <strong>Favorite Disney Movie:</strong> Not Available
          </li>
          <li>
            <strong>Favorite Disneyland:</strong> Not Available
          </li>
        </ul>
      );
    }

    /**
     * Helper function to format the user's location based on city and state.
     *
     * @returns {string} Formatted location or "Not Available".
     */
    const renderLocation = () => {
      if (profile.city && profile.state) {
        return `${profile.city}, ${profile.state}`;
      } else if (profile.city) {
        return profile.city;
      } else if (profile.state) {
        return profile.state;
      } else {
        return "Not Available";
      }
    };

    return (
      <ul className={styles.profileList}>
        <li>
          <strong>Age:</strong> {getAge(profile.birthDate)}
        </li>
        <li>
          <strong>Location:</strong> {renderLocation()}
        </li>
        <li>
          <strong>Favorite Disney Character:</strong>{" "}
          {profile.favoriteCharacter || "Not Available"}
        </li>
        <li>
          <strong>Favorite Disney Movie:</strong>{" "}
          {profile.favoriteMovie || "Not Available"}
        </li>
        <li>
          <strong>Favorite Disneyland:</strong>{" "}
          {profile.favoriteDisneyland || "Not Available"}
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
