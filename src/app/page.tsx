'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { getFoodLog, getExerciseLog, getProfile, getDateStr } from '@/lib/storage';
import { FoodLogEntry, ExerciseLogEntry, UserProfile } from '@/lib/types';

function CalorieRing({ consumed, goal }: { consumed: number; goal: number }) {
  const pct = Math.min((consumed / goal) * 100, 100);
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;
  const color = consumed > goal ? 'var(--danger)' : consumed > goal * 0.8 ? 'var(--warning)' : 'var(--primary)';

  return (
    <div className="flex flex-col items-center">
      <svg width="150" height="150" className="-rotate-90">
        <circle cx="75" cy="75" r={radius} fill="none" stroke="var(--border)" strokeWidth="12" />
        <circle
          cx="75" cy="75" r={radius} fill="none"
          stroke={color} strokeWidth="12" strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset}
          className="transition-all duration-700"
        />
      </svg>
      <div className="absolute mt-10 text-center">
        <div className="text-3xl font-bold">{consumed}</div>
        <div className="text-sm text-[var(--muted)]">/ {goal} kcal</div>
      </div>
    </div>
  );
}

function MacroBar({ label, value, goal, color }: { label: string; value: number; goal: number; color: string }) {
  const pct = goal > 0 ? Math.min((value / goal) * 100, 100) : 0;
  return (
    <div className="mb-3">
      <div className="flex justify-between text-sm mb-1">
        <span>{label}</span>
        <span className="text-[var(--muted)]">{value}g / {goal}g</span>
      </div>
      <div className="h-2.5 rounded-full bg-[var(--border)] overflow-hidden">
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [date, setDate] = useState(getDateStr());
  const [foodEntries, setFoodEntries] = useState<FoodLogEntry[]>([]);
  const [exerciseEntries, setExerciseEntries] = useState<ExerciseLogEntry[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const loadData = useCallback(() => {
    setFoodEntries(getFoodLog(date));
    setExerciseEntries(getExerciseLog(date));
    setProfile(getProfile());
  }, [date]);

  useEffect(() => { loadData(); }, [loadData]);

  const totalCals = foodEntries.reduce((s, e) => s + e.calories, 0);
  const totalProtein = foodEntries.reduce((s, e) => s + e.protein, 0);
  const totalCarbs = foodEntries.reduce((s, e) => s + e.carbs, 0);
  const totalFat = foodEntries.reduce((s, e) => s + e.fat, 0);
  const totalBurned = exerciseEntries.reduce((s, e) => s + e.caloriesBurned, 0);
  const totalExMins = exerciseEntries.reduce((s, e) => s + e.duration, 0);

  const goal = profile?.calorieGoal || 2000;
  const remaining = goal - totalCals + totalBurned;

  const meals = { breakfast: 0, lunch: 0, dinner: 0, snack: 0 };
  foodEntries.forEach(e => { meals[e.meal] += e.calories; });

  const changeDate = (offset: number) => {
    const d = new Date(date);
    d.setDate(d.getDate() + offset);
    setDate(getDateStr(d));
  };

  return (
    <div>
      {/* Date Selector */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => changeDate(-1)} className="p-2 rounded-lg hover:bg-[var(--border)] text-xl">&larr;</button>
        <div className="text-center">
          <h1 className="text-xl font-bold">
            {date === getDateStr() ? 'Today' : new Date(date + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
          </h1>
          <p className="text-xs text-[var(--muted)]">{date}</p>
        </div>
        <button onClick={() => changeDate(1)} className="p-2 rounded-lg hover:bg-[var(--border)] text-xl">&rarr;</button>
      </div>

      {/* Calorie Summary */}
      <div className="bg-[var(--card)] rounded-2xl p-6 mb-4 border border-[var(--border)] relative flex flex-col items-center">
        <CalorieRing consumed={totalCals} goal={goal} />
        <div className="grid grid-cols-3 gap-4 mt-4 w-full text-center">
          <div>
            <div className="text-lg font-bold text-[var(--primary)]">{totalCals}</div>
            <div className="text-xs text-[var(--muted)]">Eaten</div>
          </div>
          <div>
            <div className="text-lg font-bold text-[var(--info)]">{totalBurned}</div>
            <div className="text-xs text-[var(--muted)]">Burned</div>
          </div>
          <div>
            <div className={`text-lg font-bold ${remaining >= 0 ? 'text-[var(--primary)]' : 'text-[var(--danger)]'}`}>{remaining}</div>
            <div className="text-xs text-[var(--muted)]">Remaining</div>
          </div>
        </div>
      </div>

      {/* Macros */}
      <div className="bg-[var(--card)] rounded-2xl p-4 mb-4 border border-[var(--border)]">
        <h2 className="font-semibold mb-3">Macros</h2>
        <MacroBar label="Protein" value={Math.round(totalProtein)} goal={profile?.proteinGoal || 150} color="#3b82f6" />
        <MacroBar label="Carbs" value={Math.round(totalCarbs)} goal={profile?.carbsGoal || 250} color="#f59e0b" />
        <MacroBar label="Fat" value={Math.round(totalFat)} goal={profile?.fatGoal || 65} color="#ef4444" />
      </div>

      {/* Meals Breakdown */}
      <div className="bg-[var(--card)] rounded-2xl p-4 mb-4 border border-[var(--border)]">
        <h2 className="font-semibold mb-3">Meals</h2>
        {(['breakfast', 'lunch', 'dinner', 'snack'] as const).map(meal => (
          <div key={meal} className="flex justify-between py-1.5 border-b border-[var(--border)] last:border-0">
            <span className="capitalize">{meal}</span>
            <span className="font-medium">{meals[meal]} kcal</span>
          </div>
        ))}
      </div>

      {/* Exercise Summary */}
      <div className="bg-[var(--card)] rounded-2xl p-4 mb-4 border border-[var(--border)]">
        <h2 className="font-semibold mb-3">Exercise</h2>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-xl font-bold">{exerciseEntries.length}</div>
            <div className="text-xs text-[var(--muted)]">Activities</div>
          </div>
          <div>
            <div className="text-xl font-bold">{totalExMins}</div>
            <div className="text-xs text-[var(--muted)]">Minutes</div>
          </div>
          <div>
            <div className="text-xl font-bold">{totalBurned}</div>
            <div className="text-xs text-[var(--muted)]">Burned</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <Link href="/food-log" className="bg-[var(--primary)] text-white rounded-xl p-3 text-center text-sm font-medium hover:opacity-90 transition">
          Log Food
        </Link>
        <Link href="/exercise-log" className="bg-[var(--info)] text-white rounded-xl p-3 text-center text-sm font-medium hover:opacity-90 transition">
          Exercise
        </Link>
        <Link href="/photo-analyzer" className="bg-[var(--warning)] text-white rounded-xl p-3 text-center text-sm font-medium hover:opacity-90 transition">
          Photo
        </Link>
      </div>

      {!profile && (
        <Link href="/profile" className="block bg-[var(--card)] rounded-2xl p-4 border border-[var(--warning)] text-center">
          <p className="text-sm">Set up your profile for personalized calorie goals</p>
        </Link>
      )}
    </div>
  );
}
