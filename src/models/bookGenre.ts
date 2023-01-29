import { toTitleCase } from "../utils/string";

export const BookGenres = [
  "ROMANCE",
  "HORROR",
  "THRILLER",
  "HISTORY",
  "MYSTERY",
  "ASTRONOMY",
  "PHYSICS",
  "SCIENCE",
  "MATHEMATICS",
  "PSYCHOLOGY",
  "NUTRITION",
  "PHILOSOPHY",
] as const;
export type BookGenre = typeof BookGenres[number];

export const BookGenreOptions = BookGenres.map((genre) => ({
  value: genre,
  label: toTitleCase(genre),
}));
