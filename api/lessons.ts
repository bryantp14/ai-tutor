import { Module } from "./data/types";
import { lesson1 } from "./data/lesson1";
// Uncomment these lines as you add the files:
import { lesson2 } from "./data/lesson2";
import { lesson3 } from "./data/lesson3";
import { lesson4 } from "./data/lesson4";
import { lesson5 } from "./data/lesson5";

export const lessons: Record<string, Module> = {
  "unit-1": lesson1,
  "unit-2": lesson2,
  "unit-3": lesson3,
  "unit-4": lesson4,
  "unit-5": lesson5,
};