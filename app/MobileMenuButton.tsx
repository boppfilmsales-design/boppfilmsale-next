"use client";

import { useState, useEffect } from "react";

export function MobileMenuButton() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="mobile-menu-btn"
        aria-label="Toggle menu"
        aria-expanded="false"
        style={{ display: "none" }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>
    );
  }

  return (
    <button
      className="mobile-menu-btn"
      aria-label="Toggle menu"
      aria-expanded={mobileMenuOpen}
      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        {mobileMenuOpen ? (
          <>
            <line x1="6" y1="6" x2="18" y2="18"></line>
            <line x1="6" y1="18" x2="18" y2="6"></line>
          </>
        ) : (
          <>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </>
        )}
      </svg>
    </button>
  );
}