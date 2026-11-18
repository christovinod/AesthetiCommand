import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Customize from "./pages/Customize";
import Assistant from "./pages/Assistant";
import Library from "./pages/Library";
import History from "./pages/History";
import Saved from "./pages/Saved";
import Learn from "./pages/Learn";
import SettingsPage from "./pages/SettingsPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>

        {/* Homepage */}
        <Route path="/" element={<Customize />} />

        {/* Other pages */}
        <Route path="/assistant" element={<Assistant />} />
        <Route path="/library" element={<Library />} />
        <Route path="/history" element={<History />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/settings" element={<SettingsPage />} />

      </Route>
    </Routes>
  );
}