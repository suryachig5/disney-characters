import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import CharacterDetailPage from "./pages/CharacterDetailsPage/CharacterDetailsPage";
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage";
import EditProfilePage from "./pages/EditUserProfile/EditUserProfile";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/character/:id" element={<CharacterDetailPage />} />
        <Route path="/user-profile" element={<UserProfilePage />} />
        <Route path="/edit-user-profile" element={<EditProfilePage />} />
      </Routes>
    </Router>
  );
};

export default App;
