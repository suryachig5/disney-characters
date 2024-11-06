import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import CardContainer from "../../components/CardContainer/CardContainer";
import Footer from "../../components/Footer/Footer";
import SearchHeader from "../../components/SearchHeader/SearchHeader";
import { CANCEL, UPDATE_PROFILE } from "../../helper/constants";
import { DISNEYLAND_LOCATIONS } from "../../helper/disneylandLocations";
import { US_STATES } from "../../helper/usStatesList";
import styles from "./EditUserProfile.module.scss";

interface UserProfile {
  birthDate: string;
  city: string;
  favoriteCharacter: string;
  favoriteDisneyland: string;
  favoriteMovie: string;
  firstName: string;
  lastName: string;
  state: string;
}

const defaultProfile: UserProfile = {
  birthDate: "",
  city: "",
  favoriteCharacter: "",
  favoriteDisneyland: "",
  favoriteMovie: "",
  firstName: "",
  lastName: "",
  state: "",
};

/**
 * Main form component for editing user profile.
 */
const EditProfileForm = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);

  /**
   * Memoized validation check for required fields in the form.
   */
  const isFormValid = useMemo(() => {
    return (
      profile.firstName.trim() !== "" &&
      profile.lastName.trim() !== "" &&
      profile.birthDate.trim() !== ""
    );
  }, [profile.firstName, profile.lastName, profile.birthDate]);

  useEffect(() => {
    const savedProfile = getCookie("userProfile");
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  /**
   * Sets a cookie with the specified name, value, and expiration days.
   * @param {string} name - The name of the cookie.
   * @param {string} value - The value to store in the cookie.
   * @param {number} [days=30] - The number of days until the cookie expires.
   */
  const setCookie = (name: string, value: string, days: number = 30) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
  };

  /**
   * Retrieves the value of a specified cookie.
   * @param {string} name - The name of the cookie to retrieve.
   * @returns {string | null} The cookie value or null if not found.
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

  /**
   * Updates any select field in the profile.
   * @param {ChangeEvent<HTMLSelectElement>} e - The event object containing the field name and new value.
   */
  const handleDropdownChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * Updates profile fields based on input changes.
   * @param {ChangeEvent<HTMLInputElement>} e - The event object.
   */
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * Handles form submission, saving profile data to cookies and navigating to the profile page.
   * @param {FormEvent<HTMLFormElement>} e - The event object.
   */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) return;
    setCookie("userProfile", JSON.stringify(profile));
    navigate("/user-profile");
  };

  /**
   * Renders individual form fields.
   * @param {string} label - The label text for the field.
   * @param {string} name - The name of the form field.
   * @param {string} value - The current value of the field.
   * @param {boolean} required - Whether the field is required.
   * @returns {JSX.Element} The rendered form field.
   */
  const renderFormField = (
    label: string,
    name: string,
    value: string,
    required = false
  ) => (
    <div className={styles.formField}>
      <label className={`${styles.label} ${required ? styles.required : ""}`}>
        {label}
      </label>
      <input
        type="text"
        name={name}
        className={styles.input}
        value={value}
        onChange={handleInputChange}
      />
    </div>
  );

  /**
   * Navigates back to the user profile page without saving changes.
   */
  const handleCancel = () => {
    navigate("/user-profile");
  };

  const {
    birthDate,
    city,
    favoriteCharacter,
    favoriteDisneyland,
    favoriteMovie,
    firstName,
    lastName,
    state,
  } = profile;

  return (
    <div className={styles.formContainer}>
      <SearchHeader>
        <CardContainer>
          <form onSubmit={handleSubmit}>
            <div className={styles.sharedFields}>
              {renderFormField("First Name", "firstName", firstName, true)}
              {renderFormField("Last Name", "lastName", lastName, true)}
            </div>

            <div className={styles.sharedFields}>
              {renderFormField("Birth Date", "birthDate", birthDate, true)}
            </div>

            <div className={styles.cityStateFields}>
              <div className={styles.cityField}>
                <label className={styles.label}>City</label>
                <input
                  type="text"
                  name="city"
                  className={styles.input}
                  value={city}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.stateField}>
                <label className={styles.label}>State</label>
                <select
                  name="state"
                  className={styles.select}
                  value={state}
                  onChange={handleDropdownChange}
                >
                  <option value="">Select</option>
                  {US_STATES.map((state) => (
                    <option key={state.value} value={state.label}>
                      {state.value}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.fullWidth}>
              {renderFormField(
                "Favorite Disney Character",
                "favoriteCharacter",
                favoriteCharacter
              )}
            </div>

            <div className={styles.fullWidth}>
              {renderFormField(
                "Favorite Disney Movie",
                "favoriteMovie",
                favoriteMovie
              )}
            </div>

            <div className={styles.cityStateFields}>
              <div className={styles.formField}>
                <label className={styles.label}>Favorite Disneyland</label>
                <select
                  name="favoriteDisneyland"
                  className={styles.selectMediumWidth}
                  value={favoriteDisneyland}
                  onChange={handleDropdownChange}
                >
                  <option value="">Select</option>
                  {DISNEYLAND_LOCATIONS.map((park) => (
                    <option key={park.value} value={park.label}>
                      {park.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.buttonGroup}>
              <Button
                type="submit"
                buttonType="primary"
                disabled={!isFormValid}
              >
                {UPDATE_PROFILE}
              </Button>
              <Button
                buttonType="secondary"
                onClick={handleCancel}
                type="button"
              >
                {CANCEL}
              </Button>
            </div>
          </form>
        </CardContainer>
        <Footer />
      </SearchHeader>
    </div>
  );
};

export default EditProfileForm;
