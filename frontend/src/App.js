import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import MainScreen from "./components/MainScreen";
import GalleryApp from "./components/GalleryApp";
import AboutMe from "./pages/AboutMe";
import HomePage from "./components/HomePage";
import ContactMe from "./pages/ContactMe";
import WallpaperPage from "./pages/WallpaperPage";
import WallpaperUploadPage from "./pages/WallpaperUploadPage";
import GalleryUploadPage from "./pages/GalleryUploadPage";
import Checkout from "./pages/Checkout";
import TableOfContents from "./components/TableOfContents";
import Timeline from "./pages/Timeline";
import WelcomePage from "./components/WelcomePage";
import HireMeForm from "./pages/HireMeForm";
import ChatButton from "./components/ChatButton";

function RouteChangeListener() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/contact") {
      if (window.Tawk_API && window.Tawk_API.hideWidget) {
        window.Tawk_API.hideWidget();
      }
    }
  }, [location]);

  return null;
}

function App() {
  // Optional: set basename if your app is hosted under a subpath (usually "/")
  const basename = process.env.PUBLIC_URL || "/";

  return (
    <Router basename={basename}>
      <RouteChangeListener />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/main" element={<MainScreen />} />
        <Route path="/gallery-app" element={<GalleryApp />} />
        <Route path="/about" element={<AboutMe />} />
        <Route
          path="/contact"
          element={
            <>
              <ContactMe />
              <ChatButton />
            </>
          }
        />
        <Route path="/wallpapers" element={<WallpaperPage />} />
        <Route path="/wallpapers/upload" element={<WallpaperUploadPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/contents" element={<TableOfContents />} />
        <Route path="/gallery/upload" element={<GalleryUploadPage />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/hire-me-form" element={<HireMeForm />} />
      </Routes>
    </Router>
  );
}

export default App;
