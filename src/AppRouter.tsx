import React from "react";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import { App } from "./App";
export function AppRouter() {
  return <Router>
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
    </Router>;
}