import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Backdrop from "./components/Backdrop";
import ScrollProgress from "./components/ScrollProgress";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Portfolio from "./pages/Portfolio";
import Tools from "./pages/Tools";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import BlogWrite from "./pages/BlogWrite";
import Archive from "./pages/Archive";
import ArchiveUpload from "./pages/ArchiveUpload";
import ArchiveEdit from "./pages/ArchiveEdit";
import Guestbook from "./pages/Guestbook";
import Game2048 from "./pages/Game2048";

export default function App() {
  const location = useLocation();

  // Reset scroll on route change (unless navigating to an in-page anchor).
  useEffect(() => {
    if (!location.hash && !location.state) window.scrollTo(0, 0);
  }, [location.pathname, location.hash, location.state]);

  return (
    <>
      <Backdrop />
      <ScrollProgress />
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
          <Route path="/archive/edit/:category/:slug" element={<ArchiveEdit />} />
          <Route path="/guestbook" element={<Guestbook />} />
          <Route path="/2048" element={<Game2048 />} />
          <Route path="*" element={<Portfolio />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
