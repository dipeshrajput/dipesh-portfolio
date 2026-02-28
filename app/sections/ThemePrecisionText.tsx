"use client";

import { useThemeStrings } from "./useThemeStrings";

export function ThemePrecisionText() {
  const strings = useThemeStrings() as {
    hero?: {
      precisionLine?: string;
    };
  };

  return (
    <span className="precision-gradient block bg-clip-text text-transparent">
      {strings.hero?.precisionLine ?? "with Precision."}
    </span>
  );
}
