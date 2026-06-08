import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

// Note: React.StrictMode is intentionally omitted. Its dev-only double-mount
// re-runs Framer Motion's entrance animations, causing a one-time flicker as
// components load. This has no effect on the production build.
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
