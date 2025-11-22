import React from "react";
import { Link } from "react-router-dom";

export default function Page404() {
  return (
    <div className="page">
      <h1>404 — Page Not Found</h1>
      <Link to="/">Go Home</Link>
    </div>
  );
}
