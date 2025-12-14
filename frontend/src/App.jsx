// App.jsx
import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Register from "./pages/RegisterPage";
import Login from "./pages/LoginPage";
import Edukasi from "./pages/Edukasi";
import ProtectedRoute from "./ProtectedRoute";
import UploadNews from "./components/UploadNews";
import TrashcashPage from "./pages/TrashCash";
import ScanPage from "./pages/ScanPage";

function App() {
  return (
    <Routes>
      {/* PUBLIC PAGES */}
      <Route path="/" element={<Landing />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/trashcash" element={<TrashcashPage />} />
      <Route path="/scan" element={<ScanPage />} />

      {/* PROTECTED PAGE */}
      <Route
        path="/edukasi"
        element={
          <ProtectedRoute>
            <Edukasi />
          </ProtectedRoute>
        }
      />
      <Route
        path="/upload-news"
        element={
          <ProtectedRoute>
            <UploadNews />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
