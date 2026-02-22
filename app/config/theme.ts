export type ThemeMode = "dark" | "light" | "system";
export type ResolvedTheme = "dark" | "light";
export type AnimeGroup = "attack-on-titan" | "demon-slayer" | "dr-stone" | "death-note";
export type CharacterTheme =
  | "eren"
  | "levi"
  | "tanjiro"
  | "rengoku"
  | "senku"
  | "tsukasa"
  | "chrome"
  | "ukyo"
  | "light"
  | "l";

export const THEME_STORAGE_KEYS = {
  mode: "ls-theme",
  character: "ls-character-theme",
  animeGroup: "ls-anime-group",
  legacyAnime: "ls-anime-theme",
} as const;

export const DEFAULT_THEME_STATE = {
  mode: "dark" as ThemeMode,
  animeGroup: "attack-on-titan" as AnimeGroup,
  character: "levi" as CharacterTheme,
};

export const VALID_THEME_MODES = ["dark", "light", "system"] as const;
export const VALID_ANIME_GROUPS = [
  "attack-on-titan",
  "demon-slayer",
  "dr-stone",
  "death-note",
] as const;
export const VALID_CHARACTERS = [
  "eren",
  "levi",
  "tanjiro",
  "rengoku",
  "senku",
  "tsukasa",
  "chrome",
  "ukyo",
  "light",
  "l",
] as const;

export const GROUP_TO_CHARACTERS: Record<AnimeGroup, CharacterTheme[]> = {
  "attack-on-titan": ["levi", "eren"],
  "demon-slayer": ["tanjiro", "rengoku"],
  "dr-stone": ["senku", "tsukasa", "chrome", "ukyo"],
  "death-note": ["light", "l"],
};

export const CHARACTER_TO_GROUP: Record<CharacterTheme, AnimeGroup> = {
  eren: "attack-on-titan",
  levi: "attack-on-titan",
  tanjiro: "demon-slayer",
  rengoku: "demon-slayer",
  senku: "dr-stone",
  tsukasa: "dr-stone",
  chrome: "dr-stone",
  ukyo: "dr-stone",
  light: "death-note",
  l: "death-note",
};

export const CHARACTER_LABELS: Record<CharacterTheme, string> = {
  eren: "Eren",
  levi: "Levi",
  tanjiro: "Tanjiro",
  rengoku: "Rengoku",
  senku: "Senku",
  tsukasa: "Tsukasa",
  chrome: "Chrome",
  ukyo: "Ukyo",
  light: "Light Yagami",
  l: "L",
};

export function isThemeMode(value: string | null): value is ThemeMode {
  return value === "dark" || value === "light" || value === "system";
}

export function isAnimeGroup(value: string | null): value is AnimeGroup {
  return (
    value === "attack-on-titan" ||
    value === "demon-slayer" ||
    value === "dr-stone" ||
    value === "death-note"
  );
}

export function isCharacterTheme(value: string | null): value is CharacterTheme {
  return (
    value === "eren" ||
    value === "levi" ||
    value === "tanjiro" ||
    value === "rengoku" ||
    value === "senku" ||
    value === "tsukasa" ||
    value === "chrome" ||
    value === "ukyo" ||
    value === "light" ||
    value === "l"
  );
}

export function mapLegacyAnimeToCharacter(legacyAnime: string | null): CharacterTheme {
  if (legacyAnime === "dr-stone") return "senku";
  if (legacyAnime === "death-note") return "light";
  if (legacyAnime === "naruto") return "rengoku";
  if (legacyAnime === "jjk") return "ukyo";
  if (legacyAnime === "aot") return "tsukasa";
  return DEFAULT_THEME_STATE.character;
}

export function inferAnimeGroupFromCharacter(character: CharacterTheme): AnimeGroup {
  return CHARACTER_TO_GROUP[character];
}

const modeKey = THEME_STORAGE_KEYS.mode;
const characterKey = THEME_STORAGE_KEYS.character;
const animeKey = THEME_STORAGE_KEYS.animeGroup;
const legacyKey = THEME_STORAGE_KEYS.legacyAnime;
const defaultMode = DEFAULT_THEME_STATE.mode;
const defaultCharacter = DEFAULT_THEME_STATE.character;
const defaultAnime = DEFAULT_THEME_STATE.animeGroup;

export const THEME_INIT_SCRIPT = `(() => {
  try {
    const savedTheme = localStorage.getItem("${modeKey}");
    const savedCharacter = localStorage.getItem("${characterKey}");
    const savedAnimeGroup = localStorage.getItem("${animeKey}");
    const legacyAnime = localStorage.getItem("${legacyKey}");
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const mode = ${JSON.stringify(VALID_THEME_MODES)}.includes(savedTheme) ? savedTheme : "${defaultMode}";
    const animeGroup = ${JSON.stringify(VALID_ANIME_GROUPS)}.includes(savedAnimeGroup)
      ? savedAnimeGroup
      : "${defaultAnime}";
    const mappedLegacy = legacyAnime === "dr-stone"
      ? "senku"
      : legacyAnime === "death-note"
      ? "light"
      : "${defaultCharacter}";
    const character = ${JSON.stringify(VALID_CHARACTERS)}.includes(savedCharacter)
      ? savedCharacter
      : animeGroup === "attack-on-titan"
      ? "${defaultCharacter}"
      : animeGroup === "dr-stone"
      ? "senku"
      : animeGroup === "death-note"
      ? "light"
      : mappedLegacy;
    const resolvedAnimeGroup = (character === "eren" || character === "levi")
      ? "attack-on-titan"
      : (character === "tanjiro" || character === "rengoku")
      ? "demon-slayer"
      : (character === "light" || character === "l")
      ? "death-note"
      : "dr-stone";
    const theme = mode === "system" ? systemTheme : mode;
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.setAttribute("data-theme-mode", mode);
    document.documentElement.setAttribute("data-character-theme", character);
    document.documentElement.setAttribute("data-anime-group", resolvedAnimeGroup);
  } catch {
    document.documentElement.setAttribute("data-theme", "${defaultMode}");
    document.documentElement.setAttribute("data-theme-mode", "${defaultMode}");
    document.documentElement.setAttribute("data-character-theme", "${defaultCharacter}");
    document.documentElement.setAttribute("data-anime-group", "${defaultAnime}");
  }
})();`;
