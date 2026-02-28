function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function deepMerge(base: unknown, override: unknown): unknown {
  if (!isRecord(base) || !isRecord(override)) {
    return override ?? base;
  }

  const merged: Record<string, unknown> = { ...base };
  for (const key of Object.keys(override)) {
    const overrideValue = override[key];
    const baseValue = merged[key];
    if (isRecord(baseValue) && isRecord(overrideValue)) {
      merged[key] = deepMerge(baseValue, overrideValue);
    } else {
      merged[key] = overrideValue;
    }
  }
  return merged;
}
