"use client";

import { useState, useEffect } from "react";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  if (!mounted) {
    return (
      <>
        <button
          className="mobile-menu-btn"
          aria-label="Toggle menu"
          aria-expanded="false"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </>
    );
  }

  return (
    <>
      <button
        className="mobile-menu-btn"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
        onClick={toggleMenu}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {isOpen ? (
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
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              const btn = document.querySelector('.mobile-menu-btn');
              const nav = document.querySelector('.site-nav');
              if (btn && nav) {
                btn.addEventListener('click', () => {
                  nav.classList.toggle('open');
                  btn.setAttribute('aria-expanded', nav.classList.contains('open'));
                });
                nav.querySelectorAll('a').forEach(link => {
                  link.addEventListener('click', () => {
                    nav.classList.remove('open');
                    btn.setAttribute('aria-expanded', 'false');
                  });
                });
              }
            })();
          `,
        }}
      />
    </>
  );
}