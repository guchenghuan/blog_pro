"use client";

import { useState } from "react";
import Header from "./Header";
import MenuOverlay from "./MenuOverlay";
import KeyboardShortcuts from "./KeyboardShortcuts";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);

  return (
    <>
      <Header onMenuOpen={() => setMenuOpen(true)} />
      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <KeyboardShortcuts
        isOpen={shortcutsOpen}
        onClose={() => setShortcutsOpen(false)}
        onMenuOpen={() => setShortcutsOpen(true)}
      />
      <div className="relative z-10">{children}</div>
    </>
  );
}
