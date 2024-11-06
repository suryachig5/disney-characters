
# Disney Character Search App

A Disney character search application built with React, TypeScript, and SCSS that allows users to explore various Disney characters, view details about them, and manage a user profile.

## Table of Contents

1. [Project Setup](#project-setup)
2. [Running the Application](#running-the-application)
3. [Project Overview](#project-overview)
4. [Folder Structure](#folder-structure)

---

### Project Setup

To set up this project, follow the instructions below:

1. **Clone the Repository**:
   ```bash
   git clone <your-repository-url>
   cd disney-character-search
   ```

2. **Install Dependencies**:
   This project uses `npm` for package management. Run the following command to install all dependencies:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   Ensure the API endpoint is set correctly for fetching Disney character data. You may create a `.env` file in the root directory to configure environment-specific variables, if needed.

4. **Build the Project**:
   To bundle and prepare the application, run:
   ```bash
   npm run build
   ```

### Running the Application

1. **Start the Development Server**:
   To start a local development server, use:
   ```bash
   npm start
   ```
   The application will be available at `http://localhost:3000`.

2. **Running Tests**:
   This project includes unit tests. To run the tests, use:
   ```bash
   npm test
   ```

### Project Overview

This Disney character search application allows users to:
- **Browse Disney Characters**: View a list of characters, featuring character details like films, TV shows, video games, and park attractions.
- **Search for Characters**: A search bar allows live search functionality for Disney characters.
- **View Character Details**: Click on a character to view detailed information on a dedicated page.
- **Manage User Profile**: A user profile page to view and edit profile information, saved via cookies.

### Folder Structure

Below is an overview of the folder structure used in this project:

```
src
│
├── components
│   ├── Button          // Reusable button component
│   ├── CardContainer   // Layout component that wraps child elements in a styled card container
│   ├── CharacterCard   // Displays character data on the homepage and search results
│   ├── CharacterGrid   // Grid layout for rendering CharacterCard components
│   ├── FeaturedCharacters // Section displaying a subset of featured characters
│   ├── Footer          // Footer component with logo and disclaimer
│   ├── Loading         // Loading spinner component for async operations
│   ├── NoResults       // Displayed when no search results are found
│   ├── SearchHeader    // Header with search functionality and profile link
│   └── ...
│
├── helper              // Utility files and constants
│   ├── api.ts          // Functions for API calls
│   ├── constants.ts    // Text constants used across components
│   └── us_states.ts    // List of US states used in the profile form
│
├── pages
│   ├── CharacterDetailsPage // Page for viewing detailed character information
│   ├── EditUserProfile      // Form for editing the user's profile
│   ├── Homepage             // Main homepage with featured characters and search
│   ├── SearchResultsPage    // Page for viewing search results (if separate from Homepage)
│   ├── UserProfilePage      // Page displaying the user's profile information
│
├── images              // Static images (e.g., logo, default images, etc.)
│
├── styles              // Global SCSS files
│   ├── variables.scss  // Common style variables like colors and font sizes
│   ├── mixins.scss     // SCSS mixins for reuse across components
│   └── base.scss       // Global styles like resets and basic typography
│
├── App.tsx             // Main application component that sets up routing
├── index.tsx           // Application entry point
└── README.md           // Project documentation
```

### Additional Notes

- **API Endpoints**: The project relies on the [Disney API](https://api.disneyapi.dev) for character data. The API functions are defined in `src/helper/api.ts`.
- **State Management**: This project uses React's built-in `useState` and `useEffect` hooks for managing state locally.
- **Routing**: The app uses `react-router-dom` to handle navigation between pages.
- **Data Persistence**: Profile data is stored in cookies and can be updated through the profile edit page.

Enjoy exploring Disney characters and customizing your profile!
