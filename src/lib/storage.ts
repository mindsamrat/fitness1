import { FoodLogEntry, ExerciseLogEntry, UserProfile } from './types';

const KEYS = {
  FOOD_LOG: 'fitness_food_log',
  EXERCISE_LOG: 'fitness_exercise_log',
  PROFILE: 'fitness_profile',
};

export function getFoodLog(date?: string): FoodLogEntry[] {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem(KEYS.FOOD_LOG);
  const entries: FoodLogEntry[] = raw ? JSON.parse(raw) : [];
  if (date) return entries.filter(e => e.date === date);
  return entries;
}

export function addFoodEntry(entry: FoodLogEntry) {
  const entries = getFoodLog();
  entries.push(entry);
  localStorage.setItem(KEYS.FOOD_LOG, JSON.stringify(entries));
}

export function removeFoodEntry(id: string) {
  const entries = getFoodLog().filter(e => e.id !== id);
  localStorage.setItem(KEYS.FOOD_LOG, JSON.stringify(entries));
}

export function getExerciseLog(date?: string): ExerciseLogEntry[] {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem(KEYS.EXERCISE_LOG);
  const entries: ExerciseLogEntry[] = raw ? JSON.parse(raw) : [];
  if (date) return entries.filter(e => e.date === date);
  return entries;
}

export function addExerciseEntry(entry: ExerciseLogEntry) {
  const entries = getExerciseLog();
  entries.push(entry);
  localStorage.setItem(KEYS.EXERCISE_LOG, JSON.stringify(entries));
}

export function removeExerciseEntry(id: string) {
  const entries = getExerciseLog().filter(e => e.id !== id);
  localStorage.setItem(KEYS.EXERCISE_LOG, JSON.stringify(entries));
}

export function getProfile(): UserProfile | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(KEYS.PROFILE);
  return raw ? JSON.parse(raw) : null;
}

export function saveProfile(profile: UserProfile) {
  localStorage.setItem(KEYS.PROFILE, JSON.stringify(profile));
}

export function getDateStr(date: Date = new Date()): string {
  return date.toISOString().split('T')[0];
}
