import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import App from "./App";
import "./index.css";

// Note: React.StrictMode is intentionally omitted. Its dev-only double-mount
// re-runs Framer Motion's entrance animations, causing a one-time flicker as
// components load. This has no effect on the production build.
//
// MotionConfig reducedMotion="user" makes Framer Motion honor the OS/browser
// "reduce motion" setting: transform/scale animations are skipped (only safe
// opacity transitions remain), which removes the flicker users with that
// setting were seeing — most noticeably on the project modal.
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <MotionConfig reducedMotion="user">
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MotionConfig>
);
