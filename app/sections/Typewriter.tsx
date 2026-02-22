"use client";

import { useEffect, useState } from "react";

type TypewriterProps = {
  words: string[];
};

export function Typewriter({ words }: TypewriterProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    const shouldDelete = isDeleting;
    const delta = shouldDelete ? 40 : 80;

    const timeout = setTimeout(() => {
      const nextText = shouldDelete
        ? currentWord.slice(0, text.length - 1)
        : currentWord.slice(0, text.length + 1);

      setText(nextText);

      if (!shouldDelete && nextText === currentWord) {
        setTimeout(() => setIsDeleting(true), 900);
      }

      if (shouldDelete && nextText === "") {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    }, delta);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words]);

  return (
    <span className="typewriter" aria-label={words[wordIndex]}>
      {text}
    </span>
  );
}
