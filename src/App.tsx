import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Backdrop from "./components/Backdrop";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Portfolio from "./pages/Portfolio";
import Tools from "./pages/Tools";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import BlogWrite from "./pages/BlogWrite";
import Archive from "./pages/Archive";
import ArchiveUpload from "./pages/ArchiveUpload";

export default function App() {
  const location = useLocation();

  // Reset scroll on route change (unless navigating to an in-page anchor).
  useEffect(() => {
    if (!location.hash && !location.state) window.scrollTo(0, 0);
  }, [location.pathname, location.hash, location.state]);

  return (
    <>
      <Backdrop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/write" element={<BlogWrite />} />
          <Route path="/blog/:number" element={<BlogPost />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/archive/upload" element={<ArchiveUpload />} />
          <Route path="*" element={<Portfolio />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
