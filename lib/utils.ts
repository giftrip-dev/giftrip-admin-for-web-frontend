import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        "text-display-1",
        "text-display-2",
        "text-display-3",
        "text-display-4",
        "text-h1-R",
        "text-h1-M",
        "text-subtitle-1",
        "text-subtitle-2",
        "text-heading-1",
        "text-heading-2",
        "text-heading-3",
        "text-heading-4",
        "text-heading-5",
        "text-body-1",
        "text-body-2",
        "text-caption",
        "text-headline-1",
        "text-headline-2",
        "text-headline-3",
        "text-title-1",
        "text-title-2",
        "text-title-3",
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}
