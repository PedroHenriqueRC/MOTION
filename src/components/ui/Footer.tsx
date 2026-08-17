import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer-root">
      <div className="container footer-inner">
        <div className="footer-mark">MOTION</div>
        <nav className="footer-nav">
          <Link to="/">Início</Link>
          <Link to="/discovery">Descoberta</Link>
          <Link to="/garage">Garagem</Link>
          <Link to="/stories">Histórias</Link>
        </nav>
        <nav className="footer-nav">
          <a href="https://github.com/PedroHenriqueRC" target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 5.02 3.25 9.27 7.76 10.77.57.1.78-.25.78-.55 0-.27-.01-1-.02-1.97-3.15.68-3.82-1.52-3.82-1.52-.52-1.3-1.27-1.65-1.27-1.65-1.04-.71.08-.69.08-.69 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.34.95.1-.74.4-1.25.72-1.53-2.52-.29-5.17-1.26-5.17-5.6 0-1.24.44-2.25 1.17-3.04-.12-.29-.51-1.46.11-3.05 0 0 .95-.31 3.12 1.16a10.83 10.83 0 0 1 5.68 0c2.17-1.47 3.12-1.16 3.12-1.16.62 1.59.23 2.76.11 3.05.73.79 1.17 1.8 1.17 3.04 0 4.35-2.65 5.31-5.18 5.59.41.35.77 1.03.77 2.08 0 1.5-.01 2.7-.01 3.07 0 .3.2.66.79.55 4.5-1.5 7.75-5.75 7.75-10.77C23.25 5.48 18.27.5 12 .5Z" />
            </svg>
          </a>
        </nav>
      </div>
      <div style={{display: "flex",justifyContent: "center",alignItems: "center",marginBottom: "1rem",}} className="footer-bottom">
        <div className="muted">© {new Date().getFullYear()} MOTION</div>
      </div>
    </footer>
  );
}
