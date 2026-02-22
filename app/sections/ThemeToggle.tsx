"use client";

import { useEffect, useRef, useState } from "react";
import {
  CHARACTER_LABELS,
  CHARACTER_TO_GROUP,
  DEFAULT_THEME_STATE,
  GROUP_TO_CHARACTERS,
  isAnimeGroup,
  isCharacterTheme,
  isThemeMode,
  mapLegacyAnimeToCharacter,
  THEME_STORAGE_KEYS,
  type AnimeGroup,
  type CharacterTheme,
  type ResolvedTheme,
  type ThemeMode,
} from "../config/theme";

function resolveSystemTheme(): ResolvedTheme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: ResolvedTheme, mode: ThemeMode) {
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.setAttribute("data-theme-mode", mode);
}

function applyCharacterTheme(character: CharacterTheme) {
  document.documentElement.setAttribute("data-character-theme", character);
}

function applyAnimeGroup(group: AnimeGroup) {
  document.documentElement.setAttribute("data-anime-group", group);
}

export function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>(DEFAULT_THEME_STATE.mode);
  const [animeGroup, setAnimeGroup] = useState<AnimeGroup>(DEFAULT_THEME_STATE.animeGroup);
  const [characterTheme, setCharacterTheme] = useState<CharacterTheme>(DEFAULT_THEME_STATE.character);
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEYS.mode);
    const savedCharacter = localStorage.getItem(THEME_STORAGE_KEYS.character);
    const savedAnimeGroup = localStorage.getItem(THEME_STORAGE_KEYS.animeGroup);
    const legacyAnime = localStorage.getItem(THEME_STORAGE_KEYS.legacyAnime);
    const initialMode: ThemeMode = isThemeMode(savedTheme) ? savedTheme : DEFAULT_THEME_STATE.mode;
    const mappedLegacy = mapLegacyAnimeToCharacter(legacyAnime);
    const initialGroup: AnimeGroup = isAnimeGroup(savedAnimeGroup)
      ? savedAnimeGroup
      : CHARACTER_TO_GROUP[mappedLegacy];
    const initialCharacter: CharacterTheme = isCharacterTheme(savedCharacter)
      ? savedCharacter
      : GROUP_TO_CHARACTERS[initialGroup][0];

    const initialTheme = initialMode === "system" ? resolveSystemTheme() : initialMode;
    setMode(initialMode);
    const resolvedGroup = CHARACTER_TO_GROUP[initialCharacter];
    setAnimeGroup(resolvedGroup);
    setCharacterTheme(initialCharacter);
    applyTheme(initialTheme, initialMode);
    applyAnimeGroup(resolvedGroup);
    applyCharacterTheme(initialCharacter);
    localStorage.setItem(THEME_STORAGE_KEYS.mode, initialMode);
    localStorage.setItem(THEME_STORAGE_KEYS.character, initialCharacter);
    localStorage.setItem(THEME_STORAGE_KEYS.animeGroup, CHARACTER_TO_GROUP[initialCharacter]);

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemChange = () => {
      const latestMode = localStorage.getItem(THEME_STORAGE_KEYS.mode);
      if (latestMode === "system") {
        applyTheme(resolveSystemTheme(), "system");
      }
    };

    media.addEventListener("change", handleSystemChange);
    return () => media.removeEventListener("change", handleSystemChange);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const onDocClick = (event: MouseEvent) => {
      if (!popupRef.current) return;
      if (!popupRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const handleModeChange = (nextMode: ThemeMode) => {
    const nextTheme = nextMode === "system" ? resolveSystemTheme() : nextMode;
    setMode(nextMode);
    applyTheme(nextTheme, nextMode);
    localStorage.setItem(THEME_STORAGE_KEYS.mode, nextMode);
  };

  const handleCharacterChange = (nextCharacter: CharacterTheme) => {
    const group = CHARACTER_TO_GROUP[nextCharacter];
    setAnimeGroup(group);
    setCharacterTheme(nextCharacter);
    applyAnimeGroup(group);
    applyCharacterTheme(nextCharacter);
    localStorage.setItem(THEME_STORAGE_KEYS.character, nextCharacter);
    localStorage.setItem(THEME_STORAGE_KEYS.animeGroup, group);
  };

  const handleAnimeGroupChange = (nextGroup: AnimeGroup) => {
    const defaultCharacter = GROUP_TO_CHARACTERS[nextGroup][0];
    setAnimeGroup(nextGroup);
    setCharacterTheme(defaultCharacter);
    applyAnimeGroup(nextGroup);
    applyCharacterTheme(defaultCharacter);
    localStorage.setItem(THEME_STORAGE_KEYS.animeGroup, nextGroup);
    localStorage.setItem(THEME_STORAGE_KEYS.character, defaultCharacter);
  };

  return (
    <div className="theme-popup-wrap" ref={popupRef}>
      <button
        type="button"
        className="theme-popup-trigger"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="theme-popup"
      >
        Theme
      </button>

      {isOpen ? (
        <div id="theme-popup" className="theme-modal">
          <div className="theme-modal-head">
            <p>Theme Settings</p>
            <button type="button" className="theme-modal-close" onClick={() => setIsOpen(false)}>
              Close
            </button>
          </div>

          <div className="theme-control-stack">
            <div className="theme-toggle" role="group" aria-label="Select color mode">
              <button
                type="button"
                onClick={() => handleModeChange("dark")}
                className={`theme-toggle-btn ${mode === "dark" ? "is-active" : ""}`}
              >
                Dark
              </button>
              <button
                type="button"
                onClick={() => handleModeChange("light")}
                className={`theme-toggle-btn ${mode === "light" ? "is-active" : ""}`}
              >
                Light
              </button>
              <button
                type="button"
                onClick={() => handleModeChange("system")}
                className={`theme-toggle-btn ${mode === "system" ? "is-active" : ""}`}
              >
                System
              </button>
            </div>

            <label className="anime-theme-picker">
              <span>Anime</span>
              <select
                aria-label="Select anime group"
                value={animeGroup}
                onChange={(event) => handleAnimeGroupChange(event.target.value as AnimeGroup)}
              >
                <option value="attack-on-titan">Attack on Titan</option>
                <option value="demon-slayer">Demon Slayer</option>
                <option value="dr-stone">Dr Stone</option>
                <option value="death-note">Death Note</option>
              </select>
            </label>

            <label className="anime-theme-picker">
              <span>Character</span>
              <select
                aria-label="Select character theme"
                value={characterTheme}
                onChange={(event) => handleCharacterChange(event.target.value as CharacterTheme)}
              >
                {GROUP_TO_CHARACTERS[animeGroup].map((character) => (
                  <option key={character} value={character}>
                    {CHARACTER_LABELS[character]}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      ) : null}
    </div>
  );
}
