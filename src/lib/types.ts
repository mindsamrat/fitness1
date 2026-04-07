export interface FoodItem {
  id: string;
  name: string;
  category: string;
  servingSize: string;
  servingGrams: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
}

export interface FoodLogEntry {
  id: string;
  foodId: string;
  foodName: string;
  meal: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  servings: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  date: string; // YYYY-MM-DD
  timestamp: number;
}

export interface ExerciseType {
  id: string;
  name: string;
  category: string;
  metValue: number; // Metabolic Equivalent of Task
  icon: string;
}

export interface ExerciseLogEntry {
  id: string;
  exerciseId: string;
  exerciseName: string;
  duration: number; // minutes
  caloriesBurned: number;
  intensity: 'low' | 'moderate' | 'high';
  date: string; // YYYY-MM-DD
  timestamp: number;
}

export interface UserProfile {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  weight: number; // kg
  height: number; // cm
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  calorieGoal: number;
  proteinGoal: number;
  carbsGoal: number;
  fatGoal: number;
}

export interface DailySummary {
  date: string;
  totalCaloriesIn: number;
  totalCaloriesOut: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  meals: {
    breakfast: number;
    lunch: number;
    dinner: number;
    snack: number;
  };
  exerciseMinutes: number;
}
