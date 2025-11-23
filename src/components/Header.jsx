import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../components/Header.css";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [year, setYear] = useState("all");

  const navigate = useNavigate();
  const { pathname } = useLocation();

  function toggleMenu() {
    setIsMenuOpen((prev) => !prev);
  }

  const isActive = (path) => (pathname === path ? " active-link" : "");

  const handleSubmit = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (search.trim()) params.set("query", search.trim());
    if (year) params.set("year", year);

    navigate(`/?${params.toString()}`);
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className={"logo" + isActive("/")}>
          CineCult
        </Link>
        <span className="material-icons menu-icon" onClick={toggleMenu}>
          menu
        </span>

        <nav className="desktop">
          <Link to="/category/35" className={"link" + isActive("/category/35")}>
            Comedy
          </Link>
          <Link to="/category/53" className={"link" + isActive("/category/53")}>
            Thriller
          </Link>
          <Link to="/category/27" className={"link" + isActive("/category/27")}>
            Horror
          </Link>
          <Link to="/category/12" className={"link" + isActive("/category/12")}>
            Adventure
          </Link>
          <Link to="/favorites" className={"link" + isActive("/favorites")}>
            Favorites
          </Link>
        </nav>

        <form className="search-filters" onSubmit={handleSubmit}>
          <input
            type="text"
            className="search"
            placeholder="Search for a movie..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="select-year"
            value={year}
            onChange={(e) => {
              setYear(e.target.value);

              const params = new URLSearchParams();
              if (search.trim()) params.set("query", search.trim());
              params.set("year", e.target.value);
              navigate(`/?${params.toString()}`);
            }}
          >
            <option value="all">All Years</option>
            <option value="2020s">2020s</option>
            <option value="2010s">2010s</option>
            <option value="2000s">2000s</option>
            <option value="older">Before 2000</option>
          </select>

          <button className="button" type="submit"></button>
        </form>
      </div>

      <div className={`mobile-menu ${isMenuOpen ? "show-menu" : ""}`}>
        <nav className="mobile-nav">
          <Link to="/category/35" onClick={toggleMenu}>
            Comedy
          </Link>
          <Link to="/category/53" onClick={toggleMenu}>
            Thriller
          </Link>
          <Link to="/category/27" onClick={toggleMenu}>
            Horror
          </Link>
          <Link to="/category/12" onClick={toggleMenu}>
            Adventure
          </Link>
          <Link to="/favorites" onClick={toggleMenu}>
            Favorites
          </Link>
        </nav>

        <form className="mobile-filters" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search for a movie..."
            className="cc-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="select-year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option value="all">All Years</option>
            <option value="2020s">2020s</option>
            <option value="2010s">2010s</option>
            <option value="2000s">2000s</option>
            <option value="older">Before 2000</option>
          </select>

          <button className="mobile-search-btn" type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
}
