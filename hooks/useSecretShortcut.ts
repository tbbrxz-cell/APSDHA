"use client";

import { useRef } from "react";
import { useHotkeys } from "react-hotkeys-hook";

const SECRET_SEQUENCE = ["a", "p", "s", "a", "m"] as const;
const SEQUENCE_TIMEOUT_MS = 2000;

interface UseSecretShortcutOptions {
  enabled?: boolean;
}

export function useSecretShortcut(
  onUnlock: () => void,
  options: UseSecretShortcutOptions = {}
) {
  const { enabled = true } = options;
  const sequenceIndexRef = useRef(0);
  const lastKeyTimeRef = useRef(0);

  useHotkeys(
    "a, p, s, m",
    (event) => {
      const key = event.key.toLowerCase();
      const now = Date.now();

      if (now - lastKeyTimeRef.current > SEQUENCE_TIMEOUT_MS) {
        sequenceIndexRef.current = 0;
      }

      const expected = SECRET_SEQUENCE[sequenceIndexRef.current];

      if (key === expected) {
        sequenceIndexRef.current += 1;
        lastKeyTimeRef.current = now;

        if (sequenceIndexRef.current === SECRET_SEQUENCE.length) {
          sequenceIndexRef.current = 0;
          onUnlock();
        }
      } else {
        sequenceIndexRef.current = key === SECRET_SEQUENCE[0] ? 1 : 0;
        lastKeyTimeRef.current = now;
      }
    },
    {
      enabled,
      enableOnFormTags: true,
      preventDefault: false,
    },
    [onUnlock, enabled]
  );
}
