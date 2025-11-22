import React from "react";
import "../components/Layout.css";

export default function Layout({ featured, children }) {
  if (!featured) return null;

  return (
    <div className="home-layout">
      <section className="layout">
        {featured.backdrop && (
          <img
            className="layout-bg"
            src={featured.backdrop}
            alt={featured.title}
          />
        )}
        <div className="layout-overlay" />

        <div className="layout-content">
          <h1 className="layout-title">{featured.title}</h1>
          <p className="layout-desc">{featured.description}</p>
          <p className="layout-rating">⭐ {featured.rating}</p>

          {children}
        </div>
      </section>
    </div>
  );
}
