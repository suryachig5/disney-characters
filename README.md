
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
   git clone https://github.com/suryachig5/disney-characters.git
   cd disney-characters
   ```

2. **Install Dependencies**:
   This project uses `npm` for package management. Run the following command to install all dependencies:
   ```bash
   npm install
   ```

### Running the Application

1. **Start the Development Server**:
   To start a local development server, use:
   ```bash
   npm start
   ```
   The application will be available at `http://localhost:3000`.

### Project Overview

This Disney character search application allows users to:
- **Browse Disney Characters**: View a list of characters, featuring character details like films, TV shows, video games, and park attractions.
- **Search for Characters**: A search bar allows live search functionality for Disney characters.
- **View Character Details**: Click on a character to view detailed information on a dedicated page.
- **Manage User Profile**: A user profile page to view and edit user information which is then saved in browser cookie.

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
│   ├── _colors.scss    // Common style variables for colors
│
├── App.tsx             // Main application component that sets up routing
├── index.tsx           // Application entry point
└── README.md           // Project documentation
```

### Additional Notes

- **API Endpoints**: The project relies on the [Disney API](https://disneyapi.dev/docs/) for character data. The API functions are defined in `src/helper/api.ts`.
- **State Management**: This project uses React's built-in `useState` and `useEffect` hooks for managing state locally.
- **Routing**: The app uses `react-router-dom` to handle navigation between pages.
- **Data Persistence**: Profile data is stored in cookies and can be updated through the profile edit page.

Enjoy exploring Disney characters and customizing your profile!
