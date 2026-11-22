import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "@/App";
import { RootErrorBoundary } from "@/components/root-error-boundary";
import "@/index.css";

// BASE_URL is "/" in dev and "/ui-vault/" in production (GitHub Pages subpath)
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RootErrorBoundary>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <App />
      </BrowserRouter>
    </RootErrorBoundary>
  </StrictMode>,
);
