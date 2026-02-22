"use client";

import { useEffect, useMemo, useState } from "react";
import rawStrings from "../content/strings.json";
import { DEFAULT_THEME_STATE, isCharacterTheme, type CharacterTheme } from "../config/theme";
import { deepMerge } from "../lib/deepMerge";

interface TextTree {
  [key: string]: string | TextTree | TextTree[] | string[];
}

function readCharacterTheme(): CharacterTheme {
  const value = document.documentElement.getAttribute("data-character-theme");
  if (isCharacterTheme(value)) {
    return value;
  }
  return DEFAULT_THEME_STATE.character;
}

export function useThemeStrings() {
  const [theme, setTheme] = useState<CharacterTheme>(DEFAULT_THEME_STATE.character);

  useEffect(() => {
    const update = () => setTheme(readCharacterTheme());
    update();

    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-character-theme"],
    });

    return () => observer.disconnect();
  }, []);

  const base = rawStrings.base as unknown as TextTree;
  const override = (rawStrings.themes as Record<string, TextTree | undefined>)[theme];

  return useMemo(() => deepMerge(base, override ?? {}) as TextTree, [base, override]);
}
